import React from 'react'
import { connect } from 'react-redux'

import { Card, Icon, } from 'semantic-ui-react'

import './index.css'

class MyInfo extends React.Component {

  handleRedirect = () => {
    if(this.props.who_am_i.isStudent ) {
    this.props.history.push('/bhawan_app/profile')
    }
  };

  render() {
    const { who_am_i,
            constants,
            activeHostel
          } = this.props
    return (
        <Card>
          <Card.Content>
              <Card.Content styleName='font_color' onClick={this.handleRedirect}>
                <Icon name='user' size='small' />
                <strong>{who_am_i.fullName}</strong>
              </Card.Content>
              <Card.Description styleName='font_color' onClick={this.handleRedirect}>
                <Icon name='home' size='small' />
                {constants.hostels[this.props.activeHostel]}
              </Card.Description>
              {who_am_i.roomNumber && (
                <Card.Description styleName='font_color' onClick={this.handleRedirect}>
                <Icon name='hotel' size='small'/>
                {who_am_i.roomNumber}
              </Card.Description>
              )}
          </Card.Content>
        </Card>
    )
  }
}
function mapStateToProps(state) {
  return {
    activeHostel: state.activeHostel,
  };
}


export default connect(mapStateToProps, null)(MyInfo);
