import React from 'react'
import { Button ,Card,Image, Divider } from 'semantic-ui-react'
import './index.css'
export default class Authorities extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <h2>Facilities</h2>
        <Card.Group itemsPerRow={3}>
    <Card>
      <Card.Content styleName="content">
        <Card.Header>Mess</Card.Header>
        <Card.Content styleName="desc">Mess Time</Card.Content>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content styleName="content">
        <Card.Header>Mess</Card.Header>
        <Card.Content styleName="desc">Mess Time</Card.Content>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content styleName="content">
        <Card.Header>Mess</Card.Header>
        <Card.Content styleName="desc">
          <Card.Content>Mess Time</Card.Content>
          <Card.Content>Mess Time</Card.Content>
          <Card.Content>Mess Time</Card.Content>
          </Card.Content>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content styleName="content">
        <Card.Header>Mess</Card.Header>
        <Card.Content styleName="desc">Mess Time</Card.Content>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content styleName="content">
        <Card.Header>Mess</Card.Header>
        <Card.Content styleName="desc">Mess Time</Card.Content>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content styleName="content">
        <Card.Header>Mess</Card.Header>
        <Card.Content styleName="desc">Mess Time</Card.Content>
      </Card.Content>
    </Card>
  </Card.Group>
          </div>
    )
  }
}
