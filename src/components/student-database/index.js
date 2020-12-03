import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Header, Table, Container, Dropdown, Pagination } from 'semantic-ui-react'

import { residentUrl } from '../../urls'

import { getResidents } from '../../actions/residents'

const yearOptions = [
  { key: 1, text: '1st Year', value: 1 },
  { key: 2, text: '2nd Year', value: 2 },
  { key: 3, text: '3rd Year', value: 3 },
  { key: 4, text: '4rd Year', value: 4 },
  { key: 5, text: '5rd Year', value: 5 }
]

class StudentDatabase extends Component {
  state = {
    activePage: 1,
    filterYear: "",
    filterBranch: ''
  };

  componentDidMount() {
    this.props.getResidents(
      `${residentUrl(this.props.who_am_i.hostel)}?is_student=true`,
      this.successCallBack,
      this.errCallBack
    )
  }

  onChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value })
    }
    let filter="?is_student=true&"

    if(name=='filterYear'){
        if(value!="") filter = `${filter}year=${value}&`
        if(this.state.filterBranch!="") filter = `${filter}branch=${this.state.filterBranch}&`
    }

    else if(name=="filterBranch"){
      if(value!="") filter = `${filter}branch=${value}&`
      if(this.state.filterYear!="") filter = `${filter}year=${this.state.filterYear}&`
    }

    this.props.getResidents(
      `${residentUrl(this.props.who_am_i.hostel)}${filter}`,
      this.successCallBack,
      this.errCallBack
    )

    this.setState({
      activePage: 1
    })
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage })
    this.props.getResidents(
      `${residentUrl(this.props.who_am_i.hostel)}?page=${activePage}`,
      this.successCallBack,
      this.errCallBack
    )
  }
  successCallBack() {}

  errCallBack() {}

  render() {
    const {
      activePage,
      filterBranch,
      filterYear
    } = this.state
    const { residents, constants } = this.props

    let branchOptions = [];
    for (var i in constants.branches) {
      branchOptions.push({
        key: i.toString(),
        text: i.toString(),
        value: constants.branches[i].toString(),
      });
    }

    return (
      <div>
        <Header as='h4'>Student Database </Header>
        <Container>
        <Dropdown
          name="filterYear"
          clearable
          options={yearOptions}
          onChange={this.onChange}
          placeholder="Filter by year"
          value={filterYear}
          selection
        />
        <Dropdown
          name="filterBranch"
          clearable
          placeholder="Filter by branch"
          value={filterBranch}
          onChange={this.onChange}
          options={branchOptions}
          selection
        />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Enrollment No</Table.HeaderCell>
                <Table.HeaderCell>Room No.</Table.HeaderCell>
                <Table.HeaderCell>Contact No.</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {residents.results && residents.results.length > 0
                ? residents.results.map((resident, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.Cell>
                          {5 * (activePage - 1) + index + 1}
                        </Table.Cell>
                        <Table.Cell>{resident.residentName}</Table.Cell>
                        <Table.Cell>ABC</Table.Cell>
                        <Table.Cell>{resident.roomNumber}</Table.Cell>
                      </Table.Row>
                    )
                  })
                : null}
            </Table.Body>
          </Table>
          {residents.count > 5 ? (
            <Pagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={Math.ceil(residents.count / 5)}
            />
          ) : null}
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    residents: state.residents,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getResidents: (url, successCallBack, errCallBack) => {
      dispatch(getResidents(url, successCallBack, errCallBack))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDatabase)

