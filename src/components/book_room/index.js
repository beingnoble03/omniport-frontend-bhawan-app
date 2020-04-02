import React from 'react'
import { connect } from 'react-redux'
import { Button, Form,Input, Container, Icon, Segment } from 'semantic-ui-react'
import { DateInput, TimeInput} from 'semantic-ui-calendar-react';
import './index.css'
import { bookRoom } from '../../actions/book-room'
import * as moment from 'moment';

class BookRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          fromDate: '',
          fromTime: '',
          endDate: '',
          endTime: '',
          visitors: [''],
          relatives: [''],
          document: '',
          documentUrl: ''
        };
      }
    handleChange = (event, {name, value}) => {
      if (this.state.hasOwnProperty(name)) {
        this.setState({ [name]: value });
      }
    }
    increaseVisitor = (event) => {
      this.setState(
        prevState => ({ visitors: [...prevState.visitors , ''],
                        relatives: [...prevState.relatives, ''],
        })
      )
    }

    createForm = () => {
      return this.state.visitors.map((visitor, i) =>
         <div key={i}>
            <Form.Group>
              <Form.Field>
                <label>Name of Visitor</label>
                <Input icon='angle down' value={visitor || ''} onChange={(event) => this.handleVisitorChange(i, event)}/>
              </Form.Field>
              <Form.Field>
                <label>Relation</label>
                <Input icon='angle down' value={this.state.relatives[i] || ''} onChange={(event) => this.handleRelativeChange(i, event)}/>
              </Form.Field>
                <Icon name='close' onClick={() => this.removeClick(i)} />
             </Form.Group>
         </div>
     )
    }
    handleVisitorChange(i, event) {
      let visitors = [...this.state.visitors];
      visitors[i] = event.target.value;
      this.setState({ visitors });
   }
   handleRelativeChange(i, event) {
    let relatives = [...this.state.relatives];
    relatives[i] = event.target.value;
    this.setState({ relatives });
 }

   addClick(){
     this.setState(prevState => ({ visitors: [...prevState.visitors, '']}))
   }

   removeClick(i){
      let visitors = [...this.state.visitors];
      let relatives = [...this.state.relatives]
      visitors.splice(i,1);
      relatives.splice(i,1)
      this.setState({ visitors, relatives });
   }

    handleSubmit = e => {
      const finalVisitor = []
      this.state.visitors.forEach((visitor, index) => {
        finalVisitor.push({"fullName": visitor, "relation": this.state.relatives[index]})
      })
      let data = {
        "requestedFrom": moment(this.state.fromDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
        "requestedTill": moment(this.state.endDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
        "bookedByRoomNo": this.props.who_am_i.roomNumber,
        "relative": finalVisitor
      }
      bookRoom(data, successCallBack, this.errCallBack)
    }
    successCallBack = res => {
      this.setState({
        success: true,
        error: false,
        message: res.statusText
      })
    }

    errCallBack = err => {
      this.setState({
        error: true,
        success: false,
        message: err
      })
    }
    handleSelectPicture = e => {
      if (e.target.files && e.target.files.length ==1) {
        this.setState({
          document: e.target.files[0],
          documentUrl: URL.createObjectURL(e.target.files[0])
        })
      }
    }
    render(){
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
                    <Form.Group>
                    {this.createForm()}
                    </Form.Group>
                    <Form.Group>
                      <Form.Field>
                        <Icon onClick={this.increaseVisitor} name="plus" size="big" styleName="plus-icon"/>
                      </Form.Field>
                      <Form.Field>
                        <Segment raised>
                          Upload Documents
                          <input
                            type='file'
                            accept=".pdf"
                            onChange={this.handleSelectPicture}
                            count={1}
                          />
                        </Segment>
                      </Form.Field>
                      <Form.Field>
                        <Button primary type='submit' onClick={this.handleSubmit}>Submit</Button>
                      </Form.Field>
                    </Form.Group>
                  </Form>
              </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
  return {
    bookRoom: () => {
      dispatch(BookRoom())
    }
  }
}

export default connect(null, mapDispatchToProps)(BookRoom)
