import React, {Component} from "react"
import bem from "js-kit/dom/bem"
import {browserExpandIcon} from './svg'

export default class UnwrappedRenderPane extends Component {
  serialize (props) {
  }

  render () {
    const {component, path, componentTestData,
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
        +UnwrappedRenderComponent(key=key, title=key, component=component
                              wrapper=wrapper, data=data)
      `
    })

    return rj`
      div
        = renders
        a.ComponentServer__RemoveTestMode(href="?")
          span!= browserExpandIcon("ComponentServer__RemoveTestModeIcon")
          span.ComponentServer__RemoveTestModeLabel Show Component Browser
    `
  }
}

export class UnwrappedRenderComponent extends Component {
  render () {
    const {component, title, data, wrapper} = this.props

    return wrapper(component, data)
  }
}
