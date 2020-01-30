import React from 'react'
import { Header, Image, Container, Button, Form } from 'semantic-ui-react'
import { TimeInput } from 'semantic-ui-calendar-react';
import './index.css';

export default class AdminFacility extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          editMode: false,
          startBreakfast: "",
          endBreakfast: "",
          startLunch: "",
          endLunch: "",
          startDinner: "",
          endDinner: "",
        };
      }
      changetoEditMode = () => {
        this.setState({
            editMode: true,
        })
      }
      handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }
    render(){
        return(
            <div>
                <div>
                    <Button styleName="button_margin">Mess</Button>
                    <Button styleName="button_margin">Canteen</Button>
                    <Button styleName="button_margin">Mess</Button>
                    <Button styleName="button_margin">Canteen</Button>
                    <Button styleName="button_margin">Mess</Button>
                    <Button styleName="button_margin">Canteen</Button>
                </div>
                <Header as='h2'>Mess</Header>
                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='large' floated='left' styleName='image_margin'/>
                <Container>
                {this.state.editMode ? (
                    <div>
                        <Form>
                            {/* <Form.TextArea label='Edit Information'/> */}
                            <Header as='h5'>Edit Information</Header>
                            <Form.Group>
                                <Form.Field>
                                  <label> Start Breakfast</label>
                                  <TimeInput
                                      name="startBreakfast"
                                      value={this.state.startBreakfast}
                                      icon="angle down"
                                      iconPosition="right"
                                      onChange={this.handleChange}
                                    />
                                  </Form.Field>
                                <Form.Field>
                                <label>End Breakfast</label> 
                                  <TimeInput
                                      name="endBreakfast"
                                      value={this.state.endBreakfast}
                                      icon="angle down"
                                      iconPosition="right"
                                      onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group>
                                <Form.Field>
                                  <label> Start Lunch</label>
                                  <TimeInput
                                      name="startBreakfast"
                                      value={this.state.startLunch}
                                      icon="angle down"
                                      iconPosition="right"
                                      onChange={this.handleChange}
                                    />
                                  </Form.Field>
                                <Form.Field>
                                <label>End Lunch</label> 
                                  <TimeInput
                                      name="endBreakfast"
                                      value={this.state.endLunch}
                                      icon="angle down"
                                      iconPosition="right"
                                      onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group>
                                <Form.Field>
                                  <label> Start Dinner</label>
                                  <TimeInput
                                      name="startLunch"
                                      value={this.state.startDinner}
                                      icon="angle down"
                                      iconPosition="right"
                                      onChange={this.handleChange}
                                    />
                                  </Form.Field>
                                <Form.Field>
                                <label>End Dinner</label> 
                                  <TimeInput
                                      name="endBreakfast"
                                      value={this.state.endDinner}
                                      icon="angle down"
                                      iconPosition="right"
                                      onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group>
                                <Form.Button>Save Changes</Form.Button>
                                <Form.Button>Cancel</Form.Button>
                            </Form.Group>
                        </Form>
                    </div>
                    ) : (
                    <div>
                         <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                        ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                        magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                        quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                    </p>
                    <Header size='small' styleName="low_margin">Timings</Header>
                    <div>Breakfast</div>
                    <div>Lunch</div>
                    <span onClick={this.changetoEditMode}>Edit</span>
                    </div>
                    )}
                   
                </Container>
            </div>
        )
    }
}