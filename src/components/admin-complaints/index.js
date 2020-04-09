import React, { Component } from "react";
import { connect } from "react-redux";
import { TimeInput } from "semantic-ui-calendar-react";
import { getComplains } from "../../actions/complains";
import { getTimeSlots, changeTimeSlot } from "../../actions/time-slots";
import { resolveComplain } from "../../actions/resolveComplain";
import {
  Menu,
  Header,
  Table,
  Button,
  Modal,
  Container,
  Icon,
  Dropdown,
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
  };

  componentDidMount() {
    this.props.getComplains(this.props.who_am_i.residence);
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
      status: "apr",
    };
    this.props.resolveComplain(
      this.state.id,
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

  render() {
    const { open, pastComplainIcon } = this.state;
    const { complains } = this.props;
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
              {complains.length > 0
                ? complains.map((complain, index) => {
                    return (
                      <Table.Row>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{complain.description}</Table.Cell>
                        <Table.Cell>{complain.complainant}</Table.Cell>
                        <Table.Cell>{complain.complaintType}</Table.Cell>
                        <Table.Cell>{complain.phoneNumber}</Table.Cell>
                        <Table.Cell>{complain.roomNo}</Table.Cell>
                        <Table.Cell>Cell</Table.Cell>
                        {/* <Table.Cell onClick={() => this.resolveComplaint(complain.id)}>Resolve</Table.Cell> */}
                        <Table.Cell onClick={() => this.show(complain.id)}>
                          Resolve
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                : null}
            </Table.Body>
          </Table>
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
            Past Bookings
            <Icon name={pastComplainIcon} onClick={this.togglePastIcon} />
          </Header>
          {pastComplainIcon === "angle down" && (
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
                {complains.length > 0
                  ? complains.map((complain, index) => {
                      return (
                        <Table.Row>
                          <Table.Cell>{index + 1}</Table.Cell>
                          <Table.Cell>{complain.description}</Table.Cell>
                          <Table.Cell>{complain.complainant}</Table.Cell>
                          <Table.Cell>{complain.complaintType}</Table.Cell>
                          <Table.Cell>{complain.phoneNumber}</Table.Cell>
                          <Table.Cell>{complain.roomNo}</Table.Cell>
                          <Table.Cell>Cell</Table.Cell>
                          <Table.Cell
                            onClick={() => this.resolveComplaint(complain.id)}
                          >
                            Resolve
                          </Table.Cell>
                        </Table.Row>
                      );
                    })
                  : null}
              </Table.Body>
            </Table>
          )}
        </Container>
        {/* <Button onClick={this.show('mini')}>Mini</Button> */}
        <Modal size="mini" open={open} onClose={this.close}>
          <Modal.Header styleName="center">Approve Request?</Modal.Header>
          <Modal.Actions styleName="modalActions">
            <Button positive fluid onClick={this.resolveComplaint}>
              Yes
            </Button>
            <Button negative fluid>
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
    complains: state.complains,
    timeSlots: state.timeSlots,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComplains: (residence) => {
      dispatch(getComplains(residence));
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
