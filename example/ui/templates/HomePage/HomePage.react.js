import React, {Component} from "react"
import Button from "../../atoms/Button"
import Header from "../../atoms/Header"

export default class HomePage extends Component {
  static displayName = "HomePage"
  render () {
    const {title} = this.props
    return rj`
      div
        +Header(title=title)
        +Button(title="Some Button")
    `;
  }
}
