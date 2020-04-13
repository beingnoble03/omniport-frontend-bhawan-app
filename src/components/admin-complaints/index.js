import React, { Component } from "react";
import { connect } from "react-redux";
import { TimeInput } from "semantic-ui-calendar-react";
import {
  getPendingComplains,
  getResolvedComplains,
} from "../../actions/complains";
import { getTimeSlots, changeTimeSlot } from "../../actions/time-slots";
import { resolveComplain } from "../../actions/resolveComplain";
import { statusComplainsUrl } from "../../urls";
import {
  Menu,
  Header,
  Table,
  Button,
  Modal,
  Container,
  Icon,
  Dropdown,
  Pagination,
} from "semantic-ui-react";
import "./index.css";
const days = [
  { key: "mon", text: "Monday", value: "mon" },
  { key: "tue", text: "Tuesday", value: "tue" },
  { key: "wed", text: "Wednesday", value: "wed" },
  { key: "thu", text: "Thursday", value: "thu" },
  { key: "fri", text: "Friday", value: "fri" },
  { key: "sat", text: "Saturday", value: "sat" },
  { key: "sun", text: "Sunday", value: "sun" },
  { key: "dai", text: "Daily", value: "dai" },
];

const types = [
  { key: "ele", text: "Electric", value: "ele" },
  { key: "toi", text: "Toilet", value: "toi" },
  { key: "car", text: "Carpentry", value: "car" },
  { key: "cle", text: "Cleaning", value: "cle" },
  { key: "oth", text: "Others", value: "oth" },
];

class AdminComplains extends Component {
  state = {
    open: false,
    pastComplainIcon: "angle up",
    from: "",
    to: "",
    success: false,
    err: false,
    message: "",
    type: "",
    days: "",
    activeId: null,
    activeItem: "apr",
    activePage: 1,
    activeAprPage: 1,
  };

  componentDidMount() {
    this.props.getPendingComplains(
      statusComplainsUrl(this.props.who_am_i.residence, ["pending"])
    );
    this.props.getResolvedComplains(
      statusComplainsUrl(this.props.who_am_i.residence, ["resolved", "unresolved"])
    );
    this.props.getTimeSlots(this.props.who_am_i.residence);
  }
  show = (id) => {
    this.setState({
      open: true,
      activeId: id,
    });
  };

  close = () => this.setState({ open: false });

  togglePastIcon = () => {
    const pastComplainIcon = this.state.pastComplainIcon;
    pastComplainIcon === "angle down"
      ? this.setState({ pastComplainIcon: "angle up" })
      : this.setState({ pastComplainIcon: "angle down" });
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
    if (name == "days") {
      this.setState({
        from: "",
        to: "",
      });
      this.searchTime(this.state.type, value);
    } else if (name == "type") {
      this.setState({
        from: "",
        to: "",
      });
      this.searchTime(value, this.state.days);
    }
  };

  searchTime(type, days) {
    let index;
    let entry;
    for (index = 0; index < this.props.timeSlots.length; ++index) {
      entry = this.props.timeSlots[index];
      if (
        entry &&
        entry.complaintType &&
        entry.complaintType === type &&
        entry.timing[0].day === days
      ) {
        this.setState({
          from: entry.timing[0].start,
          to: entry.timing[0].end,
        });
      }
    }
  }
  resolveComplaint = () => {
    const body = {
      status: "res",
    };
    this.props.resolveComplain(
      this.state.activeId,
      body,
      this.props.who_am_i.residence,
      this.successCallBack,
      this.errCallBack
    );
    this.close();
  };

  successCallBack = (res) => {
    this.setState({
      success: true,
      error: false,
      message: "",
    });
  };

  errCallBack = (err) => {
    this.setState({
      error: true,
      success: false,
      message: err,
    });
  };

