import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Header, Menu, Button, Icon } from "semantic-ui-react";
import navCss from "./index.css";
import blocks from "../../css/app.css";
import { whoami } from "../../actions/who_am_i";
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "home",
      activeSubGroup: "complains",
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleGroupClick = (e, { name }) => this.setState({ activeSubGroup: name });

  render() {
    const { activeItem, activeSubGroup } = this.state;

    return (
      <React.Fragment>
        <Menu secondary styleName="navCss.upper_menu">
          <Menu.Item>
            <Header>{this.props.who_am_i.residence}</Header>
          </Menu.Item>
          {!this.props.who_am_i.isAdmin ? (
            <Menu.Menu position="right">
              <Menu.Item styleName="blocks.zero-padding">
                <Link to="/bhawan_app/book_room/">
                  <Button
                    styleName={
                      location.pathname === "/bhawan_app/book_room/"
                        ? "blocks.disactive-button"
                        : "blocks.active-button"
                    }
                  >
                    Book a Guest Room
                  </Button>
                </Link>
              </Menu.Item>
              <Menu.Item styleName="blocks.zero-padding">
                <Link to="/bhawan_app/complain/">
                  <Button
                    styleName={
                      location.pathname === "/bhawan_app/complain/"
                        ? "blocks.disactive-button"
                        : "blocks.active-button"
                    }
                  >
                    Register a Complaint
                  </Button>
                </Link>
              </Menu.Item>
            </Menu.Menu>
          ) : null}
        </Menu>
        {this.props.who_am_i.isAdmin ? (
          <Menu size="mini" secondary styleName="navCss.lower_menu">
            <Link to="/bhawan_app/complain">
              <Menu.Item
                size="mini"
                name="complains"
                color="blue"
                styleName="navCss.navColor"
                active={activeSubGroup == "complains"}
                onClick={this.handleGroupClick}
              >
                Complaints
              </Menu.Item>
            </Link>
            <Link to="/bhawan_app/book_room">
              <Menu.Item
                size="mini"
                name="bookings"
                color="blue"
                styleName="navCss.navColor"
                active={activeSubGroup == "bookings"}
                onClick={this.handleGroupClick}
              >
                Guest Room Bookings
              </Menu.Item>
            </Link>
            <Link to="/bhawan_app/events">
              <Menu.Item
                size="mini"
                name="events"
                color="blue"
                styleName="navCss.navColor"
                active={activeSubGroup == "events"}
                onClick={this.handleGroupClick}
              >
                Events
              </Menu.Item>
            </Link>
            <Menu.Item
              size="mini"
              name="facauth"
              color="blue"
              styleName="navCss.navColor"
              active={activeSubGroup == "facauth"}
              onClick={this.handleGroupClick}
            >
              Facilities and Authorities
            </Menu.Item>
            <Menu.Item
              size="mini"
              name="database"
              color="blue"
              styleName="navCss.navColor"
              active={activeSubGroup == "database"}
              onClick={this.handleGroupClick}
            >
              Student Database
            </Menu.Item>
            <Menu.Item
              size="mini"
              name="register"
              color="blue"
              styleName="navCss.navColor"
              active={activeSubGroup == "register"}
              onClick={this.handleGroupClick}
            >
              Register New Student
            </Menu.Item>
          </Menu>
        ) : (
          <Menu size="mini" secondary styleName="navCss.lower_menu">
            <Menu.Item size="mini">
              <Icon name="angle left" /> <Icon name="angle right" />
              Home
            </Menu.Item>
          </Menu>
        )}
      </React.Fragment>
    );
  }
}
