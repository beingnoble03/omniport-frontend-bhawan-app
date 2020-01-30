import React from 'react'
import { Card, Icon  } from 'semantic-ui-react'
// import './index.css'
export default class Authorities extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Card>
      <Card.Content>
        <Card.Content><Icon name="user" size="small" /><strong>Kashish Jagyasi</strong></Card.Content>
        <Card.Description><Icon name="home" size="small" />Kasturba Bhawan</Card.Description>
        <Card.Description><Icon name="hotel" size="small"/>C-303</Card.Description>
      </Card.Content>
    </Card>
      </div>
    )
  }
}
