import React from 'react'
import {connect} from 'react-redux'
import { Card } from 'semantic-ui-react'
import { getFacilities } from '../../actions/facilities'
import './index.css'
class Facilities extends React.Component {

  componentDidMount(){
    this.props.getFacilities()
  }
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const { facilities } = this.props

    return (
      <div>
        <h2>Facilities</h2>
        
        <Card.Group itemsPerRow={3}>
        {facilities.length>0?( facilities.map((facility) =>{
            return (
              <Card>
                <Card.Content styleName="content">
                  <Card.Header>Mess</Card.Header>
                  <Card.Content styleName="desc">
                    <Card.Content>Mess Time</Card.Content>
                    <Card.Content>Mess Time</Card.Content>
                    <Card.Content>Mess Time</Card.Content>
                  </Card.Content>
                </Card.Content>
              </Card>
            )
          })): ""}
          <Card>
                <Card.Content styleName="content">
                  <Card.Header>Mess</Card.Header>
                  <Card.Content styleName="desc">
                    <Card.Content>Mess Time</Card.Content>
                    <Card.Content>Mess Time</Card.Content>
                    <Card.Content>Mess Time</Card.Content>
                  </Card.Content>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content styleName="content">
                  <Card.Header>Mess</Card.Header>
                  <Card.Content styleName="desc">
                    <Card.Content>Mess Time</Card.Content>
                    <Card.Content>Mess Time</Card.Content>
                    <Card.Content>Mess Time</Card.Content>
                  </Card.Content>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content styleName="content">
                  <Card.Header>Mess</Card.Header>
                  <Card.Content styleName="desc">
                    <Card.Content>Mess Time</Card.Content>
                    <Card.Content>Mess Time</Card.Content>
                    <Card.Content>Mess Time</Card.Content>
                  </Card.Content>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content styleName="content">
                  <Card.Header>Mess</Card.Header>
                  <Card.Content styleName="desc">
                    <Card.Content>Mess Time</Card.Content>
                    <Card.Content>Mess Time</Card.Content>
                    <Card.Content>Mess Time</Card.Content>
                  </Card.Content>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content styleName="content">
                  <Card.Header>Mess</Card.Header>
                  <Card.Content styleName="desc">
                    <Card.Content>Mess Time</Card.Content>
                    <Card.Content>Mess Time</Card.Content>
                    <Card.Content>Mess Time</Card.Content>
                  </Card.Content>
                </Card.Content>
              </Card>
        </Card.Group>
          </div>
    )
  }
}
function mapStateToProps(state){
  console.log(state)
  return{
    facilities: state.facilities,
  }
}
 const mapDispatchToProps= dispatch => {
  return {
    getFacilities: ()=> {
      dispatch(getFacilities())
    }
  }
 }
 export default connect(mapStateToProps, mapDispatchToProps)(Facilities)