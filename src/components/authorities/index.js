import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Card, Image, Header, Button } from "semantic-ui-react";

import "./index.css";

import { getAllAuthorities } from "../../actions/authorities";
import { setActiveAuthority } from "../../actions/set-active-authority"

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

  handleRedirect = (authority) => {
    this.props.setActiveAuthority(authority)
    if(this.props.who_am_i.isAdmin && !this.props.who_am_i.isStudent ) {
    this.props.history.push("/bhawan_app/edit-authority")
    }
  };

  render() {
    const { authorities, constants, who_am_i} = this.props;
    return (
      <Container styleName="top-margin">
        <h2>
          Authorities
          {who_am_i.isAdmin && (
            <Link to="/bhawan_app/create-authority">
            <Button styleName="active-button">Add new Admin</Button>
          </Link>
          )}
        </h2>
        <Card.Group itemsPerRow={3}>
          {authorities.length > 0
            ? authorities.map((authority, index) => {
                if (index < this.state.max_length)
                  return (
                    <Card styleName="card" onClick={() => this.handleRedirect(authority)}>
                      <Card.Content styleName="top-card">
                        <Header as="h5" styleName="zero-margin">
                          {constants.designations[authority.designation]}
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
                            <span styleName="details">
                              {authority.roomNumber}
                            </span>
                          </Card.Content>
                          <Card.Content>
                            <span styleName="bold">Email: </span>
                            <span styleName="details">
                              {authority.emailAddress}
                            </span>
                          </Card.Content>
                          <Card.Content>
                            <span styleName="bold">Phone no: </span>
                            <span styleName="details">
                              {authority.phoneNumber}
                            </span>
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
    setActiveAuthority: (id) => {
      dispatch(setActiveAuthority(id))
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Authorities);
