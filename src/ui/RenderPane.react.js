import React, {Component} from "react"
import bem from "@offsider/js-kit/dom/bem"

export default class RenderPane extends Component {
  serialize (props) {
  }

  render () {
    const {component, path, componentTestData,
           componentTestCSS,
           variationPage, wrapper} = this.props
    const propSetKeys = Object.keys(componentTestData)

    const renders = propSetKeys.filter((key) => key !== "pagedVariations")
                               .filter((key) => {
                                 return variationPage
                                   ? key === variationPage
                                   : true
                               })
                               .map((key) => {
      const data = componentTestData[key]

      return rj`
        +RenderComponent(key=key, title=key, component=component
                         wrapper=wrapper,
                         data=data)
      `
    })

    return rj`
      main.ComponentServerRenderPane
        style!= componentTestCSS
        header.ComponentServerRenderPane__header
          h1.ComponentServerRenderPane__title
            = component.displayName || "DisplayName not provided"
        = renders
    `
  }
}


const cx = bem("RenderComponent")

export class RenderComponent extends Component {
  // HACKY code stolen to pretty print json
  prettyPrint (obj) {
    const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
    return JSON.stringify(obj, null, 3)
      .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(jsonLine, this.replacer);
  }

  spaceCamelCase (title) {
    return title.replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
  }

  // HACKY code stolen to pretty print json
  replacer (match, pIndent, pKey, pVal, pEnd) {
    const key = `<span class=${cx('&__json-key')}>`;
    const val = `<span class=${cx('&__json-value')}>`;
    const str = `<span class=${cx('&__json-string')}>`;
    let r = pIndent || '';
    if (pKey) {
      r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
    }
    if (pVal) {
      r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
    }
    return r + (pEnd || '');
  }

  render () {
    const {component, title, data, wrapper} = this.props

    return rj`
      section.RenderComponent
        h2.RenderComponent__header= this.spaceCamelCase(title)
        .RenderComponent__wrapper.RenderContainer(
          data-component=component.displayName
          data-component-variation=title
          data-component-data=JSON.stringify(data)
        )
          = wrapper(component, data)
        .RenderComponent__jsonWrapper
          pre.RenderComponent__json!= this.prettyPrint(data)
    `
  }
}
