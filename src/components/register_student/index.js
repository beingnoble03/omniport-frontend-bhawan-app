import React from 'react'
import { connect } from 'react-redux'

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

import { yellowPagesUrl, residentSearchUrl, residentUrl } from '../../urls'

import './index.css'

class RegisterStudent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      options: [],
      selected: '',
      enrollmentNo: '',
      name: '',
      roomNo: ''
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
      yellowPagesUrl(e.target.value),
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
      roomNo: res.roomNumber
    })
  }

  onChange = (e, data) => {
    this.setState(
      { selected: data.value,
        name: data.value.fullName
      })
    this.props.searchResident(
      residentSearchUrl(this.props.who_am_i.hostel, data.value.roles[0].data.enrolmentNumber),
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
      successMessage : 'Student Registered'
    })
  }

  residentErrCallBack = (err) => {
    this.setState({
      errMessage: 'Failed to register student',
      successMessage: '',
    })
  }

  registerStudent = () => {
    const { selected, roomNo } = this.state
    let data = {
      "person" : selected.id,
      "room_number" : roomNo
    }
    this.props.addResident(
      data,
      residentUrl(this.props.who_am_i.hostel),
      this.residentSuccessCallBack,
      this.residentErrCallBack
    )
  }

  render () {
    const {
      selected,
      options,
      name,
      roomNo
    } = this.state
    return (
      <Grid container centered>
        <Grid.Column width={6} centered>
          <Container centered>
            <Image
              src='https://react.semantic-ui.com/images/wireframe/square-image.png'
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
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <label>Block</label>
                  <Input placeholder='Search...' />
                </Form.Field>
                <Form.Field>
                  <label>Room No.</label>
                  <Input
                    name='roomNo'
                    value={roomNo}
                    onChange={this.fieldsChange}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <label>Fathers Name</label>
                  <Input placeholder='Search...' />
                </Form.Field>
                <Form.Field>
                  <label>Home Contact No</label>
                  <Input placeholder='Search...' />
                </Form.Field>
              </Form.Group>
              <Form.Group fluid>
                <Form.Field fluid>
                  <label>Permanent Address</label>
                  <Input fluid placeholder='Search...' />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <label>Email Id</label>
                  <Input placeholder='Search...' />
                </Form.Field>
                <Form.Field>
                  <label>Contact No</label>
                  <Input placeholder='Search...' />
                </Form.Field>
              </Form.Group>
              <Button
                primary
                type='submit'
                onClick={this.registerStudent}
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
    searchResidentResult: state.searchResidentResult
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
