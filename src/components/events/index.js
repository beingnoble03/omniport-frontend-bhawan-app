import React from 'react'
import { Card, Icon, } from 'semantic-ui-react'
import './index.css'
export default class Events extends React.Component {

  render() {
    const { who_am_i } = this.props
    return (
        <Card>
            <Card.Content>
                <Card.Header>Todays events</Card.Header>
                <div styleName="max-content-width">
                <Card.Description>
                  Councelling Session
                  <div styleName="display-flex">
                    <div>
                      mess
                    </div>
                    <div>
                      9 bje
                    </div>
                  </div>
                </Card.Description>
              </div>
            </Card.Content>
          </Card>
    )
  }
}
