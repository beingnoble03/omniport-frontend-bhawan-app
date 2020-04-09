import React from 'react'
import {connect} from 'react-redux'
import { Table, Header, Button } from 'semantic-ui-react'
import {getComplains} from '../../actions/complains'
import {addComplaint} from '../../actions/add_complaint'
import './index.css'

class Complains extends React.Component {
    state =
     {
       inButtonMode: false,
       complainAgainID: null
      }
    componentDidMount(){
        this.props.getComplains(this.props.who_am_i.residence)
    }
    toggleButtonMode = () => {
        const inButtonMode = this.state.inButtonMode
        if(inButtonMode){
            addComplaint(complain)
        }
        this.setState({
            inButtonMode: !inButtonMode,
        })
    }
    handleComplainAgain = () => {
      console.log("complain again")
      // this.props.complainAgain();
    }
    render(){
        const { complains } = this.props
        const { inButtonMode } = this.state

        return (
            <React.Fragment>
                <Header as="h3">My Complains</Header>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Complaint</Table.HeaderCell>
                      <Table.HeaderCell>Complain Type</Table.HeaderCell>
                      <Table.HeaderCell>Complain Status</Table.HeaderCell>
                      <Table.HeaderCell>Complain Date</Table.HeaderCell>
                      <Table.HeaderCell>Applicant Room</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    { complains.length>0? (complains.map((complain,index) => {
                      return (
                        <Table.Row>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>
                            <div styleName="complain-description">
                                <div>{complain.description}</div>
                                <div onClick={this.toggleButtonMode}>
                                    {
                                        inButtonMode
                                        ?
                                        <Button onClick={() => this.handleComplainAgain(complain.id) }>Complain Again</Button> :
                                        "..."
                                    }
                                </div>
                            </div>
                        </Table.Cell>
                        <Table.Cell>{complain.complaintType}</Table.Cell>
                        <Table.Cell>{complain.status}</Table.Cell>
                        <Table.Cell>{complain.roomNo}</Table.Cell>
                        <Table.Cell>{complain.roomNo}</Table.Cell>
                      </Table.Row>
                      )
                    })):null
                    }
                  </Table.Body>
                </Table>
            </React.Fragment>
        )
    }


}

function mapStateToProps(state){
  return{
      complains: state.complains,
   }
}

const mapDispatchToProps= dispatch => {
    return {
      getComplains: (residence)=> {
        dispatch(getComplains(residence))
    },
      addComplaint: () => {
        dispatch(addComplaint())
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Complains)
