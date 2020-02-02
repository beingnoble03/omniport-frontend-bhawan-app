import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Header, Menu, Button, Icon } from 'semantic-ui-react'
import navCss from "./index.css"
import blocks from "../../css/app.css"
export default class Nav extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <div>
        <Menu stackable secondary styleName="navCss.upper_menu">
          <Menu.Item>
            <Header size='medium'>Kasturba Bhawan</Header>
            </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Link to='/bhawan_app/book_room/'><Button styleName="blocks.active-button">Book a Guest Room</Button></Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/bhawan_app/complain/'><Button styleName="blocks.active-button">Register a Complaint</Button></Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Menu size='mini' secondary styleName="navCss.lower_menu">
          <Menu.Item size='mini'>
              <Icon name="angle left"/> <Icon name="angle right"/>Home
          </Menu.Item>
      </Menu>
      </div>
    )
  }
}
