import React, {Component} from "react"
import Button from "../../atoms/Button"
import Header from "../../atoms/Header"

export default class ListPage extends Component {
  static displayName = "ListPage"
  render () {
    const {title} = this.props
    return rj`
      div
        +Header(title=title)
        +Button(title="Some Button")
    `;
  }
}
