import React from 'react'
import { Button, Form, Input, Select, TextArea } from 'semantic-ui-react'
import { TimeInput } from 'semantic-ui-calendar-react';
import './index.css';

  const options = [
    { key: 'r', text: 'Room', value: 'room' },
    { key: 'w', text: 'Washroom', value: 'washroom' },
  ]

export default class ComplainRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        convenientTime: ""
        };
      }
    handleChange = (event, {name, value}) => {
        console.log(value);
        console.log(name);
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
    }
    render(){
        return (
            <div>
                <Form>
        <Form.Group>
        <Form.Field
            control={Select}
            label='Category'
            options={options}
            placeholder='Room'
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          label='Complaint'
          placeholder='Type your complaint here ....'
          styleName="complaint"
          rows="5"
        />
         <Form.Field>
            <label>Convenient time</label>
            <TimeInput
                name="convenientTime"
                value={this.state.convenientTime}
                icon="angle down"
                iconPosition="right"
                onChange={this.handleChange}
            />
         </Form.Field>

         <Button size='medium' styleName="button">Submit</Button>
      </Form>
              </div>
        )
    }
}