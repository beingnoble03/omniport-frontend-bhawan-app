import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button, Icon } from 'semantic-ui-react'
import "./index.css"
export default class Nav extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <div>
        <Menu stackable secondary styleName="upper_menu">
          <Menu.Item header>
               Kasturba Bhawan
            </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Link to='/bhawan_app/book_room/'><Button styleName="button_color">Book a Guest Room</Button></Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/bhawan_app/complain/'><Button styleName="button_color">Register a Complaint</Button></Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Menu size='mini' secondary styleName="lower_menu">
          <Menu.Item size='mini'>
              <Icon name="angle left"/> <Icon name="angle right"/>Home
          </Menu.Item>
      </Menu>
      </div>
    )
  }
}
