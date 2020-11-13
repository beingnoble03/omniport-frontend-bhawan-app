import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { Icon, Menu } from "semantic-ui-react";

import {
  homePageUrl,
  complainUrl,
  profilePageUrl,
  bookingUrl,
  registrationUrl,
} from "../../urls";

import "./index.css";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "" };
  }

  handleItemClick = (e, { name }) => {
    this.props.linkClick();
    this.setState({ activeItem: name });
  };

  render() {
    const { sidebarStatus } = this.props;
    const { activeItem } = this.state;
    return (
      <Menu
        styleName={[
          "sub-header",
          "menu-bar",
          sidebarStatus ? "" : "closed-menu-bar",
        ].join(" ")}
        floated="right"
        size="large"
        pointing
        secondary
        vertical
      >
        <Scrollbars autoHide >
          <Link to={bookingUrl()}>
            <Menu.Item
              name="booking"
              onClick={this.handleItemClick}
              //   active={
              //     isActiveItem(urlLibraryView(), true) ||
              //     isActiveItem(urlLibraryCourseView(), false)
              //   }
              className={["menu-icon-bar", "menu-items"].join(" ")}
            >
              <Icon name="book" />
              Book a Room
            </Menu.Item>
          </Link>
          <Link to={complainUrl()}>
            <Menu.Item
              name="complains"
              onClick={this.handleItemClick}
              //   active={
              //     isActiveItem(urlLibraryView(), true) ||
              //     isActiveItem(urlLibraryCourseView(), false)
              //   }
              className={["menu-icon-bar", "menu-items"].join(" ")}
            >
              <Icon name="book" />
              Make a Complain
            </Menu.Item>
          </Link>
          <Link to={profilePageUrl()}>
            <Menu.Item
              name="profile"
              onClick={this.handleItemClick}
              //   active={
              //     isActiveItem(urlLibraryView(), true) ||
              //     isActiveItem(urlLibraryCourseView(), false)
              //   }
              className={["menu-icon-bar", "menu-items"].join(" ")}
            >
              <Icon name="book" />
              Visit My Profile
            </Menu.Item>
          </Link>
          <Link to={homePageUrl()}>
            <Menu.Item
              name="home"
              onClick={this.handleItemClick}
              //   active={
              //     isActiveItem(urlLibraryView(), true) ||
              //     isActiveItem(urlLibraryCourseView(), false)
              //   }
              className={["menu-icon-bar", "menu-items"].join(" ")}
            >
              <Icon name="book" />
              Home Page
            </Menu.Item>
          </Link>
        </Scrollbars>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    course: state.getUserCourses,
    user: state.getUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserCourses: () => {
      dispatch(getUserCourses());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
