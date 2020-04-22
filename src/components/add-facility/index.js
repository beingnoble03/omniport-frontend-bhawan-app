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
  Input,
  Icon,
} from "semantic-ui-react";
import { TimeInput } from "semantic-ui-calendar-react";
import { addFacility } from "../../actions/facilities";
import { facilitiesUrl } from "../../urls"
import "./index.css";
import * as moment from "moment";

const options = [
  { key: "mon", text: "Monday", value: "Monday" },
  { key: "tue", text: "Tuesday", value: "Tuesday" },
  { key: "wed", text: "Wednesday", value: "Wednesday" },
  { key: "thurs", text: "Thursday", value: "Thursday" },
  { key: "fri", text: "Friday", value: "Friday" },
  { key: "sat", text: "Saturday", value: "Saturday" },
  { key: "sun", text: "Sunday", value: "Sunday" },
];

class Facility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: [""],
      endTime: [""],
      descriptions: [""],
      information: "",
      name: "",
    };
  }
  submitData() {
    if (
      this.state.information &&
      this.state.descriptions &&
      this.state.startTime &&
      this.state.endTime
    ) {
      let formData = new FormData();
      formData.append("name", this.state.name)
      formData.append("description", this.state.information)
      for( var i = 0; i<this.state.startTime.length;i++){
      formData.append("timings", {
        "day": "mon",
        "start": this.state.startTime[i],
        "end": this.state.endTime[i],
        "description": this.state.descriptions[i],
      })
    }
    }
    this.props.addFacility(facilitiesUrl(this.props.who_am_i.residence), formData)
  }
  createForm = () => {
    return this.state.descriptions.map((description, i) => (
      <div key={i}>
        <Form.Group>
          <Form.Field>
            <label>Description</label>
            <Input
              icon="angle down"
              value={description || ""}
              onChange={(event) => this.handleDescriptionsChange(i, event)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <label>Days</label>
            <Dropdown
              placeholder="Select Day"
              multiple
              selection
              options={options}
            />
          </Form.Field>
          <Form.Field>
            <label>Start time</label>
            <TimeInput
              name="startTime"
              value={this.state.startTime[i]}
              onChange={(event, { value }) =>
                this.handleStartTimeChange(event, i, value)
              }
            />
          </Form.Field>
          <Form.Field>
            <label>End time</label>
            <TimeInput
              name="endTime"
              value={this.state.endTime[i]}
              onChange={(event, { value }) =>
                this.handleEndTimeChange(event, i, value)
              }
            />
          </Form.Field>
          {this.state.descriptions.length > 1 ? (
            <Icon name="close" onClick={() => this.removeClick(i)} />
          ) : null}
        </Form.Group>
      </div>
    ));
  };

  removeClick = (i) => {
    console.log("jre");
    let descriptions = [...this.state.descriptions];
    let startTime = [...this.state.startTime];
    let endTime = [...this.state.endTime];
    descriptions.splice(i, 1);
    startTime.splice(i, 1);
    endTime.splice(i, 1);
    this.setState({
      descriptions,
      startTime,
      endTime,
    });
  };

  handleDescriptionsChange(i, event) {
    let descriptions = [...this.state.descriptions];
    descriptions[i] = event.target.value;
    this.setState({ descriptions });
  }

  handleStartTimeChange(event, i, value) {
    let startTime = [...this.state.startTime];
    startTime[i] = value;
    this.setState({ startTime });
  }

  handleEndTimeChange(event, i, value) {
    let endTime = [...this.state.endTime];
    endTime[i] = value;
    this.setState({ endTime });
  }

  addClick = () => {
    this.setState((prevState) => ({
      descriptions: [...prevState.descriptions, ""],
      startTime: [...prevState.startTime, ""],
    }));
  };

  successCallBack = (res) => {
    this.setState({
      success: true,
      error: false,
      message: res.statusText,
    });
  };

  errCallBack = (err) => {
    this.setState({
      error: true,
      success: false,
      message: err,
    });
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  render() {
    const { information, name } = this.state;
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
        <Header as="h2">XYZ</Header>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image
                src="https://react.semantic-ui.com/images/wireframe/image.png"
                size="medium"
              />
            </Grid.Column>
            <Grid.Column>
              <Container>
                <div>
                  <Header as="h5">Add Information</Header>
                  <Form>
                  <Form.Field>
            <label>Name</label>
            <Input
              icon="angle down"
              value={name}
              onChange={(event) => this.handleDescriptionsChange(i, event)}
            />
          </Form.Field>
                    <TextArea
                      name="information"
                      value={information}
                      onChange={this.handleChange}
                      placeholder="Tell us more"
                      fluid
                    />
                    {this.createForm()}
                    <Form.Field>
                      <Icon
                        onClick={this.addClick}
                        name="plus"
                        size="big"
                        // styleName="plus-icon"
                      />
                    </Form.Field>
                    <Form.Group>
                      <Form.Button onClick={this.submitData}>
                        Save Changes
                      </Form.Button>
                    </Form.Group>
                  </Form>
                </div>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFacility: (url, successCallBack, errCallBack) => {
      dispatch(addFacility(url, successCallBack, errCallBack));
    },
  };
};

export default connect(null, mapDispatchToProps)(Facility);
