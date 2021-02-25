import React from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-semantic-toasts'

import {
  Button,
  Form,
  Input,
  Image,
  Grid,
  Container,
  Dropdown
} from 'semantic-ui-react'

import { searchPerson } from '../../actions/searchPerson'
import { searchResident } from '../../actions/search-resident'
import { addResident } from '../../actions/residents'

import { yellowPagesStudentUrl, residentSearchUrl, residentUrl } from '../../urls'

import './index.css'

class RegisterStudent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      options: [],
      selected: '',
      enrollmentNo: '',
      name: '',
      roomNo: '',
      emailAddress : '',
      currentYear : '',
      department : '',
      phoneNumber : '',
      dateOfBirth :'',
      displayPicture: '',
      loading: false,
      registerLoading: false,
      address: '',
      state: '',
      city: '',
      country: '',
      postalCode: '',
      fathersName: '',
      fathersContact: '',
      mothersName: '',
      mothersContact: '',
    }
    this.delayedCallback = _.debounce(this.ajaxCall, 300)
  }

  successCallBack = (res) => {
    let options = res.data.map((person, index) => {
      let text = person.fullName
      if (
        person.roles &&
        person.roles.length > 0 &&
        person.roles[0].data &&
        person.roles[0].data.branch &&
        person.roles[0].data.enrolmentNumber
      ) {
        text = `${person.roles[0].data.enrolmentNumber}`
      }
      return { key: index, text: text, value: person }
    })
    this.setState({
      options: options,
    })
  }

  ajaxCall = (e) => {
    this.props.searchPerson(
      yellowPagesStudentUrl(e.target.value),
      this.successCallBack
    )
  }

  onSearchChange = (e) => {
    e.persist()
    this.setState({ [e.target.name]: e.target.value })
    this.delayedCallback(e)
  }

  searchResidentSuccessCallBack = (res) => {
    this.setState({
      loading: false,
      roomNo: res.roomNumber,
      emailAddress : res.emailAddress,
      currentYear : res.currentYear,
      department : res.department,
      phoneNumber : res.phoneNumber,
      dateOfBirth : res.dateOfBirth,
      displayPicture : res.displayPicture,
      havingComputer: res.havingComputer,
      address: res.address,
      state: res.state,
      city: res.city,
      postalCode: res.postalCode,
      country: res.country,
      fathersName: res.fathersName,
      fathersContact: res.fathersContact,
      mothersName: res.mothersName,
      mothersContact: res.mothersContact
    })
  }

  onChange = (e, data) => {
    this.setState(
      { selected: data.value,
        name: data.value.fullName,
        loading: true,
      })
    this.props.searchResident(
      residentSearchUrl(this.props.activeHostel, data.value.roles[0].data.enrolmentNumber),
      this.searchResidentSuccessCallBack
    )
  }

  fieldsChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value })
    }
  }

  residentSuccessCallBack = (res) => {
    this.setState({
      errMessage: '',
      registerLoading: false,
      roomNo: '',
      emailAddress : '',
      currentYear : '',
      department : '',
      phoneNumber : '',
      dateOfBirth : '',
      displayPicture : '',
      successMessage : 'Student Registered',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      fathersName: '',
      fathersContact: '',
      mothersName: '',
      mothersContact: '',
    })
    toast({
      type: 'success',
      title: 'Student Registered SuccesFully',
      animation: 'fade up',
      icon: 'smile outline',
      time: 4000,
    })
  }

  residentErrCallBack = (err) => {
    this.setState({
      errMessage: 'Failed to register student',
      successMessage: '',
      registerLoading: false,
    })
    console.log(err)
    toast({
      type: 'failure',
      title: 'Unable to register Student',
      animation: 'fade up',
      icon: 'frown outline',
      time: 4000,
    })
  }

  registerStudent = () => {
    const {
      selected,
      roomNo,
      fathersName,
      fathersContact,
      mothersName,
      mothersContact
    } = this.state
    let data = {
      "person" : selected.id,
      "room_number" : roomNo,
      "fathers_name": fathersName,
      "mothers_name": mothersName,
      "fathers_contact": fathersContact,
      "mothers_contact": mothersContact
    }
    this.setState({
      registerLoading: true
    })
    this.props.addResident(
      data,
      residentUrl(this.props.activeHostel),
      this.residentSuccessCallBack,
      this.residentErrCallBack
    )
  }
  toggle = () =>
      this.setState((prevState) =>
      ({ havingComputer: !prevState.havingComputer }
        )
    )

  render () {
    const {
      selected,
      options,
      name,
      roomNo,
      emailAddress,
      currentYear,
      department,
      phoneNumber,
      dateOfBirth,
      displayPicture,
      loading,
      address,
      city,
      state,
      country,
      postalCode,
      fathersName,
      fathersContact,
      mothersName,
      mothersContact
    } = this.state
    return (
      <Grid container centered>
        <Grid.Column width={6} centered>
          <Container centered>
            <Image
              src={displayPicture?
                    displayPicture:
                    "https://react.semantic-ui.com/images/wireframe/square-image.png"
                  }
              size='tiny'
              circular
              centered
            />
            <Form centered>
              <Form.Group>
                <Form.Field >
                  <label>Enrollment No.</label>
                  <Dropdown
                    name='enrollment'
                    onSearchChange={this.onSearchChange}
                    onChange={this.onChange}
                    value={selected}
                    search
                    selection
                    closeOnChange
                    options={options}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Name</label>
                  <Input
                    name='name'
                    value={name}
                    readOnly
                    disabled
                    loading={loading}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group fluid widths='equal'>
                <Form.Field required>
                  <label>Room No.</label>
                  <Input
                    name='roomNo'
                    value={roomNo}
                    onChange={this.fieldsChange}
                    loading={loading}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group fluid widths='equal'>
                <Form.Field>
                  <label>Fathers Name</label>
                  <Input
                    name='fathersName'
                    value={fathersName}
                    onChange={this.fieldsChange}
                    loading={loading}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Fathers Contact</label>
                  <Input
                    name='fathersContact'
                    value={fathersContact}
                    onChange={this.fieldsChange}
                    loading={loading}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group fluid widths='equal'>
                <Form.Field>
                  <label>Mothers Name</label>
                  <Input
                    name='mothersName'
                    value={mothersName}
                    onChange={this.fieldsChange}
                    loading={loading}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Mothers Contact</label>
                  <Input
                    name='mothersContact'
                    value={mothersContact}
                    onChange={this.fieldsChange}
                    loading={loading}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                    <label>Current Year</label>
                    <Input
                      name="currentYear"
                      value={currentYear}
                      readOnly
                      disabled
                      loading={loading}
                    />
                </Form.Field>
                <Form.Field>
                  <label>Department</label>
                  <Input
                    name="department"
                    value={department}
                    readOnly
                    disabled
                    loading={loading}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                    <label>Phone Number</label>
                    <Input
                      name="phoneNumber"
                      value={phoneNumber}
                      readOnly
                      disabled
                      loading={loading}
                    />
                </Form.Field>
                <Form.Field>
                  <label>Date of Birth</label>
                  <Input
                    name="dateOfBirth"
                    value={dateOfBirth}
                    readOnly
                    disabled
                    loading={loading}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                    <label>Address</label>
                    <Input
                      name="address"
                      value={address}
                      readOnly
                      disabled
                      loading={loading}
                    />
                </Form.Field>
                <Form.Field>
                  <label>City</label>
                  <Input
                    name="city"
                    value={city}
                    readOnly
                    disabled
                    loading={loading}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                    <label>State</label>
                    <Input
                      name="state"
                      value={state}
                      readOnly
                      disabled
                      loading={loading}
                    />
                </Form.Field>
                <Form.Field>
                  <label>Country</label>
                  <Input
                    name="country"
                    value={country}
                    readOnly
                    disabled
                    loading={loading}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <label>Email Address</label>
                  <Input
                    name="emailAddress"
                    value={emailAddress}
                    readOnly
                    disabled
                    loading={loading}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Postal Code</label>
                  <Input
                    name="postalCode"
                    value={postalCode}
                    readOnly
                    disabled
                    loading={loading}
                  />
                </Form.Field>
              </Form.Group>
              <Button
                primary
                type='submit'
                onClick={this.registerStudent}
                disabled={!roomNo}
              >
                Register
              </Button>
            </Form>
          </Container>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchPersonResults: state.searchPersonResults,
    searchResidentResult: state.searchResidentResult,
    activeHostel: state.activeHostel
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchPerson: (url, successCallBack) => {
      dispatch(searchPerson(url, successCallBack))
    },
    searchResident: (url, successCallBack, errCallBack) => {
      dispatch(searchResident(url, successCallBack, errCallBack))
    },
    addResident: (data, url, successCallBack, errCallBack) => {
      dispatch(addResident(data, url, successCallBack, errCallBack))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (RegisterStudent)
