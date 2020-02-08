import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, } from 'semantic-ui-react'
import './index.css'
export default class MyInfo extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Card>
          <Card.Content>
            <Link to='/bhawan_app/profile'>
              <Card.Content styleName="font_color">
                <Icon name="user" size="small" />
                <strong>Kashish Jagyasi</strong>
              </Card.Content>
            </Link>
            <Link to='/bhawan_app/profile'>
              <Card.Description styleName="font_color">
                <Icon name="home" size="small" />
                Kasturba Bhawan
              </Card.Description>
            </Link>
            <Link to='/bhawan_app/profile'>
              <Card.Description styleName="font_color">
                <Icon name="hotel" size="small"/>
                C-303
              </Card.Description>
            </Link>
          </Card.Content>
        </Card>
      </div>
    )
  }
}
