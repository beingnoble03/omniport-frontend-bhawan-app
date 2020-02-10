import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, } from 'semantic-ui-react'
import './index.css'
export default class MyInfo extends React.Component {

  render() {
    const { who_am_i } = this.props
    return (
        <Card>
          <Card.Content>
            <Link to='/bhawan_app/profile'>
              <Card.Content styleName="font_color">
                <Icon name="user" size="small" />
                <strong>{who_am_i.person}</strong>
              </Card.Content>
            </Link>
            <Link to='/bhawan_app/profile'>
              <Card.Description styleName="font_color">
                <Icon name="home" size="small" />
                {who_am_i.residence}
              </Card.Description>
            </Link>
            <Link to='/bhawan_app/profile'>
              <Card.Description styleName="font_color">
                <Icon name="hotel" size="small"/>
                {who_am_i.roomNumber}
              </Card.Description>
            </Link>
          </Card.Content>
        </Card>
    )
  }
}
