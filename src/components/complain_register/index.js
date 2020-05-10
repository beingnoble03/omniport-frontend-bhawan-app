import React from "react";
import {
  Button,
  Form,
  TextArea,
  Message,
  Icon,
  Header,
  Dropdown,
  Pagination,
  Table,
} from "semantic-ui-react";
import "./index.css";
import { connect } from "react-redux";
import { getComplains } from "../../actions/complains";
import { addComplaint } from "../../actions/add_complaint";
import { complainsUrl } from "../../urls";
import Complains from "../complains/index";
import moment from "moment"

class ComplainRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complain: "",
      category: "",
      success: false,
      error: false,
      message: "",
      activePage: 1,
    };
  }

  componentDidMount() {
    this.props.setNavigation("Register a Complain");
    this.props.getComplains(complainsUrl(this.props.who_am_i.residence));
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.getComplains(
      `${complainsUrl(this.props.who_am_i.residence)}?page=${activePage}`
    );
  };

  handleSubmit = (e) => {
    let data = {
      complaintType: this.state.category,
      description: this.state.complain,
    };
    this.props.addComplaint(
      data,
      this.props.who_am_i.residence,
      this.successCallBack,
      this.errCallBack
    );
  };

  successCallBack = (res) => {
    this.setState({
      success: true,
      error: false,
      message: res.statusText,
      convenientTime: "",
      complain: "",
      category: "",
    });
    this.props.getComplains(complainsUrl(this.props.who_am_i.residence));
  };

  errCallBack = (err) => {
    this.setState({
      error: true,
      success: false,
      message: err,
    });
  };
  render() {
    const { complains, constants } = this.props;
    const { activePage } = this.state;
    let options = [];
    for (var i in constants.complaint_types) {
      options.push({
        key: i.toString(),
        text: (constants.complaint_types[i]).toString(),
        value: i.toString(),
      });
    }
    return (
      <React.Fragment>
        {this.state.error && (
          <Message warning>
            <Icon name="warning" />
            Your complain could not be made. Please try again
          </Message>
        )}
        {this.state.success && (
          <Message positive>Your complain has been made succesfully</Message>
        )}
        <Form>
          <Form.Field>
            <label>Category</label>
            <Dropdown
              name="category"
              selection
              options={options}
              onChange={this.handleChange}
              styleName="field-width"
            />
          </Form.Field>
          <Form.Field
            name="complain"
            value={this.state.complain}
            onChange={this.handleChange}
            control={TextArea}
            label="Complaint"
            placeholder="Type your complaint here ...."
            styleName="complaint"
            rows="5"
          />
          <Button
            size="medium"
            styleName="button"
            onClick={this.handleSubmit}
            width={3}
          >
            Submit
          </Button>
        </Form>
        <React.Fragment>
          <Header as="h3">My Complains</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Complaint</Table.HeaderCell>
                <Table.HeaderCell>Complain Type</Table.HeaderCell>
                <Table.HeaderCell>Complain Status</Table.HeaderCell>
                <Table.HeaderCell>Complain Date</Table.HeaderCell>
                <Table.HeaderCell>Applicant Room</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {complains.results && complains.results.length > 0
                ? complains.results.map((complain, index) => {
                    return (
                      <Table.Row>
                        <Table.Cell>
                          {5 * (activePage - 1) + index + 1}
                        </Table.Cell>
                        <Table.Cell>{complain.description}</Table.Cell>
                        <Table.Cell>{constants.complaint_types[complain.complaintType]}</Table.Cell>
                        <Table.Cell>{constants.statues.COMLAINT_STATUSES[complain.status]}</Table.Cell>
                        <Table.Cell>{moment(complain.datetimeCreated.substring(0,10), "YYYY-MM-DD").format("DD/MM/YY")}</Table.Cell>
                        <Table.Cell>{complain.roomNo}</Table.Cell>
                      </Table.Row>
                    );
                  })
                : null}
            </Table.Body>
          </Table>
          {complains.count > 5 ? (
            <Pagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={Math.ceil(complains.count / 10)}
            />
          ) : null}
        </React.Fragment>
      </React.Fragment>
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
    getComplains: (url) => {
      dispatch(getComplains(url));
    },
    addComplaint: (data, residence, successCallBack, errCallBack) => {
      dispatch(addComplaint(data, residence, successCallBack, errCallBack));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplainRegister);
