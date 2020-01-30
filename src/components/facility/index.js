import React from 'react'
import { connect } from 'react-redux'
import { Header, Image, Container } from 'semantic-ui-react'
import './index.css'
import { getFacilities } from '../../actions/facilities'
class Facility extends React.Component {
  componentDidMount() {
    this.props.getFacililties()
  }
  render(){
    const { facilities } = this.props
        return(
            <div>
                <Header as='h2'>{(facilities.length>0)?facilities[0].name:""} </Header>
                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium' floated='left' styleName='image_margin'/>
                <Container>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
      ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
      quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
    </p>
  {/* </Container>
  <Container styleName="info"> */}
  <Header size='small' styleName="low_margin">Timings</Header>
    <div>Breakfast</div>
    <div>Lunch</div>
  </Container>
            </div>
        )
    }
}

function mapStateToProps (state) {
  console.log(state)
  return {
    facilities: state.facilities,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFacililties: () => {
      dispatch(getFacilities())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Facility)