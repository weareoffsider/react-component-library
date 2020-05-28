import React, {Component} from "react"
import bem from "@offsider/js-kit/dom/bem"
import {browserExpandIcon} from './svg'

export default class UnwrappedRenderPane extends Component {
  serialize (props) {
  }

  render () {
    const {component, path, componentTestData,
           componentTestCSS,
           variationPage, wrapper, staticBuild} = this.props
    const propSetKeys = Object.keys(componentTestData)
    const removeTestHref = staticBuild ? '..' : '?'

    const renders = propSetKeys.filter((key) => key !== "pagedVariations")
                               .filter((key) => {
                                 return variationPage
                                   ? key === variationPage
                                   : true
                               })
                               .map((key) => {
      const data = componentTestData[key]

      return rj`
        +UnwrappedRenderComponent(key=key, title=key, component=component
                              wrapper=wrapper, data=data)
      `
    })

    return rj`
      div.RawRenderContainer
        style!= componentTestCSS
        = renders
        a.ComponentServer__RemoveTestMode(href=removeTestHref)
          span!= browserExpandIcon("ComponentServer__RemoveTestModeIcon")
          span.ComponentServer__RemoveTestModeLabel Show Component Browser
    `
  }
}

export class UnwrappedRenderComponent extends Component {
  render () {
    const {component, title, data, wrapper} = this.props

    return rj`
      .RenderContainer(
        data-component=component.displayName
        data-component-variation=title
        data-component-data=JSON.stringify(data)
      )
        = wrapper(component, data)
    `
  }
}
