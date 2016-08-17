import React, {Component} from "react"
var fs = require('fs')


export default class HTMLWrapper extends Component {
  render () {
    const {rawHTML, scripts, styles, extraHead} = this.props;
    const clientScript = fs.readFileSync(__dirname + '/../client-bundle.js',
                                         'utf8')
    const clientStyle = fs.readFileSync(__dirname + '/../main.css',
                                         'utf8')

    return rj`
      html.no-js(lang="")
        head
          meta(charSet="utf-8")
          title ComponentServer
          style!= clientStyle
          for s in styles
            link(rel="stylesheet" key=s href=s)
          = extraHead
        body
          #ComponentServerApp!= rawHTML

          for s in scripts
            script(type="text/javascript" key=s src=s)

          script!= clientScript

    `
  }
}