  changeTiming = () => {
    const data = {
      complaintType: this.state.type,
      timing: [
        {
          day: this.state.days,
          start: this.state.from,
          end: this.state.to,
        },
      ],
    };
    this.props.changeTimeSlot(
      data,
      this.props.timeSlots,
      this.props.who_am_i.residence,
      this.successCallBack,
      this.errorCallBack
    );
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };
  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.getPendingComplains(
      `${statusComplainsUrl(
        this.props.who_am_i.residence,
        ["PENDING"]
      )}&page=${activePage}`
    );
  };
  handlePastPaginationChange = (e, { activePage }) => {
    this.setState({ activeAprPage: activePage });
    this.props.getResolvedComplains(
      `${statusComplainsUrl(
        this.props.who_am_i.residence,
        ["RESOLVED", "UNRESOLVED" ]
      )}&page=${activePage}`
    );
  };

  render() {
    const {
      open,
      pastComplainIcon,
      activeItem,
      activePage,
      activeRejPage,
      activeAprPage,
    } = this.state;
    const { pendingComplains, resolvedComplains } = this.props;
    return (
      <React.Fragment>
        <Container>
          <Header as="h4">Student Complains</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Complaint</Table.HeaderCell>
                <Table.HeaderCell>Applicant Name</Table.HeaderCell>
                <Table.HeaderCell>Complaint Type</Table.HeaderCell>
                <Table.HeaderCell>Contact Number</Table.HeaderCell>
                <Table.HeaderCell>Applicant Room</Table.HeaderCell>
                <Table.HeaderCell>
                  Unsuccesful attempts to solve
                </Table.HeaderCell>
                <Table.HeaderCell>Mark as resolved</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {pendingComplains.results && pendingComplains.results.length > 0
                ? pendingComplains.results.map((complain, index) => {
                    return (
                      <Table.Row>
                        <Table.Cell>
                          {5 * (activePage - 1) + index + 1}
                        </Table.Cell>
                        <Table.Cell>{complain.description}</Table.Cell>
                        <Table.Cell>{complain.complainant}</Table.Cell>
                        <Table.Cell>{complain.complaintType}</Table.Cell>
                        <Table.Cell>{complain.phoneNumber}</Table.Cell>
                        <Table.Cell>{complain.roomNo}</Table.Cell>
                        <Table.Cell>Cell</Table.Cell>
                        <Table.Cell onClick={() => this.show(complain.id)}>
                          Resolve
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                : null}
            </Table.Body>
          </Table>
          {pendingComplains.count > 5 ? (
            <Pagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={Math.ceil(pendingComplains.count / 5)}
            />
          ) : null}

          <Header as="h4">
            Select slot for
            <Dropdown
              name="type"
              placeholder="type"
              selection
              options={types}
              onChange={this.handleChange}
            />
            for
            <Dropdown
              name="days"
              placeholder="days"
              selection
              options={days}
              onChange={this.handleChange}
            />
            <TimeInput
              name="from"
              placeholder="From"
              value={this.state.from}
              iconPosition="left"
              onChange={this.handleChange}
            />
            <TimeInput
              name="to"
              placeholder="To"
              value={this.state.to}
              iconPosition="left"
              onChange={this.handleChange}
            />
            <Button onClick={this.changeTiming}>Change</Button>
          </Header>
          <Header as="h4">
            Past Complains
            <Icon name={pastComplainIcon} onClick={this.togglePastIcon} />
          </Header>
          {pastComplainIcon === "angle down" && (
            <React.Fragment>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Complaint</Table.HeaderCell>
                    <Table.HeaderCell>Applicant Name</Table.HeaderCell>
                    <Table.HeaderCell>Complaint Type</Table.HeaderCell>
                    <Table.HeaderCell>Contact Number</Table.HeaderCell>
                    <Table.HeaderCell>Applicant Room</Table.HeaderCell>
                    <Table.HeaderCell>
                      Unsuccesful attempts to solve
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {resolvedComplains.results &&
                  resolvedComplains.results.length > 0
                    ? resolvedComplains.results.map((complain, index) => {
                        return (
                          <Table.Row>
                            <Table.Cell>
                              {5 * (activeAprPage - 1) + index + 1}
                            </Table.Cell>
                            <Table.Cell>{complain.description}</Table.Cell>
                            <Table.Cell>{complain.complainant}</Table.Cell>
                            <Table.Cell>{complain.complaintType}</Table.Cell>
                            <Table.Cell>{complain.phoneNumber}</Table.Cell>
                            <Table.Cell>{complain.roomNo}</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                          </Table.Row>
                        );
                      })
                    : null}
                </Table.Body>
              </Table>
              {resolvedComplains.count > 5 ? (
                <Pagination
                  activePage={activeAprPage}
                  onPageChange={this.handlePastPaginationChange}
                  totalPages={Math.ceil(resolvedComplains.count / 5)}
                />
              ) : null}
            </React.Fragment>
          )}
        </Container>
        <Modal size="mini" open={open} onClose={this.close}>
          <Modal.Header styleName="center">Resolve Complain?</Modal.Header>
          <Modal.Actions styleName="modalActions">
            <Button positive fluid onClick={this.resolveComplaint}>
              Yes
            </Button>
            <Button negative fluid onClick={this.close}>
              No
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    pendingComplains: state.pendingComplains,
    resolvedComplains: state.resolvedComplains,
    timeSlots: state.timeSlots,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPendingComplains: (url) => {
      dispatch(getPendingComplains(url));
    },
    getResolvedComplains: (url) => {
      dispatch(getResolvedComplains(url));
    },
    getTimeSlots: (residence) => {
      dispatch(getTimeSlots(residence));
    },
    changeTimeSlot: (
      data,
      prevData,
      residence,
      successCallBack,
      errorCallBack
    ) => {
      dispatch(
        changeTimeSlot(
          data,
          prevData,
          residence,
          successCallBack,
          errorCallBack
        )
      );
    },
    resolveComplain: (id, data, residence, successCallBack, errCallBack) => {
      dispatch(
        resolveComplain(id, data, residence, successCallBack, errCallBack)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminComplains);
