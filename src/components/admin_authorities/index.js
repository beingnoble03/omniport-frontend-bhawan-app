import React from "react";
import { connect } from "react-redux";
import {
  Header,
  Image,
  Container,
  Button,
  Form,
  Input,
  Dropdown,
  TextArea,
  Grid,
} from "semantic-ui-react";
import { TimeInput } from "semantic-ui-calendar-react";
import "./index.css";

export default class AdminAuthorities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      roomNo: "",
      email: "",
      contact: null,
      permissions: null,
    };
  }

  handleSubmit = () => {
    console.log("Byubk");
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  render() {
    const { name, roomNo, email, contact, permissions } = this.state;
    return (
      <React.Fragment>
        <div styleName="centered">
          <div>
            <Header as="h4">Mess Secretary</Header>
          </div>
          <div>
            <Image
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              size="tiny"
              circular
            />
          </div>

          <Form>
            <Form.Field>
              <label>Name</label>
              <Input name="name" value={name} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Room No.</label>
              <Input
                name="roomNo"
                value={roomNo}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Email ID.</label>
              <Input name="email" value={email} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Contact Number</label>
              <Input
                name="contact"
                value={contact}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Permissions</label>
              <Input
                name="permissions"
                icon="angle down"
                value={permissions}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button size="medium" onClick={this.handleSubmit} width={3}>
              Submit
            </Button>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     complains: state.complains,
//     timeSlots: state.timeSlots,
//   };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getComplains: (residence) => {
//       dispatch(getComplains(residence));
//     },
//     getTimeSlots: (residence) => {
//       dispatch(getTimeSlots(residence));
//     },
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AdminFacility);
