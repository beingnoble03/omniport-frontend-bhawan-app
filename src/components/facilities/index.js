import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, Container, Button, Icon, Segment } from 'semantic-ui-react';

import { Loading } from "formula_one"

import { getFacilities } from '../../actions/facilities';
import { setActiveFacility } from '../../actions/set-active-facility'

import { facilitiesUrl } from '../../urls';
import facilities from './index.css';
import blocks from '../../css/app.css';
import moment from 'moment';

class Facilities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      max_length: 6,
      loading: true,
    };
  }
  componentDidMount() {
    this.props.setNavigation('Home');
    this.props.getFacilities(facilitiesUrl(this.props.activeHostel),
      this.successCallBack,
      this.errCallBack
    );
  }

  componentDidUpdate(prevProps) {
    if(prevProps.activeHostel !== this.props.activeHostel){
      this.props.getFacilities(facilitiesUrl(this.props.activeHostel),
      this.successCallBack,
      this.errCallBack
      );
    }
  }


  successCallBack = (res) => {
    this.setState({
      loading: false,
    })
  }

  errCallBack = (err) => {
    this.setState({
      loading: false,
    })
  }

  increaseCount = () => {
    const max_length = this.state.max_length + 3;
    this.setState({
      max_length,
    });
  };

  handleRedirect = (id) => {
    this.props.setActiveFacility(id);
    this.props.history.push('/bhawan_app/facility/');
  };

  render() {
    const { facilities, who_am_i, constants, activePost } = this.props;
    const { loading } = this.state
    return (
      <Container>
        <h2>
          Facilities
          {(constants['administrative_council'].includes(activePost)) &&
          <Link to='/bhawan_app/add/facility/'>
            <span styleName="facilities.plus-icon">
              <Icon name="plus" color="blue" size="small" />
            </span>
          </Link>
          }
        </h2>
        {!loading?
          (
            <React.Fragment>
              <Card.Group itemsPerRow={3} stackable>
                {facilities.length > 0
                  ? facilities.map((facility, index) => {
                      if (index < this.state.max_length)
                        return (
                            <Card
                              styleName='blocks.card-border blocks.color-black'
                              onClick={() => this.handleRedirect(facility.id)}
                              fluid
                            >
                              <Card.Content>
                                <div styleName='facilities.facility_card'>
                                  <div>{facility.name}</div>
                                </div>
                              </Card.Content>
                            </Card>
                        );
                    })
                  : <div styleName="facilities.warning">
                      <Segment>Your Bhawan Admins have not added the facilities</Segment>
                    </div>}
              </Card.Group>
              {facilities.length > this.state.max_length ? (
                <Button styleName="facilities.seeMoreButton" basic onClick={this.increaseCount}>See more</Button>
              ) : null}
            </React.Fragment>
          ):
          (
            <Loading />
          )
        }
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    facilities: state.facilities,
    activeHostel: state.activeHostel,
    activePost: state.activePost
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getFacilities: (url, successCallBack, errCallBack) => {
      dispatch(getFacilities(url, successCallBack, errCallBack));
    },
    setActiveFacility: (id) => {
      dispatch(setActiveFacility(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Facilities);
