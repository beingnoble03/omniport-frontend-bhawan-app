import React from 'react'
import {connect} from 'react-redux'
import { Card, Container } from 'semantic-ui-react'
import { getFacilities } from '../../actions/facilities'
import facilities from './index.css'
import blocks from '../../css/app.css'

class Facilities extends React.Component {

  componentDidMount(){
    this.props.getFacilities()
  }

  render() {
    const { facilities } = this.props

    return (
      <Container>
        <h2>Facilities</h2>
        <Card.Group itemsPerRow={3}>
        {facilities.length>0 ? ( facilities.map((facility) =>{
            return (
              <Card styleName="blocks.card-border">
                <Card.Content>
                  <div styleName="facilities.facility_card">
                    <div>{facility.name}</div>
                    <div>Mess</div>
                  </div>
                </Card.Content>
              </Card>
            )
          })): ""}
        </Card.Group>
          </Container>
    )
  }
}
function mapStateToProps(state){
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


 