import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";
import { Grid, Button, GridColumn } from "semantic-ui-react";

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
const Facility = lazy(() => import("./facility/index"));
const MyProfile = lazy(() => import("./my_profile/index"));
const AdminAuthorities = lazy(() => import("./admin_authorities/index"));
const EditAuthorities = lazy(() => import("./edit-authorities/index"));
const AddFacility = lazy(() => import("./add-facility/index"));
import { whoami } from "../actions/who_am_i";
import { getConstants } from "../actions/get-constants";
import { constantsUrl } from "../urls";
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
    link: "https://link.medium.com/eoXeYayNH5/",
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
    this.state = {
      loading: true,
      consLoading: true,
      consLoaded: false,
      loaded: false,
      activeNav: "Home",
    };
  }

  componentDidMount() {
    this.props.whoami(this.successCallBack, this.errCallBack);
    this.props.getConstants(
      constantsUrl(),
      this.consSuccessCallBack,
      this.errCallBack
    );
  }
  setNavigation = (activeNav) => {
    this.setState({
      activeNav,
    });
  };
  successCallBack = (res) => {
    this.setState({
      success: true,
      error: false,
      message: res.statusText,
      loaded: true,
      loading: false,
    });
  };

  consSuccessCallBack = (res) => {
    this.setState({
      success: true,
      error: false,
      message: res.statusText,
      consLoaded: true,
      consLoading: false,
    });
  };
  errCallBack = (err) => {
    this.setState({
      error: true,
      success: false,
      message: err,
      loading: true,
      loaded: false,
    });
  };

  render() {
    const { match, who_am_i, constants } = this.props;
    if (this.state.loaded && this.state.consLoaded) {
      if (who_am_i.residence) {
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
                  render={(props) => {
                    return (
                      <Nav
                        who_am_i={who_am_i}
                        constants={constants}
                        activeNav={this.state.activeNav}
                      />
                    );
                  }}
                />
              </Switch>
              <div styleName="blocks.app-container">
                <Grid container>
                  <Grid.Row>
                    <GridColumn width={16}>
                      <Route
                        path={`${match.path}profile`}
                        render={(props) => (
                          <MyProfile
                            who_am_i={who_am_i}
                            constants={constants}
                            setNavigation={this.setNavigation}
                          />
                        )}
                      />
                      <Route
                        path={`${match.path}book_room`}
                        exact
                        render={(props) =>
                          !who_am_i.isStudent && (
                            <BookingRequests
                              who_am_i={who_am_i}
                              constants={constants}
                            />
                          )
                        }
                      />
                      <Route
                        path={`${match.path}facility`}
                        render={(props) => (
                          <Facility
                            who_am_i={who_am_i}
                            setNavigation={this.setNavigation}
                          />
                        )}
                      />
                      <Route
                        path={`${match.path}admin_complain`}
                        exact
                        render={(props) => (
                          <AdminComplains
                            who_am_i={who_am_i}
                            constants={constants}
                            setNavigation={this.setNavigation}
                            {...props}
                          />
                        )}
                      />
                      <Route
                        path={`${match.path}create-authority`}
                        render={(props) => (
                          <AdminAuthorities
                            who_am_i={who_am_i}
                            constants={constants}
                            {...props}
                          />
                        )}
                      />
                      <Route
                        path={`${match.path}edit-authority`}
                        render={(props) => (
                          <EditAuthorities
                            who_am_i={who_am_i}
                            constants={constants}
                            {...props}
                          />
                        )}
                      />
                    </GridColumn>
                    <Grid.Column width={12} floated="left">
                      <Switch>
                        <Route
                          path={`${match.path}book_room`}
                          exact
                          render={(props) =>
                            who_am_i.isStudent && (
                              <BookRoom
                                who_am_i={who_am_i}
                                constants={constants}
                                setNavigation={this.setNavigation}
                              />
                            )
                          }
                        />
                        <Route
                          path={`${match.path}complain`}
                          exact
                          render={(props) => (
                            <ComplainRegister
                              who_am_i={who_am_i}
                              constants={constants}
                              setNavigation={this.setNavigation}
                              {...props}
                            />
                          )}
                        />
                        <Route
                          path={`${match.path}add/facility`}
                          render={(props) => (
                            <AddFacility who_am_i={who_am_i} />
                          )}
                        />

                        <Route
                          path={`${match.path}`}
                          exact
                          render={(props) => (
                            <React.Fragment>
                              <Facilities
                                who_am_i={who_am_i}
                                setNavigation={this.setNavigation}
                                {...this.props}
                              />
                              <Authorities
                                who_am_i={who_am_i}
                                constants={constants}
                                {...this.props}
                              />
                            </React.Fragment>
                          )}
                        />
                        <Route
                          path={`${match.path}events`}
                          render={(props) => (
                            <Events
                              who_am_i={who_am_i}
                              setNavigation={this.setNavigation}
                            />
                          )}
                        />
                        <Route
                          path={`${match.path}admin/database`}
                          render={(props) => (
                            <StudentDatabase who_am_i={who_am_i} />
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
                              {who_am_i.isAdmin && who_am_i.isStudent ? (
                                <Link to="/bhawan_app/admin_complain">
                                  <Button
                                    fluid
                                    styleName="blocks.active-button"
                                  >
                                    Student Complains
                                  </Button>
                                </Link>
                              ) : null}
                            </React.Fragment>
                          )}
                        />
                        <Route
                          path={`${match.path}complain`}
                          exact
                          render={(props) => (
                            <React.Fragment>
                              <MyInfo {...props} who_am_i={who_am_i} />
                              <EventsCard {...props} who_am_i={who_am_i} />
                            </React.Fragment>
                          )}
                        />
                        {who_am_i.isStudent && (
                          <Route
                            path={`${match.path}book_room`}
                            exact
                            render={(props) => (
                              <React.Fragment>
                                <MyInfo {...props} who_am_i={who_am_i} />
                                <EventsCard {...props} who_am_i={who_am_i} />
                              </React.Fragment>
                            )}
                          />
                        )}
                        <Route
                          path={`${match.path}events`}
                          exact
                          render={(props) => <EventsCard who_am_i={who_am_i} />}
                        />
                      </Switch>
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
          <React.Fragment>
            Contact IMG. Your Bhawan details have not been filled
          </React.Fragment>
        );
      }
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
    constants: state.constants,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    whoami: (successCallBack, errCallBack) => {
      dispatch(whoami(successCallBack, errCallBack));
    },
    getConstants: (url, successCallBack, errCallBack) => {
      dispatch(getConstants(url, successCallBack, errCallBack));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
