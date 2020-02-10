import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Container } from 'semantic-ui-react'
import { getFacilities } from '../../actions/facilities'
import facilities from './index.css'
import blocks from '../../css/app.css'
import moment from 'moment'

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
                <Link to='/bhawan_app/facility/1/'>
                <Card styleName="blocks.card-border blocks.color-black">
                  <Card.Content>
                    <div styleName="facilities.facility_card">
                      <div>{facility.name}</div>
                      <div>
                        {
                          facility.timings.map(timing =>{
                            return (
                              <div>{timing.start.substring(0,5)} - {timing.end.substring(0,5)}</div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </Card.Content>
                </Card>
                </Link>
              )
            })): "fuck Chief warden"}
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
