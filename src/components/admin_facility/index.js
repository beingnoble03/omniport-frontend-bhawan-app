import React from "react";
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
import "./index.css";

export default class AdminFacility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      startBreakfast: "",
      endBreakfast: "",
      startLunch: "",
      endLunch: "",
      startDinner: "",
      endDinner: "",
    };
  }

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
      <React.Fragment>
        <div>
          <Button styleName="button_margin">Mess</Button>
          <Button styleName="button_margin">Canteen</Button>
          <Button styleName="button_margin">Mess</Button>
          <Button styleName="button_margin">Canteen</Button>
          <Button styleName="button_margin">Mess</Button>
          <Button styleName="button_margin">Canteen</Button>
        </div>
        <Header as="h2">Mess</Header>
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
                {this.state.editMode ? (
                  <div>
                    <Header as="h5">Edit Information</Header>
                    <Form>
                      <TextArea placeholder="Tell us more" fluid />
                      <Header as="h6">Breakfast</Header>
                      <Form.Group>
                        <Form.Field>
                          <Dropdown
                            placeholder="Select Day"
                            multiple
                            selection
                            options={options}
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
                      <Header as="h6">Lunch</Header>
                      <Form.Group>
                        <Form.Field>
                          <Dropdown
                            placeholder="Select Day"
                            multiple
                            selection
                            options={options}
                          />
                        </Form.Field>
                        <Form.Field>
                          <TimeInput
                            name="startLunch"
                            value={this.state.startLunch}
                            icon="angle down"
                            iconPosition="right"
                            onChange={this.handleChange}
                            placeholder="Time from"
                          />
                        </Form.Field>
                        <Form.Field>
                          <TimeInput
                            name="endLunch"
                            value={this.state.endLunch}
                            icon="angle down"
                            iconPosition="right"
                            onChange={this.handleChange}
                            placeholder="Time To"
                          />
                        </Form.Field>
                      </Form.Group>
                      <Header as="h6">Dinner</Header>
                      <Form.Group>
                        <Form.Field>
                          <Dropdown
                            placeholder="Select Day"
                            multiple
                            selection
                            options={options}
                          />
                        </Form.Field>
                        <Form.Field>
                          <TimeInput
                            name="startDinner"
                            value={this.state.startDinner}
                            icon="angle down"
                            iconPosition="right"
                            onChange={this.handleChange}
                            placeholder="Time from"
                          />
                        </Form.Field>
                        <Form.Field>
                          <TimeInput
                            name="endDinner"
                            value={this.state.endDinner}
                            icon="angle down"
                            iconPosition="right"
                            onChange={this.handleChange}
                            placeholder="Time To"
                          />
                        </Form.Field>
                      </Form.Group>
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
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula eget dolor. Aenean massa strong. Cum
                      sociis natoque penatibus et magnis dis parturient montes,
                      nascetur ridiculus mus. Donec quam felis, ultricies nec,
                      pellentesque eu, pretium quis, sem. Nulla consequat massa
                      quis enim. Donec pede justo, fringilla vel, aliquet nec,
                      vulputate eget,
                    </p>
                    <Header size="small" styleName="low_margin">
                      Timings
                    </Header>
                    <div>Breakfast</div>
                    <div>Lunch</div>
                    <span onClick={this.toggleEditMode}>Edit</span>
                  </div>
                )}
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}
