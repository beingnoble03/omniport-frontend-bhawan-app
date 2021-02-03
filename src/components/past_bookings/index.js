import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Table, Pagination, Segment } from 'semantic-ui-react';

import { Loading } from "formula_one"

import { getRoomBookings } from '../../actions/get-room-bookings';

import { bookingsUrl } from '../../urls';

import './index.css';

class PastBookings extends Component {
  state = { activePage: 1, loading: true };
  componentDidMount() {
    this.props.getRoomBookings(
      bookingsUrl(this.props.activeHostel, 'true'),
      this.successCallBack,
      this.errCallBack
    );
  }

  successCallBack = (res) => {
    this.setState({
      loading: false
    })
  }

  errCallBack = (err) => {
    this.setState({
      loading: false
    })
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage: activePage, loading: true });
    this.props.getRoomBookings(
      `${bookingsUrl(this.props.activeHostel, 'true')}&page=${activePage}`,
      this.successCallBack,
      this.errCallBack
    );
  };

  render() {
    const { bookingRequests } = this.props;
    const { activePage, loading } = this.state;
    return (
      <React.Fragment>
        {!loading?
          (
            <React.Fragment>
              {bookingRequests.results && bookingRequests.results.length > 0
                ?(
                  <React.Fragment>
                    <div styleName="table-height">
                      <Table unstackable celled compact styleName='card-margin'>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Check IN</Table.HeaderCell>
                            <Table.HeaderCell>Check Out</Table.HeaderCell>
                            <Table.HeaderCell>No of Guest</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {bookingRequests.results && bookingRequests.results.length > 0
                            ? bookingRequests.results.map((request, index) => {
                                return (
                                  <Table.Row>
                                    <Table.Cell>
                                      {5 * (activePage - 1) + index + 1}
                                    </Table.Cell>
                                    <Table.Cell>{request.requestedFrom}</Table.Cell>
                                    <Table.Cell>{request.requestedTill}</Table.Cell>
                                    <Table.Cell>{request.visitor.length}</Table.Cell>
                                  </Table.Row>
                                );
                              })
                            : null}
                        </Table.Body>
                      </Table>
                      {bookingRequests.count > 5 ? (
                        <Pagination
                          activePage={activePage}
                          onPageChange={this.handlePaginationChange}
                          totalPages={Math.ceil(bookingRequests.count / 5)}
                        />
                      ) : null}
                      </div>
                      </React.Fragment>
                    ):
                    (
                      <Segment>No Past Booking Request Found</Segment>
                    )
                }
              </React.Fragment>
            ):
            (
              <Loading />
            )
          }
        </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    bookingRequests: state.bookingRequests,
    activeHostel: state.activeHostel
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRoomBookings: (residence, successCallBack, errCallBack) => {
      dispatch(getRoomBookings(residence, successCallBack, errCallBack));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PastBookings);
