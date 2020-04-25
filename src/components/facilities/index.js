import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Container } from "semantic-ui-react";
import { getFacilities } from "../../actions/facilities";
import { facilitiesUrl } from "../../urls"
import facilities from "./index.css";
import blocks from "../../css/app.css";
import moment from "moment";

class Facilities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      max_length: 6,
    };
  }
  componentDidMount() {
    this.props.getFacilities(facilitiesUrl(this.props.who_am_i.residence));
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
    const { facilities } = this.props;

    return (
      <Container>
        <h2>Facilities</h2>
        <Card.Group itemsPerRow={3}>
          {facilities.length > 0
            ? facilities.map((facility, index) => {
                if (index < this.state.max_length)
                  return (
                    <Link to="/bhawan_app/facility/">
                      <Card
                        styleName="blocks.card-border blocks.color-black"
                        onClick={() => this.handleRedirect(facility.id)}
                      >
                        <Card.Content>
                          <div styleName="facilities.facility_card">
                            <div>{facility.name}</div>
                            <div>
                              {facility.timings.map((timing) => {
                                return (
                                  <div>
                                    {timing.start.substring(0, 5)} -{" "}
                                    {timing.end.substring(0, 5)}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </Card.Content>
                      </Card>
                    </Link>
                  );
              })
            : "Your Bhawan admins have not added the facilities"}
        </Card.Group>
        {facilities.length > this.state.max_length ? (
          <div onClick={this.increaseCount}>See more</div>
        ) : null}
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    facilities: state.facilities,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getFacilities: (url) => {
      dispatch(getFacilities(url));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Facilities);
