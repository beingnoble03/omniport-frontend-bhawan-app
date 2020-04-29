import React from "react";
import { connect } from "react-redux";
import {
  Header,
  Image,
  Button,
  Form,
  Input,
  Dropdown,
} from "semantic-ui-react";
import { TimeInput } from "semantic-ui-calendar-react";
import { searchPerson } from "../../actions/searchPerson";
import { addAuthority } from "../../actions/authorities";
import { yellowPagesUrl, authoritiesUrl } from "../../urls";
import "./index.css";
import constants from "../../reducers/constants";
import who_am_i from "../../reducers/who-am-i";

class AdminAuthorities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: "",
      success: false,
      error: false,
      permissions: null,
      options: [],
      selected: "",
    };
    this.delayedCallback = _.debounce(this.ajaxCall, 300);
  }

  handleSubmit = () => {
    if (this.state.selected && this.props.match.params.id) {
      let data = {
        designation: this.props.match.params.id,
        person: this.state.selected.id,
      };
      this.props.addAuthority(
        authoritiesUrl(this.props.who_am_i.residence),
        data,
        this.adminCallBack,
        this.errCallBack
      );
    }
  };

  adminCallBack = (res) => {
    this.setState({
      success: true,
      error: false,
      message: res.statusText,
    });
  };
  errCallBack = (err) => {
    this.setState({
      error: true,
      success: false,
      message: err,
    });
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  successCallBack = (res) => {
    let options = res.data.map((person, index) => {
      let text = person.fullName;
      if (
        person.roles &&
        person.roles.length > 0 &&
        person.roles[0].data &&
        person.roles[0].data.branch
      ) {
        text = `${text} - ${person.roles[0].data.branch.department.name}`;
      }
      return { key: index, text: text, value: person };
    });
    this.setState({
      options,
    });
  };

  ajaxCall = (e) => {
    this.props.searchPerson(
      yellowPagesUrl(e.target.value),
      this.successCallBack
    );
  };

  onSearchChange = (e) => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
    this.delayedCallback(e);
  };

  onChange = (e, data) => {
    console.log(data.value);
    this.setState({ selected: data.value });
  };

  render() {
    const { name, options, selected } = this.state;
    const { match, constants } = this.props;
    return (
      <React.Fragment>
        <div styleName="centered">
          <div>
            <Header as="h4"> {constants.designations[match.params.id]} </Header>
          </div>
          <div>
            <Image
              src={
                selected.displayPicture ||
                "https://react.semantic-ui.com/images/wireframe/square-image.png"
              }
              size="tiny"
              circular
            />
          </div>

          <Form>
            <Form.Field>
              <label>Name</label>
              <Dropdown
                name="name"
                value={name}
                onSearchChange={this.onSearchChange}
                onChange={this.onChange}
                value={selected}
                search
                selection
                closeOnChange
                options={options}
              />
            </Form.Field>
            <Button size="medium" onClick={this.handleSubmit} width={3}>
              Submit
            </Button>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchPersonResults: state.searchPersonResults,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchPerson: (url, successCallBack) => {
      dispatch(searchPerson(url, successCallBack));
    },
    addAuthority: (url, data, successCallBack, errCallBack) => {
      dispatch(addAuthority(url, data, successCallBack, errCallBack));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminAuthorities);
