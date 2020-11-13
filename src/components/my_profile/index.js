import React from 'react';
import { connect } from 'react-redux';

import {  Divider, Menu, Grid } from 'semantic-ui-react';

import { getFacilities } from '../../actions/facilities';
import UpcomingBookings from '../upcoming_bookings/index';
import PastBookings from '../past_bookings/index';
import Complains from '../complains/index';
import { getComplains } from '../../actions/complains';

import facilities from './index.css';
import blocks from '../../css/app.css';

import { complainsUrl } from '../../urls';

class MyProfile extends React.Component {
  state = { activeItem: 'upcoming' };
  componentDidMount() {
    this.props.setNavigation('Profile');
    this.props.getComplains(complainsUrl(this.props.who_am_i.residence));
  } 
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { activeItem } = this.state;
    const { complains, who_am_i, constants } = this.props;
    return (
        <Grid.Column width={16}>
          <Complains {...this.props} />
          <Divider />
          <Menu compact icon='labeled'>
            <Menu.Item
              name='upcoming'
              active={activeItem === 'upcoming'}
              onClick={this.handleItemClick}
              color='blue'
              styleName='facilities.booking-menu'
            >
              Upcoming Bookings
            </Menu.Item>
            <Menu.Item
              name='past'
              active={activeItem === 'past'}
              onClick={this.handleItemClick}
              color='blue'
              styleName='facilities.booking-menu'
            >
              Past Bookings
            </Menu.Item>
          </Menu>
          {activeItem === 'past' ? (
            <PastBookings who_am_i={who_am_i} />
          ) : (
            <UpcomingBookings who_am_i={who_am_i} constants={constants} />
          )}
        </Grid.Column>
    );
  }
}
function mapStateToProps(state) {
  return {
    complains: state.complains,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComplains: (residence) => {
      dispatch(getComplains(residence));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
