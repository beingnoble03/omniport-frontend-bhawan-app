import React from 'react'
import { Button, Form, Select, TextArea, Message, Icon } from 'semantic-ui-react'
import { TimeInput } from 'semantic-ui-calendar-react';
import './index.css';
import { connect } from 'react-redux';
import { addComplaint } from '../../actions/add_complaint'
import Complains from '../complains/index'
  const options = [
    { key: '1', text: 'Toilet', value: 'toi' },
    { key: '2', text: 'Electric',value: 'ele' },
    { key: '3', text: 'Carpentary', value: 'car' },
  ]

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
        "complaint_type": this.state.category,
        "available_from": this.state.convenientTime,
        "available_till": "23:59",
        "room_no": 343,
        "hostel_code": "rkb",
        "description": this.state.complain
      }
      addComplaint(data, this.successCallBack, this.errCallBack)
    }

    successCallBack = res => {
      console.log(res)
      this.setState({
        success: true,
        error: false,
        message: res.statusText
      })
    }
  
    errCallBack = err => {
      console.log(err)
      this.setState({
        error: true,
        success: false,
        message: err
      })
    }
    render(){
        return (
            <React.Fragment>
              {this.state.error && (
                <Message warning>
                <Icon name='warning' />
                You've reached the end of this content segment!
              </Message>
              )}
                <Form>
                  <Form.Field
                      name='category'
                      control={Select}
                      label='Category'
                      options={options}
                      width={4}
                      onChange={this.handleChange}
                    />
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
                   <Form.Field>
                      <label>Convenient time</label>
                      <TimeInput
                          autoComplete='off'
                          name="convenientTime"
                          value={this.state.convenientTime}
                          icon="angle down"
                          iconPosition="right"
                          onChange={this.handleChange}
                          width={4}
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
    getAllAuthoritie: () => {
      dispatch(getComplains())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplainRegister)
