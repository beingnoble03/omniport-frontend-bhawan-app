import React from "react";
import {
  Button,
  Form,
  Input,
  Image,
  Select,
  TextArea,
} from "semantic-ui-react";
import { TimeInput } from "semantic-ui-calendar-react";
import "./index.css";

const options = [
  { key: "r", text: "Room", value: "room" },
  { key: "w", text: "Washroom", value: "washroom" },
];

export default class RegisterStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      convenientTime: "",
    };
  }
  render() {
    return (
      <div>
        <Image
          src="https://react.semantic-ui.com/images/wireframe/square-image.png"
          size="tiny"
          circular
        />
        <Form>
          <Form.Group>
            <Form.Field>
              <label>Name</label>
              <Input placeholder="Search..." />
            </Form.Field>
            <Form.Field>
              <label>Enrollment No.</label>
              <Input placeholder="Search..." />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <label>Block</label>
              <Input placeholder="Search..." />
            </Form.Field>
            <Form.Field>
              <label>Room No.</label>
              <Input placeholder="Search..." />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <label>Fathers Name</label>
              <Input placeholder="Search..." />
            </Form.Field>
            <Form.Field>
              <label>Home Contact No</label>
              <Input placeholder="Search..." />
            </Form.Field>
          </Form.Group>
          <Form.Group fluid>
            <Form.Field fluid>
              <label>Permanent Address</label>
              <Input fluid placeholder="Search..." />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <label>Email Id</label>
              <Input placeholder="Search..." />
            </Form.Field>
            <Form.Field>
              <label>Contact No</label>
              <Input placeholder="Search..." />
            </Form.Field>
          </Form.Group>
          <Button type="submit">Register</Button>
        </Form>
      </div>
    );
  }
}
