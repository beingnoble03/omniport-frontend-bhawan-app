import React from 'react'
import connect from 'react-redux'
import { Header, Image, Container } from 'semantic-ui-react'
import './index.css'
import { getFacility } from '../../actions/facility'
class Facility extends React.Component {
  // componentDidMount() {
  //   this.props.getFacililty()
  // }
  render(){
        return(
            <div>
                <Header as='h2'>Mess</Header>
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
    facility: state.facility,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFacililty: () => {
      dispatch(getFacility())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Facility)