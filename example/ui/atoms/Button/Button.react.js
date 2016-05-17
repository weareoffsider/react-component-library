import React, {Component} from "react"

export default class Button extends Component {
  static displayName = "Button"
  render () {
    const {title} = this.props
    return rj`
      button
        = title
    `;
  }
}
