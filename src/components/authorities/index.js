import React from 'react'
import { connect } from 'react-redux'

import { Container ,Card,Image, Header } from 'semantic-ui-react'

import './index.css'

import { getAllAuthorities } from '../../actions/authorities'


class Authorities extends React.Component {
  componentDidMount() {
    this.props.getAllAuthorities()
  }
  render() {
    const {authorities} = this.props
    return (
      <Container>
        <Header as="h5">Authorities</Header>
        <Card.Group itemsPerRow={(3<authorities.length)?3:authorities.length}>
          {authorities.length>0?( authorities.map((authority) =>{
            return (
              <Card styleName="card">
                <Card.Content styleName="top-card">
                  <Header as='h5' styleName="zero-margin">{authority.designationName} </Header>
                  <Card.Content styleName="small-font">{authority.person}</Card.Content>
                </Card.Content>
                <Card.Content styleName="content">
                  <Image
                    floated='left'
                    size='tiny'
                    src={authority.displayPicture}
                    styleName='image-style'
                  />
                  <Container styleName="authority-info">
                    <Card.Content><span styleName="bold">Room no: </span><span styleName="details">anushka</span></Card.Content>
                    <Card.Content><span styleName="bold">Email: </span><span styleName="details">anu@gmail.com</span></Card.Content>
                    <Card.Content><span styleName="bold">Phone no: </span><span styleName="details">6377893833</span></Card.Content>
                  </Container>
                </Card.Content>
              </Card>
            )
          })): ""}
        </Card.Group>
      </Container>
    )
  }
}

function mapStateToProps (state) {
  return {
    authorities: state.authorities,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllAuthorities: () => {
      dispatch(getAllAuthorities())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authorities)