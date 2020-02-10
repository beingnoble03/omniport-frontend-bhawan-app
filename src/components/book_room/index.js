import React from 'react'
import { Button, Form,Input, Container, Icon } from 'semantic-ui-react'
import { DateInput, TimeInput} from 'semantic-ui-calendar-react';
import './index.css'
import { useLocation } from 'react-router-dom';

export default class BookRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          fromDate: '',
          fromTime: '',
          endDate: '',
          endTime: '',
          visitors: 1,
        };
      }
      handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }
      increaseVisitor = (event) => {
        const visitors = this.state.visitors
        this.setState({visitors: visitors+1})
      }
    render(){
      const visitors = []
      for(var i=0;i<this.state.visitors;i++){
        visitors.push(
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
        )
      }
        return (
            <Container>
                <Form>
                  <Form.Group>
                    <Form.Field>
                      <label>From Date</label>
                      <DateInput
                          name="fromDate"
                          value={this.state.fromDate}
                          onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                      <label>From time</label>
                      <TimeInput
                          name="fromTime"
                          value={this.state.fromTime}
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
                            onChange={this.handleChange}
                          />
                      </Form.Field>
                      <Form.Field>
                        <label>Until Time</label>
                        <TimeInput
                            name="endTime"
                            value={this.state.endTime}
                            onChange={this.handleChange}
                          />
                      </Form.Field>
                    </Form.Group>
                    {visitors}
                    <Icon onClick={this.increaseVisitor} name="plus" size="big" styleName="plus-icon"/>
                    <Button primary type='submit'>Submit</Button>
                  </Form>
              </Container>
        )
    }
}