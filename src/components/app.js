import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import { AppHeader, AppFooter, Loading } from "formula_one";
const Nav = lazy(() => import("./navbar/index"));
const BookRoom = lazy(() => import("./book_room/index"));
const ComplainRegister = lazy(() => import("./complain_register/index"));
const Authorities = lazy(() => import("./authorities/index"));
const Facilities = lazy(() => import("./facilities/index"));
const MyInfo = lazy(() => import("./my_info/index"));
const StudentDatabase = lazy(() => import("./student-database/index"));
const EventsCard = lazy(() => import("./events-card/index"));
const Events = lazy(() => import("./events/index"));
const AdminComplains = lazy(() => import("./admin-complaints/index"));
const BookingRequests = lazy(() => import("./booking_request/index"));
const Facility = lazy(() => import("./facility/index"))
const MyProfile = lazy(() => import('./my_profile/index'))
const AdminAuthorities = lazy(() => import('./admin_authorities/index'))
import { whoami } from "../actions/who_am_i";
import PastBookings from "./past_bookings_admin/index";
import main from "formula_one/src/css/app.css";
import blocks from "../css/app.css";
import RegisterStudent from "./register_student/index";

const creators = [
  {
    name: "Aman Sharma",
    role: "Mentor",
    link: "https://github.com/algomaster99/",
  },
  {
    name: "Ritvik Jain",
    role: "Backend developer",
    link: "https://github.com/ritvikjain99/",
  },
  {
    name: "Suyash Salampuria",
    role: "Frontend developer",
    link: "https://github.com/SuyashSalampuria/",
  },
  {
    name: "Kashish Jagyasi",
    role: "Designer",
    link: "aalu",
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
    this.state = {
      loading: true,
      loaded: false,
    };
  }

  componentDidMount() {
    this.props.whoami(this.successCallBack, this.errCallBack);
  }
  successCallBack = (res) => {
    this.setState({
      success: true,
      error: false,
      message: res.statusText,
      loaded: true,
      loading: false,
    });
  };

  errCallBack = (err) => {
    this.setState({
      error: true,
      success: false,
      message: err,
    });
  };

  render() {
    const { match, who_am_i } = this.props;
    if (this.state.loaded) {
      return (
        <div ref={this.divRef} styleName="blocks.app-wrapper">
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route
                path={`${match.path}`}
                render={(props) => (
                  <AppHeader appName="bhawan_app" mode="app" userDropdown />
                )}
              />
            </Switch>
            <Switch>
              <Route
                path={`${match.path}`}
                render={(props) => <Nav who_am_i={who_am_i} />}
              />
            </Switch>
            <div styleName="blocks.app-container">
              <Grid container>
                <Grid.Row>
                  <Grid.Column width={12} floated="left">
                    <Switch>
                      <Route
                        path={`${match.path}book_room`}
                        render={(props) => <BookRoom who_am_i={who_am_i} />}
                      />
                      <Route
                        path={`${match.path}complain`}
                        render={(props) => (
                          <ComplainRegister who_am_i={who_am_i} />
                        )}
                      />
                      <Route
                        path={`${match.path}facility`}
                        render={(props) => <Facility who_am_i={who_am_i} />}
                      />
                      <Route
                        path={`${match.path}profile`}
                        render={(props) => <MyProfile who_am_i={who_am_i} />}
                      />
                      <Route
                        path={`${match.path}`}
                        exact
                        render={(props) => <Facilities who_am_i={who_am_i} />}
                      />
                      <Route
                        path={`${match.path}events`}
                        render={(props) => <Events who_am_i={who_am_i} />}
                      />
                      <Route
                        path={`${match.path}admin/complains`}
                        render={(props) => (
                          <AdminComplains who_am_i={who_am_i} />
                        )}
                      />
                      <Route
                        path={`${match.path}admin/authority`}
                        render={(props) => (
                          <AdminAuthorities who_am_i={who_am_i} />
                        )}
                      />
                      <Route
                        path={`${match.path}admin/database`}
                        render={(props) => (
                          <StudentDatabase who_am_i={who_am_i} />
                        )}
                      />
                      <Route
                        path={`${match.path}admin/bookings`}
                        render={(props) => (
                          <BookingRequests who_am_i={who_am_i} />
                        )}
                      />
                      <Route
                        path={`${match.path}admin/register_student`}
                        render={(props) => (
                          <RegisterStudent who_am_i={who_am_i} />
                        )}
                      />
                    </Switch>
                  </Grid.Column>
                  <Grid.Column width={3} floated="right">
                    <Switch>
                      <Route
                        path={`${match.path}`}
                        exact
                        render={(props) => (
                          <React.Fragment>
                            <MyInfo {...props} who_am_i={who_am_i} />
                            <EventsCard {...props} who_am_i={who_am_i} />
                          </React.Fragment>
                        )}
                      />
                      <Route
                        path={`${match.path}events`}
                        exact
                        render={(props) => <EventsCard who_am_i={who_am_i} />}
                      />
                    </Switch>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={12}>
                    <Route
                      path={`${match.path}`}
                      exact
                      render={(props) => <Authorities who_am_i={who_am_i} />}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Suspense>
          <AppFooter creators={creators} />
        </div>
      );
    } else {
      return (
        <div styleName="blocks.content-div">
          <Loading />
        </div>
      );
    }
  }
}
function mapStateToProps(state) {
  return {
    who_am_i: state.who_am_i,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    whoami: (successCallBack, errCallBack) => {
      dispatch(whoami(successCallBack, errCallBack));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
