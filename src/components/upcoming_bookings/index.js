import React from 'react'
import { Card, Header, Grid, Icon } from 'semantic-ui-react'
import blocks from '../../css/app.css'
import main from './index.css'
export default class UpcomingBookings extends React.Component {
    render() {
        return (
            <Card fluid>
            <Card.Content styleName="blocks.card-border">
                <Header as="h4" styleName="blocks.zero-bottom-margin">Kasturba Bhawan Room</Header>
                <span>Confirmed</span> . <span>Booking ID</span> . <span>424</span>
            </Card.Content>
            <Card.Content styleName="blocks.card-border">
                <div styleName="main.flex main.space">
                    <div styleName="main.flex">
                    <div styleName="main.margin">
                        <div>Check In</div>
                        <div>12 bje</div>
                        <div>Bhag ja</div>
                    </div>
                    <div styleName="main.margin">
                        <div>Check In</div>
                        <div>12 bje</div>
                        <div>Bhag ja</div>
                    </div>
                    <div styleName="main.margin">
                        <div>Check In</div>
                        <div>12 bje</div>
                        <div>Bhag ja</div>
                    </div>
                    </div>
                    <div styleName="main.center">
                        <Icon name="arrow down"></Icon>Download Invoice
                    </div>
                </div>
            </Card.Content>

            </Card>
        )
    }
}