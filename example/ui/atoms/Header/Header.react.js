import React, {Component} from "react"

export default class Header extends Component {
  static displayName = "Header"
  render () {
    const {title} = this.props
    return rj`
      h1
        = title
    `;
  }
}
