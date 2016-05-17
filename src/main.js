import glob from "glob"
import React from "react"
import express from "express"
import render from "./render"
import collectComponents from "./collector"

export default function setupComponentServer (options) {
  options = options || {}
  const app = express()

  const BASE_DIR = options.basedir
  const MATCHER = options.matcher
  const WRAPPER = options.wrapComponent || React.createElement
  const TEST_GETTER = options.getTestData
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

  const COMPONENT_PATH = /(.*react\.js)\/?(.*)$/

  app.get(COMPONENT_PATH, (req, res) => {
    const match = req.path.match(COMPONENT_PATH);
    const [fullPath, componentPath, variationPage] = match;

    try {
      const mod = require(BASE_DIR + componentPath)

      collectComponents(BASE_DIR, MATCHER, TEST_GETTER, BASE_DIR, ({pathList, fullTree}) => {
        const component = mod.default ? mod.default : mod
        const componentTestData = TEST_GETTER(component, BASE_DIR + componentPath)
        const testMode = req.query.test !== undefined

        res.send(render({
          path: req.path,
          component,
          variationPage,
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
  }
}
