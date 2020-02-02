import React from 'react'
import { Button, Form, Input, Select, TextArea, Grid, Responsive } from 'semantic-ui-react'
import { TimeInput } from 'semantic-ui-calendar-react';
import './index.css';
import { connect } from 'react-redux';
import { addComplaint } from '../../actions/add_complaint'

  const options = [
    { key: '1', text: 'Toilet', value: 'toi' },
    { key: '2', text: 'Electric', value: 'ele' },
    { key: '3', text: 'Carpentary', value: 'car' },
  ]

class ComplainRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        convenientTime: "",
        complain: "",
        category: "",
        };
      }
    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
    }
    handleSubmit = e => {
      let data = {
        "complainant": 4,
        "hostel": "Radhakrishnan bhawan",
        "complaintType": this.state.category,
        "availableFrom": this.state.convenientTime,
        "availableTill": "23:59",
        "roomNo": 343,
        "hostelCode": "rkb",
        "description": this.state.complain
      }
      addComplaint(data)
    }
    render(){
        return (
            <div>
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
                   <Button size='medium' styleName="button" onClick={this.handleSubmit}>Submit</Button>
                </Form> 
              </div>
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

 