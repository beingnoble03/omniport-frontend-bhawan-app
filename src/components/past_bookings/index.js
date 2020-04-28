import React, { Component } from "react";
import { Table, Pagination } from "semantic-ui-react";
import { connect } from "react-redux";
import { getRoomBookings } from "../../actions/get-room-bookings";
import { bookingsUrl } from "../../urls";
import "./index.css";

class PastBookings extends Component {
  state = { activePage: 1 };
  componentDidMount() {
    this.props.getRoomBookings(bookingsUrl(this.props.who_am_i.residence, true));
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage: activePage });
    this.props.getRoomBookings(
      `${bookingsUrl(this.props.who_am_i.residence, true)}?page=${activePage}`
    );
  };

  render() {
    const { bookingRequests } = this.props;
    const { activePage } = this.state;
    return (
      <div>
        <Table celled compact styleName="card-margin">
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
    );
  }
}
function mapStateToProps(state) {
  return {
    bookingRequests: state.bookingRequests,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRoomBookings: (residence) => {
      dispatch(getRoomBookings(residence));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PastBookings);
