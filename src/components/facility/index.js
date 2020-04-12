import React from "react";
import { connect } from "react-redux";
import {
  Header,
  Image,
  Container,
  Button,
  Form,
  Dropdown,
  TextArea,
  Grid,
} from "semantic-ui-react";
import { TimeInput } from "semantic-ui-calendar-react";
import { getFacility } from "../../actions/facilities";
import "./index.css";
import * as moment from "moment";

class Facility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id || 1,
      editMode: false,
      information: "",
      timing: [],
      startBreakfast: "",
      endBreakfast: "",
      startLunch: "",
      endLunch: "",
      startDinner: "",
      endDinner: "",
    };
  }

  componentDidMount() {
    this.props.getFacility(
      this.props.who_am_i.residence,
      this.state.id,
      this.successCallBack,
      this.errCallBack
    );
  }
  successCallBack = (res) => {
    console.log(res);
    this.setState({
      success: true,
      error: false,
      message: res.statusText,
      convenientTime: "",
      complain: "",
      category: "",
      information: res.data.description,
      day: [],
      start: [],
      end: [],
      description: [],
    })
  }

  errCallBack = (err) => {
    this.setState({
      error: true,
      success: false,
      message: err,
    });
  };
  toggleEditMode = () => {
    const editMode = this.state.editMode;
    this.setState({
      editMode: !editMode,
    });
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  render() {
    const { facility } = this.props;
    const { information } = this.state;
    const options = [
      { key: "mon", text: "Monday", value: "Monday" },
      { key: "tue", text: "Tuesday", value: "Tuesday" },
      { key: "wed", text: "Wednesday", value: "Wednesday" },
      { key: "thurs", text: "Thursday", value: "Thursday" },
      { key: "fri", text: "Friday", value: "Friday" },
      { key: "sat", text: "Saturday", value: "Saturday" },
      { key: "sun", text: "Sunday", value: "Sunday" },
    ];
    return (
      <Grid.Column>
        <div>
          <Button styleName="button_margin">Mess</Button>
          <Button styleName="button_margin">Canteen</Button>
          <Button styleName="button_margin">Mess</Button>
          <Button styleName="button_margin">Canteen</Button>
          <Button styleName="button_margin">Mess</Button>
          <Button styleName="button_margin">Canteen</Button>
        </div>
        {facility ? (
          <React.Fragment>
            <Header as="h2">{facility.name}</Header>
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Image
                    src={
                      facility.displayPicture ||
                      "https://react.semantic-ui.com/images/wireframe/image.png"
                    }
                    size="medium"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Container>
                    {this.state.editMode ? (
                      <div>
                        <Header as="h5">Edit Information</Header>
                        <Form>
                          <TextArea
                            name="information"
                            value={information}
                            onChange={this.handleChange}
                            placeholder="Tell us more"
                            fluid
                          />
                          {facility.timings && facility.timings.length > 0
                            ? facility.timings.map((timing, index) => {
                                return (
                                  <div>
                                    <Header as="h4">
                                      {timing.description}
                                    </Header>
                                    <Form.Group>
                                      <Form.Field>
                                        <Dropdown
                                          placeholder="Select Day"
                                          multiple
                                          selection
                                          options={options}
                                          // onChange={}
                                        />
                                      </Form.Field>
                                      <Form.Field>
                                        <TimeInput
                                          name="startBreakfast"
                                          value={this.state.startBreakfast}
                                          icon="angle down"
                                          iconPosition="right"
                                          onChange={this.handleChange}
                                          placeholder="Time from"
                                        />
                                      </Form.Field>
                                      <Form.Field>
                                        <TimeInput
                                          name="endBreakfast"
                                          value={this.state.endBreakfast}
                                          icon="angle down"
                                          iconPosition="right"
                                          onChange={this.handleChange}
                                          placeholder="Time To"
                                        />
                                      </Form.Field>
                                    </Form.Group>
                                  </div>
                                );
                              })
                            : null}
                          <Form.Group>
                            <Form.Button onClick={this.toggleEditMode}>
                              Save Changes
                            </Form.Button>
                            <Form.Button onClick={this.toggleEditMode}>
                              Cancel
                            </Form.Button>
                          </Form.Group>
                        </Form>
                      </div>
                    ) : (
                      <div>
                        {facility.description}
                        <Header size="small" styleName="low_margin">
                          Timings
                        </Header>
                        {facility.timings && facility.timings.length > 0
                          ? facility.timings.map((timing) => {
                              return (
                                <div>
                                  {timing.description}:{" "}
                                  {moment(timing.start, "hh:mm:ss").format(
                                    "hh:mm A"
                                  )}{" "}
                                  -
                                  {moment(timing.end, "hh:mm:ss").format(
                                    "hh:mm A"
                                  )}
                                </div>
                              );
                            })
                          : null}
                        <span onClick={this.toggleEditMode}>Edit</span>
                      </div>
                    )}
                  </Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </React.Fragment>
        ) : null}
      </Grid.Column>
    );
  }
}

function mapStateToProps(state) {
  return {
    facility: state.facility,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFacility: (residence, id, successCallBack, errCallBack) => {
      dispatch(getFacility(residence, id, successCallBack, errCallBack));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
