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
          proof: [],
          proofUrl: []
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
              <Form.Field>
                <input
                type='file'
                accept='image/*'
                onChange={(e) => this.handleSelectPicture(e,i)}
                name={`picture${i}`}
                id={`uploadPhoto${i}`}
                />
                {/* <label
                htmlFor={`uploadPhoto${i}`}
        >
          <Icon
            styleName='upload-btn'
            name='upload'
          />
        </label> */}
              </Form.Field>
              {this.state.visitors.length>1?
                <Icon name='close' onClick={() => this.removeClick(i)} />
             : null
            }
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
     this.setState(
       prevState =>
        ({
           visitors: [...prevState.visitors, ''],
           relatives: [...prevState.relatives, ''],
           proof: [...prevState.proof, ''],
           proofUrl: [...prevState.proofUrl, '']
          })
          )
   }

   removeClick(i){
      let visitors = [...this.state.visitors];
      let relatives = [...this.state.relatives]
      let proof = [...this.state.proof]
      let proofUrl = [...this.state.proofUrl]
      visitors.splice(i,1)
      relatives.splice(i,1)
      proof.splice(i, 1)
      proofUrl.splice(i, 1)
      this.setState({
         visitors,
         relatives,
         proof,
         proofUrl
        });
   }

    handleSubmit = e => {
      const finalVisitor = []
      this.state.visitors.forEach((visitor, index) => {
        finalVisitor.push(
          {
            "fullName": visitor,
            "relation": this.state.relatives[index],
            "photoIdentification": this.state.proof[index]
          }
        )
      })
      console.log(JSON.stringify(finalVisitor))
      let formData = new FormData()
      formData.append('requestedFrom', moment(this.state.fromDate, "DD-MM-YYYY").format("YYYY-MM-DD"))
      formData.append('requestedTill', moment(this.state.endDate, "DD-MM-YYYY").format("YYYY-MM-DD"))
      formData.append('visitor', JSON.stringify(finalVisitor))
      // this.state.visitors.forEach((visitor, index) => {
      //   formData.append('visitor', JSON.stringify({
      //     "fullName": visitor,
      //     "relation": this.state.relatives[index],
      //     "photoIdentification": this.state.proof[index]
      //   }))
      // })
      console.log("wec")
      for (var value of formData.values()) {
        console.log(value);
     }
      // let data = {
      //   "requestedFrom": moment(this.state.fromDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
      //   "requestedTill": moment(this.state.endDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
      //   "bookedByRoomNo": this.props.who_am_i.roomNumber,
      //   "visitor": finalVisitor
      // }
      this.props.bookRoom(formData, this.successCallBack, this.errCallBack)
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
    handleSelectPicture = (e, i) => {
      if (e.target.files && e.target.files.length ==1) {
        const newProofs = this.state.proof.slice()
        const newProofUrl = this.state.proofUrl.splice()
        newProofs[i] = e.target.files[0]
        newProofUrl[i] = URL.createObjectURL(e.target.files[0])
        this.setState({
          proof: newProofs,
          proofUrl: newProofUrl
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
                    {this.createForm()}
                    {/* <Form.Group> */}
                      <Form.Field>
                        <Icon onClick={this.increaseVisitor} name="plus" size="big" styleName="plus-icon"/>
                      </Form.Field>
                      {/* 
                       */}
                      <Form.Field>
                        <Button primary type='submit' onClick={this.handleSubmit}>Submit</Button>
                      </Form.Field>
                    {/* </Form.Group> */}
                  </Form>
              </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
  return {
    bookRoom: (data, successCallBack, errCallBack) => {
      dispatch(bookRoom(data, successCallBack, errCallBack))
    }
  }
}

export default connect(null, mapDispatchToProps)(BookRoom)
