import glob from "glob"
import React from "react"
import express from "express"
import render from "./render"
import fs from 'fs'
import collectComponents from "./collector"
import {writePage} from "./staticBuild"

export default function setupComponentServer (options) {
  options = options || {}
  const app = express()

  const BASE_DIR = options.basedir
  const MATCHER = options.matcher
  const WRAPPER = options.wrapComponent || React.createElement
  const TEST_GETTER = options.getTestData
  const TEST_CSS_GETTER = options.getTestCSSPath
  const TEST_JS_GETTER = options.getTestJSPath
  const COMPONENT_PATH = options.routePath || /(.*react\.js)\/?(.*)$/
  const styles = options.styles || []
  const scripts = options.scripts || []
  const extraHead = options.extraHead || []

  app.get('', (req, res) => {
    collectComponents(BASE_DIR, MATCHER, TEST_GETTER, BASE_DIR, ({pathList, fullTree}) => {
      res.send(render({
        path: req.path,
        pathList, fullTree,
        styles, scripts, extraHead,
      }))
    })
  })

  app.get(COMPONENT_PATH, (req, res) => {
    const match = req.path.match(COMPONENT_PATH);
    const [fullPath, componentPath, variationPage] = match;

    try {
      const mod = require(BASE_DIR + componentPath)

      collectComponents(BASE_DIR, MATCHER, TEST_GETTER, BASE_DIR, ({pathList, fullTree}) => {
        const component = mod.default ? mod.default : mod
        const componentTestData = TEST_GETTER(component, BASE_DIR + componentPath)
        let testCSS = ''
        let testJS = ''
        const testMode = req.query.test !== undefined

        if (TEST_CSS_GETTER) {
          const testCSSPath = TEST_CSS_GETTER(component, BASE_DIR + componentPath)
          try {
            testCSS = fs.readFileSync(testCSSPath, {encoding: 'utf-8'})
          } catch (e) {
          }
        }

        if (TEST_JS_GETTER) {
          const testJSPath = TEST_JS_GETTER(component, BASE_DIR + componentPath)
          try {
            testJS = fs.readFileSync(testJSPath, {encoding: 'utf-8'})
          } catch (e) {
          }
        }

        res.send(render({
          path: req.path,
          component,
          variationPage,
          componentTestCSS: testCSS,
          componentTestJS: testJS,
          componentTestData,
          wrapper: WRAPPER,
          pathList, fullTree, testMode,
          styles, scripts, extraHead,
        }))
      })
    } catch (e) {
      console.error(e)
      console.error(e.stack)
      res.sendStatus(404)
    }
  })

  return {
    configApp (cb) {
      cb(app)
    },
    listen (port, hostname, backlog, callback) {
      app.listen(port, hostname, backlog, callback)
    },
    staticBuild (renderPath, callback) {
      console.log("Outputting static html to " + renderPath)
      collectComponents(BASE_DIR, MATCHER, TEST_GETTER, BASE_DIR, ({pathList, fullTree}) => {
        const homePage = render({
          path: '/',
          pathList, fullTree,
          styles, scripts, extraHead,
          staticBuild: true,
        })
        writePage(renderPath, homePage)

        pathList.forEach((path) => {
          const mod = require(BASE_DIR + '/' + path)
          const component = mod.default ? mod.default : mod
          const componentTestData = TEST_GETTER(component, BASE_DIR + '/' + path)
          let testCSS = ''
          let testJS = ''
          const testMode = false;

          if (TEST_CSS_GETTER) {
            const testCSSPath = TEST_CSS_GETTER(component, BASE_DIR + '/' + path)
            try {
              testCSS = fs.readFileSync(testCSSPath, {encoding: 'utf-8'})
            } catch (e) {
            }
          }

          if (TEST_JS_GETTER) {
            const testJSPath = TEST_JS_GETTER(component, BASE_DIR + '/' + path)
            try {
              testJS = fs.readFileSync(testJSPath, {encoding: 'utf-8'})
            } catch (e) {
            }
          }


          const componentPage = render({
            path: '/' + path,
            component,
            variationPage: '',
            componentTestCSS: testCSS,
            componentTestJS: testJS,
            componentTestData,
            staticBuild: true,
            wrapper: WRAPPER,
            pathList, fullTree, testMode,
            styles, scripts, extraHead,
          })

          writePage(renderPath + path, componentPage)

          const testComponentPage = render({
            path: '/' + path,
            component,
            variationPage: '',
            componentTestData,
            componentTestCSS: testCSS,
            componentTestJS: testJS,
            wrapper: WRAPPER,
            pathList, fullTree,
            staticBuild: true,
            testMode: true,
            styles, scripts, extraHead,
          })

          writePage(renderPath + path + '/test', testComponentPage)

          if (componentTestData.pagedVariations) {
            Object.keys(componentTestData).forEach((variationPage) => {
              if (variationPage == 'pagedVariations') { return }

              const variationRender = render({
                path: '/' + path + '/' + variationPage ,
                component,
                variationPage,
                componentTestData,
                staticBuild: true,
                wrapper: WRAPPER,
                pathList, fullTree, testMode,
                styles, scripts, extraHead,
              })

              writePage(renderPath + path + '/' + variationPage,
                        variationRender)

              const testVariationRender = render({
                path: '/' + path + '/' + variationPage ,
                component,
                variationPage,
                componentTestData,
                staticBuild: true,
                wrapper: WRAPPER,
                pathList, fullTree,
                testMode: true,
                styles, scripts, extraHead,
              })

              writePage(renderPath + path + '/' + variationPage + '/test',
                        testVariationRender)
            })
          }

          console.log("Rendered files for " + path)
        });
      })
    }
  }
}
