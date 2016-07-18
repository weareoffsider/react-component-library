import React, {Component} from "react"
import Nav from "./Nav.react"
import RenderPane from "./RenderPane.react"
import UnwrappedRenderPane from "./UnwrappedRenderPane.react"


export default class Layout extends Component {
  render () {
    const {
      fullTree, path, component,
      componentTestData, wrapper,
      variationPage,
      staticBuild,
      testMode,
    } = this.props

    if (testMode) {
      return rj`
        +UnwrappedRenderPane(
          component=component
          variationPage=variationPage
          componentTestData=componentTestData
          staticBuild=staticBuild
          wrapper=wrapper
        )
      `
    } else {
      return rj`
        .ComponentServer
          +Nav(tree=fullTree currentPath=path staticBuild=staticBuild)
          if component
            +RenderPane(
              component=component
              staticBuild=staticBuild
              variationPage=variationPage
              componentTestData=componentTestData
              wrapper=wrapper
            )
          else
            h1 Index
      `
    }

  }
}
