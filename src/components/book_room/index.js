import React from 'react'
import { Button, Form,Input } from 'semantic-ui-react'
import { DateInput, TimeInput} from 'semantic-ui-calendar-react';
import './index.css'

export default class BookRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          fromDate: '',
          fromTime: '',
          endDate: '',
          endTime: ''
        };
      }
      handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }
    render(){
        return (
            <div>
                <Form>
                      <Form.Group>
                        <Form.Field>
                          <label>From Date</label>
                          <DateInput
                              name="fromDate"
                              value={this.state.fromDate}
                              icon="angle down"
                              iconPosition="right"
                              onChange={this.handleChange}
                            />
                          </Form.Field>
                          <Form.Field>
                            <label>From time</label>
                            <TimeInput
                                name="fromTime"
                                value={this.state.fromTime}
                                icon="angle down"
                                iconPosition="right"
                                onChange={this.handleChange}
                              />
                          </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field>
                        <label>Until Date</label>
                        <DateInput
                            name="endDate"
                            value={this.state.endDate}
                            iconPosition="right"
                            onChange={this.handleChange}
                          />
                      </Form.Field>
                      <Form.Field>
                        <label>Until Time</label>
                        <TimeInput
                            name="endTime"
                            value={this.state.endTime}
                            iconPosition="right"
                            onChange={this.handleChange}
                          />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                    <Form.Field >
                      <label>Name of Visitor</label>
                      <Input icon='angle down'/>
                    </Form.Field>
                    <Form.Field>
                      <label>Relation</label>
                      <Input icon='angle down'/>
                    </Form.Field>
                  </Form.Group>
                    <Button primary fluid type='submit'>Submit</Button>
                  </Form>
              </div>
        )
    }
}