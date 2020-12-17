import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Container,
  Form,
  Dropdown,
  TextArea,
  Grid,
  Input,
  Icon,
  Message,
  Image,
  Button,
} from 'semantic-ui-react';
import { TimeInput } from 'semantic-ui-calendar-react';
import { getFacilities, addFacility } from '../../actions/facilities';
import { facilitiesUrl } from '../../urls';
import './index.css';

const options = [
  { key: 'mon', text: 'Monday', value: 'Monday' },
  { key: 'tue', text: 'Tuesday', value: 'Tuesday' },
  { key: 'wed', text: 'Wednesday', value: 'Wednesday' },
  { key: 'thurs', text: 'Thursday', value: 'Thursday' },
  { key: 'fri', text: 'Friday', value: 'Friday' },
  { key: 'sat', text: 'Saturday', value: 'Saturday' },
  { key: 'sun', text: 'Sunday', value: 'Sunday' },
  { key: 'dai', text: 'Daily', value: 'Daily' },
];

class Facility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: [''],
      endTime: [''],
      descriptions: [''],
      information: '',
      name: '',
      days: [[]],
      displayImage: null,
      validImage: true,
      imageCrop: true,
      imageURL: '',
      imageSrc: null,
      pixel: null,
      crop: {
        aspect: 1,
      },
      open: false,
      loading: false
    };
  }

  componentDidMount() {
    this.props.getFacilities(facilitiesUrl(this.props.activeHostel));
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

  submitData = () => {
    const {
      croppedImage,
      information,
      startTime,
      endTime,
      descriptions,
      displayImage,
    } = this.state;
    let image = null;

    !croppedImage ? (image = false) : (image = true);

    this.setState({
      imageCrop: image,
    });
    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('description', this.state.information);
    for (var i = 0; i < this.state.days.length; i++) {
      for (var j = 0; j < this.state.days[i].length; j++) {
        formData.append(
          'timings',
          JSON.stringify({
            day: this.state.days[i][j],
            start: this.state.startTime[i],
            end: this.state.endTime[i],
            description: this.state.descriptions[i],
          })
        );
      }
    }
    formData.append('displayPicture', displayImage);
    this.setState({
      loading: true
    })
    this.props.addFacility(
      facilitiesUrl(this.props.activeHostel),
      formData,
      this.successCallBack,
      this.errCallBack
    );
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

  removeClick = (i) => {
    let descriptions = [...this.state.descriptions];
    let startTime = [...this.state.startTime];
    let endTime = [...this.state.endTime];
    let days = [...this.state.days];
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

  createForm = () => {
    return this.state.descriptions.map((description, i) => (
      <div key={i}>
        <Form.Group>
          <Form.Field>
            <label>Timings Description</label>
            <Input
              value={description || ''}
              onChange={(event) => this.handleDescriptionsChange(i, event)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <label>Days</label>
            <Dropdown
              name='days'
              placeholder='Select Day'
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
              name='startTime'
              value={this.state.startTime[i]}
              onChange={(event, { value }) =>
                this.handleStartTimeChange(event, i, value)
              }
            />
          </Form.Field>
          <Form.Field>
            <label>End time</label>
            <TimeInput
              name='endTime'
              value={this.state.endTime[i]}
              onChange={(event, { value }) =>
                this.handleEndTimeChange(event, i, value)
              }
            />
          </Form.Field>
          {this.state.descriptions.length > 1 ? (
            <Icon
              name='close'
              styleName='hover-icon'
              onClick={(event) => this.removeClick(i)}
            />
          ) : null}
        </Form.Group>
      </div>
    ));
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
      descriptions: [...prevState.descriptions, ''],
      startTime: [...prevState.startTime, ''],
      endTime: [...prevState.endTime, ''],
      days: [...prevState.days, []],
    }));
  };

  successCallBack = (res) => {
    this.setState({
      success: true,
      error: false,
      message: res.statusText,
      name: '',
      information: '',
      loading: false
    });
  };

  errCallBack = (err) => {
    this.setState({
      error: true,
      success: false,
      message: err,
      loading: false
    });
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };
  handleSelectPicture = async (e, i) => {
    const z = e.target.files;
    if (e.target.files && e.target.files.length == 1) {
      const displayImage = await readFile(z[0]);
      const displayImageFile = await dataURLtoFile(displayImage, 'image.png');

      this.setState({
        displayImage: displayImageFile,
        imageURL: displayImage
      });
    }
  };
  render() {
    const { information, name, loading, imageURL } = this.state;
    const { facilities } = this.props;
    return (
      <Grid.Column width={12} floated='left'>
        <Grid.Column width={3}>
          {this.state.error && (
            <Message warning>
              <Icon name='warning' />
              {this.state.message.response.data}
            </Message>
          )}
          {this.state.success && (
            <Message positive>{this.state.message}</Message>
          )}
          <Header as='h2'>Add new facility</Header>
          <Grid divided='vertically'>
            <Grid.Row columns={3}>
              <Grid.Column width={4}>
                {(imageURL && imageURL!="") &&
                    <Image
                    src={imageURL}
                    />
                  }
              </Grid.Column>
              <Grid.Column width={8}>
                <Container>
                  <div>
                    <Form>
                      <Form.Field>
                        <label>Name</label>
                        <Input
                          name='name'
                          value={name}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Information</label>
                        <TextArea
                          name='information'
                          value={information}
                          onChange={this.handleChange}
                          placeholder='Tell us more about the facility'
                          fluid
                        />
                      </Form.Field>
                      <Form.Field required>
                        <label>Image:</label>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={this.handleSelectPicture}
                          name='uploadedFile'
                        />
                      </Form.Field>
                      {this.createForm()}
                      <Form.Field>
                        <Icon
                          onClick={this.addClick}
                          name='plus'
                          size='big'
                          styleName='plus-icon'
                        />
                      </Form.Field>
                      <Form.Group>
                        <Button onClick={this.submitData} loading={loading} primary>
                          Save Changes
                        </Button>
                      </Form.Group>
                    </Form>
                  </div>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Column>
    );
  }
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','),
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
    activeHostel: state.activeHostel
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
