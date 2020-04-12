import React from "react";
import { connect } from "react-redux";

import { Container, Card, Image, Header } from "semantic-ui-react";

import "./index.css";

import { getAllAuthorities } from "../../actions/authorities";

class Authorities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      max_length: 6,
    };
  }
  componentDidMount() {
    this.props.getAllAuthorities(this.props.who_am_i.residence);
  }
  increaseCount = () => {
    const max_length = this.state.max_length + 3;
    this.setState({
      max_length,
    });
  };
  handleRedirect = (id) => {
    console.log(id);
  };
  render() {
    const { authorities } = this.props;
    return (
      <Container>
        <Header as="h5">Authorities</Header>
        <Card.Group itemsPerRow={3}>
          {authorities.length > 0
            ? authorities.map((authority, index) => {
                if (index < this.state.max_length)
                  return (
                    <Card
                      styleName="card"
                      onClick={() => this.handleRedirect(authority.id)}
                    >
                      <Card.Content styleName="top-card">
                        <Header as="h5" styleName="zero-margin">
                          Chief warden
                        </Header>
                        <Card.Content styleName="small-font">
                          {authority.name}
                        </Card.Content>
                      </Card.Content>
                      <Card.Content styleName="content">
                        <Image
                          floated="left"
                          size="tiny"
                          src={
                            authority.displayPicture ||
                            "https://react.semantic-ui.com/images/wireframe/image.png"
                          }
                          styleName="image-style"
                        />
                        <Container styleName="authority-info">
                          <Card.Content>
                            <span styleName="bold">Room no: </span>
                            <span styleName="details">anushka</span>
                          </Card.Content>
                          <Card.Content>
                            <span styleName="bold">Email: </span>
                            <span styleName="details">anu@gmail.com</span>
                          </Card.Content>
                          <Card.Content>
                            <span styleName="bold">Phone no: </span>
                            <span styleName="details">6377893833</span>
                          </Card.Content>
                        </Container>
                      </Card.Content>
                    </Card>
                  );
              })
            : "Your Bhawan admins have not added the authorities as yet"}
        </Card.Group>
        {authorities.length > this.state.max_length ? (
          <div onClick={this.increaseCount}>See more</div>
        ) : null}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    authorities: state.authorities,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAuthorities: (residence) => {
      dispatch(getAllAuthorities(residence));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Authorities);
