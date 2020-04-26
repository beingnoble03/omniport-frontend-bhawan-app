import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Header,
  Container,
  Button,
  Modal,
  Form,
  Dropdown,
  TextArea,
  Grid,
  Input,
  Icon,
} from "semantic-ui-react";
import { CustomCropper } from "formula_one";
import getCroppedImage from "../get-cropped-image";
import { TimeInput } from "semantic-ui-calendar-react";
import { getFacilities, addFacility } from "../../actions/facilities";
import { facilitiesUrl } from "../../urls";
import "./index.css";
import * as moment from "moment";

const IMAGE_STYLE = {
  maxHeight: "100%",
  maxWidth: "100%",
};

const options = [
  { key: "mon", text: "Monday", value: "mon" },
  { key: "tue", text: "Tuesday", value: "tue" },
  { key: "wed", text: "Wednesday", value: "wed" },
  { key: "thurs", text: "Thursday", value: "thu" },
  { key: "fri", text: "Friday", value: "fri" },
  { key: "sat", text: "Saturday", value: "sat" },
  { key: "sun", text: "Sunday", value: "sun" },
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
      days: [[]],
      validImage: true,
      imageCrop: true,
      imageSrc: null,
      pixel: null,
      crop: {
        aspect: 1,
      },
      open: false,
    };
  }

  componentDidMount() {
    this.props.getFacilities(facilitiesUrl(this.props.who_am_i.residence));
  }

  fileChange = async (e) => {
    this.setState({
      [e.target.name]: e.target.files[0],
    });
    const imageDataUrl = await readFile(e.target.files[0]);
    this.setState({
      imageSrc: imageDataUrl,
      open: true,
    });
  };
  showCroppedImage = async () => {
    const croppedImage = await getCroppedImage(
      this.state.imageSrc,
      this.state.pixelCrop
    );

    var file = dataURLtoFile(croppedImage, "image.png");
    this.setState({ croppedImage: file });
  };

  submitData = () => {
    console.log("uygwe");
    const { croppedImage, information, startTime, endTime, descriptions } = this.state;
    let image = null;

    !croppedImage ? (image = false) : (image = true);

    this.setState({
      imageCrop: image,
    });
    if (information && descriptions && startTime && endTime && croppedImage) {
      let formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("description", this.state.information);
      for (var i = 0; i < this.state.days.length; i++) {
        for (var j = 0; j < this.state.days[i].length; j++) {
          console.log(this.state.days[i][j]);
          formData.append("timings[]", JSON.stringify({
            day: this.state.days[i][j],
            start: this.state.startTime[i],
            end: this.state.endTime[i],
            description: this.state.descriptions[i],
          }));
        }
      }
      formData.append("displayPicture", croppedImage);
      this.props.addFacility(
        facilitiesUrl(this.props.who_am_i.residence),
        formData,
        this.successCallBack,
        this.errCallBack
      );
    }
  };
  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
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
              name="days"
              placeholder="Select Day"
              multiple
              selection
              options={options}
              value={this.state.days[i]}
              onChange={(event, { value }) =>
                this.handleDaysChange(event, i, value)
              }
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
    days.splice(i, 1);
    this.setState({
      descriptions,
      startTime,
      endTime,
      days,
    });
  };

  handleDescriptionsChange(i, event) {
    let descriptions = [...this.state.descriptions];
    descriptions[i] = event.target.value;
    this.setState({ descriptions });
  }

  handleDaysChange(event, i, value) {
    let days = [...this.state.days];
    days[i] = value;
    this.setState({ days });
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
      endTime: [...prevState.endTime, ""],
      days: [...prevState.days, []],
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
    const {  facilities } = this.props;
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
        <Header as="h2">XYZ</Header>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              <Form.Field required>
                <label>Image:</label>
                <input
                  type="file"
                  onChange={this.fileChange}
                  name="uploadedFile"
                  onClick={this.handleOpen}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Container>
                <div>
                  <Header as="h5">Add Information</Header>
                  <Form>
                    <Form.Field>
                      <label>Name</label>
                      <Input
                        name="name"
                        icon="angle down"
                        value={name}
                        onChange={this.handleChange}
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
                        styleName="plus-icon"
                      />
                    </Form.Field>
                    <Form.Group>
                      <Form.Button onClick={this.submitData}>
                        Save Changes
                      </Form.Button>
                    </Form.Group>
                  </Form>
                </div>
                <Modal
                  dimmer="blurring"
                  size="tiny"
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <Modal.Header>Crop project's photo</Modal.Header>
                  <Modal.Content image>
                    {this.state.imageSrc && (
                      <Fragment>
                        <CustomCropper
                          imageStyle={IMAGE_STYLE}
                          src={this.state.imageSrc}
                          crop={this.state.crop}
                          onChange={(crop) => {
                            this.setState({ crop });
                          }}
                          onComplete={(crop, pixelCrop) => {
                            this.setState({ pixelCrop }, () =>
                              this.showCroppedImage()
                            );
                          }}
                        />
                      </Fragment>
                    )}
                  </Modal.Content>
                  <Modal.Actions>
                    <Button positive type="submit" onClick={this.handleClose}>
                      Done
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    );
  }
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

function mapStateToProps(state) {
  return {
    facilities: state.facilities,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFacilities: (url) => {
      dispatch(getFacilities(url));
    },
    addFacility: (url, data, successCallBack, errCallBack) => {
      dispatch(addFacility(url, data, successCallBack, errCallBack));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
