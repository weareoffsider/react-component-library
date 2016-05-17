import React from "react"
import ReactDOM from "react-dom/server"

import HTMLWrapper from "./ui/HTMLWrapper.react"
import Layout from "./ui/Layout.react"

export default function render(props) {
  const appRender = ReactDOM.renderToString(
    React.createElement(Layout, props)
  )

  const wrapperRender = ReactDOM.renderToStaticMarkup(
    React.createElement(HTMLWrapper, {
      rawHTML: appRender,
      styles: props.styles,
      scripts: props.scripts,
      extraHead: props.extraHead,
    })
  )

  return '<!DOCTYPE html>' + wrapperRender
}
