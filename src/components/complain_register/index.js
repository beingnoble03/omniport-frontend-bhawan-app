import React from 'react'
import { Button, Form, Select, TextArea, Message, Icon, Input, Dropdown } from 'semantic-ui-react'
import { TimeInput } from 'semantic-ui-calendar-react';
import './index.css';
import { connect } from 'react-redux';
import { addComplaint } from '../../actions/add_complaint'
import Complains from '../complains/index'

class ComplainRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        convenientTime: "",
        complain: "",
        category: "",
        success: false,
        error: false,
        message: "",
        };
      }
    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
    }
    handleSubmit = e => {
      let data = {
        "person": 1,
        "complaintType": this.state.category,
        "availableFrom": this.state.convenientTime,
        "availableTill": "23:59",
        "room_no": 343,
        "hostel_code": "rkb",
        "description": this.state.complain
      }
      this.props.addComplaint(data,this.props.who_am_i.residence, this.successCallBack, this.errCallBack)
    }

    successCallBack = res => {
      this.setState({
        success: true,
        error: false,
        message: res.statusText,
        convenientTime: "",
        complain: "",
        category: ""
      })
    }

    errCallBack = err => {
      this.setState({
        error: true,
        success: false,
        message: err
      })
    }
    render(){
      const options = [
        { key: '1', text: 'Toilet', value: 'toi' },
        { key: '2', text: 'Electric',value: 'ele' },
        { key: '3', text: 'Carpentary', value: 'car' },
      ]
        return (
            <React.Fragment>
              {this.state.error && (
                <Message warning>
                <Icon name='warning' />
                  Okay
              </Message>
              )}
              {this.state.success && (
                <Message positive>
                Your complain has been made succesfully
              </Message>
              )}
                <Form>
                  <Form.Field>
                    <label>Category</label>
                    <Dropdown
                      name='category'
                      selection
                      options={options}
                      onChange={this.handleChange}
                      styleName='field-width'
                    />
                  </Form.Field>
                  <Form.Field
                    name='complain'
                    value={this.state.complain}
                    onChange={this.handleChange}
                    control={TextArea}
                    label='Complaint'
                    placeholder='Type your complaint here ....'
                    styleName="complaint"
                    rows="5"
                  />
                   <Form.Field styleName='field-width'>
                      <label>Convenient time</label>
                      <TimeInput
                          autoComplete='off'
                          name="convenientTime"
                          value={this.state.convenientTime}
                          icon="angle down"
                          iconPosition="right"
                          onChange={this.handleChange}
                      />
                   </Form.Field>
                   <Button size='medium' styleName="button" onClick={this.handleSubmit} width={3}>Submit</Button>
                </Form>
                <Complains />
              </React.Fragment>
        )
    }
}
function mapStateToProps (state) {
  return {
    complains: state.complains,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      addComplaint: (data, residence, successCallBack, errCallBack) => {
      dispatch(addComplaint(data, residence, successCallBack, errCallBack))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplainRegister)
