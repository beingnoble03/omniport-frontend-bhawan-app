import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TimeInput, DatesRangeInput } from 'semantic-ui-calendar-react'
import {
  Grid,
  Header,
  Table,
  Button,
  Form,
  Modal,
  Container,
  Input,
  Icon,
  Dropdown,
  Pagination,
  Popup,
  Segment,
  TextArea,
} from 'semantic-ui-react'
import moment from 'moment'

import { Loading } from "formula_one"

import {
  getPendingComplaints,
  getResolvedComplaints,
  increaseUnsuccefulAttempts,
} from '../../actions/complaints'
import { getDefaultItems } from '../../actions/default-items'
import { getTimeSlots, changeTimeSlot } from '../../actions/time-slots'
import { resolveComplaint } from '../../actions/resolveComplaint'
import { addItem } from '../../actions/add_item'
import {
  statusComplaintsUrl,
  defaultItemsUrl,
  increaseUnsuccesfulComplaintsUrl,
  timeSlotsUrl,
  complaintsDownloadUrl,
} from '../../urls'
import { days, types, entries } from '../constants'

import { toast } from 'react-semantic-toasts'
import './index.css'


class AdminComplaints extends Component {
  state = {
    open: false,
    pastComplaintIcon: 'angle up',
    from: '',
    to: '',
    success: false,
    err: false,
    message: '',
    loading: true,
    pendingLoading: true,
    pastLoading: true,
    type: '',
    remark: '',
    activeId: null,
    activeStatus:"",
    activeItem: 'apr',
    activePage: 1,
    activeAprPage: 1,
    datesRange: '',
    dateFilterActive: false,
    pastDatesRange: '',
    pastDateFilterActive: false,
    found: false,
    foundType: false,
    foundId: 1,
    entryNo: '5',
    entryAprNo: '5',
    complaintsDownloadUrl: '',
    options: [],
    complaint_item : [{default_item:null, quantity:1}],
    residentSearch: "",
    residentSearchApr: "",

  }

  componentDidMount() {
    this.props.setNavigation('Student Complaints')
    this.props.getPendingComplaints(
      statusComplaintsUrl(this.props.activeHostel, ['pending','inprocess']),
      this.pendingSuccessCallBack,
      this.pendingErrCallBack
    )
    this.props.getResolvedComplaints(
      statusComplaintsUrl(this.props.activeHostel, [
        'resolved',
        'unresolved',
      ]),
      this.pastSuccessCallBack,
      this.pastErrCallBack
    )
    this.props.getDefaultItems(
      defaultItemsUrl(this.props.activeHostel),
    )
    this.props.getTimeSlots(this.props.activeHostel)
    this.setState({
      complaintsDownloadUrl: complaintsDownloadUrl(this.props.activeHostel)
    })

  }

  

  componentDidUpdate(prevProps) {
    if( (prevProps.defaultItems!== this.props.defaultItems) && this.props.defaultItems.results.length>0){
      let options = []
      const results = this.props.defaultItems.results
      for (var i in results) {
        options.push({
          key: results[i].id.toString(),
          text: results[i].name.toString(),
          value: results[i].id.toString(),
        });
      }
      this.setState({ options : options})
    }

  }

  show = (id,data,remark) => {
    this.setState({
      open: true,
      activeId: id,
      activeStatus: data.value,
      remark:remark,
    })
  }

  close = () => this.setState({ 
    open: false,
    remark: "", 
    activeId: null, 
    activeStatus: "" 
  })

  togglePastIcon = () => {
    const pastComplaintIcon = this.state.pastComplaintIcon
    pastComplaintIcon === 'angle down'
      ? this.setState({ pastComplaintIcon: 'angle up' })
      : this.setState({ pastComplaintIcon: 'angle down' })
  }

  handleChange = (event, { name, value }) => {
    if(this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value })
    }
    if (name == 'type') {
      this.setState({
        from: '',
        to: '',
      })
      this.searchTime(value)
    }
  }

  searchTime(type) {
    let index
    let entry
    for (index = 0 ;index < this.props.timeSlots.length; ++index) {
      entry = this.props.timeSlots[index]
      if (entry && entry.complaintType && entry.complaintType === type) {
            this.setState({
              from: moment(entry.timing[0].start, 'HH:mm:SS').format('HH:mm'),
              to: moment(entry.timing[0].end, 'HH:mm:SS').format('HH:mm'),
              found: true,
              foundId: entry.id,
              foundType: true,
            })
            return
      }
    }
    this.setState({
      found: false,
      foundType: false,
    })
  }

  addItemField = () => {
    this.setState((prevState) => ({
      complaint_item: [...prevState.complaint_item, {default_item: null, quantity: null}],
    }))
  }

  resolveComplaint = () => {
    const body = {
      status: this.state.activeStatus,
      remark: this.state.remark,
    }
    {this.state.complaint_item.map((element, index) => {
      if(element.default_item!=null){
      const data = {
        complaint: this.state.activeId,
        default_item: element.default_item,
        quantity: element.quantity,
      }
      this.props.addItem(
        data,
        this.props.activeHostel,
        this.resolveSuccessCallBack,
        this.errCallBack
      )
    }})}
    this.props.resolveComplaint(
      this.state.activeId,
      body,
      this.props.activeHostel,
      this.resolveSuccessCallBack,
      this.errCallBack
    )
    this.close()
  }

  resolveSuccessCallBack = (res) => {
    this.setState({
      success: true,
      error: false,
      message: '',
    })
    this.props.getPendingComplaints(
      statusComplaintsUrl(this.props.activeHostel, ['pending','inprocess']),
      this.pendingSuccessCallBack,
      this.pendingErrCallBack
    )
    this.props.getResolvedComplaints(
      statusComplaintsUrl(this.props.activeHostel, [
        'resolved',
        'unresolved',
      ]),
      this.pastSuccessCallBack,
      this.pastErrCallBack
    )
    
    let complaint_item = [{default_item:null, quantity:null}]
    this.setState({ complaint_item })
    
  }

  errCallBack = () =>{

  }

  pendingSuccessCallBack = (res) => {
    this.setState({
      pendingLoading: false
    })
  }

  pendingErrCallBack = (err) => {
    this.setState({
      pendingLoading: false
    })
  }

  pastSuccessCallBack = (res) => {
    this.setState({
      pastLoading: false
    })
  }

  pastErrCallBack = (err) => {
    this.setState({
      pastLoading: false
    })
  }
  changeTiming = () => {
    let dayTiming = []

    if (this.state.foundType) {
      for (var index = 0; index < this.props.timeSlots.length; index++) {
        if (this.props.timeSlots[index].complaintType === this.state.type) {
          dayTiming = this.props.timeSlots[index].timing
          dayTiming[index].start = this.state.from
          dayTiming[index].end = this.state.to
          break
        }
      }
    } else {
      dayTiming = [{
        day: 'dai',
        start: this.state.from,
        end: this.state.to,
      }]
    }
    const data = {
      complaintType: this.state.type,
      timing: dayTiming,
    }
    this.props.changeTimeSlot(
      data,
      this.state.found,
      this.state.foundId,
      timeSlotsUrl(this.props.activeHostel),
      this.timeSlotSuccessCallBack,
      this.errorCallBack
    )
  }

  timeSlotSuccessCallBack = (res) => {
    this.setState({
      success: true,
      error: false,
      message: '',
    })
    toast({
      type: 'success',
      title: 'Time Slot changed',
      description: 'Time Slot Changed',
      animation: 'fade up',
      icon: 'smile outline',
      time: 4000,
    })
    this.props.getTimeSlots()
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  handleResidentSearch = (e, { value }) => {
    this.setState({ residentSearch: value })
    this.setState({
      pendingLoading: true
    })
    this.props.getPendingComplaints(
      `${statusComplaintsUrl(this.props.activeHostel, [
        'PENDING','INPROCESS'
      ])}search=${value}`,
      this.pendingSuccessCallBack,
      this.pendingErrCallBack
    )
  }

  handlePastResidentSearch = (e, { value }) => {
    this.setState({ residentSearchApr: value })
    this.setState({
      pastLoading: true
    })
    this.props.getResolvedComplaints(
      `${statusComplaintsUrl(this.props.activeHostel, [
        'RESOLVED',
        'UNRESOLVED',
      ])}search=${value}`,
      this.pastSuccessCallBack,
      this.pastErrCallBack
    )
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage })
    this.setState({
      pendingLoading: true
    })
    this.props.getPendingComplaints(
      `${statusComplaintsUrl(this.props.activeHostel, [
        'PENDING','INPROCESS'
      ])}page=${activePage}`,
      this.pendingSuccessCallBack,
      this.pendingErrCallBack
    )
  }

  handlePastPaginationChange = (e, { activePage }) => {
    this.setState({ activeAprPage: activePage })
    this.setState({
      pastLoading: true
    })
    this.props.getResolvedComplaints(
      `${statusComplaintsUrl(this.props.activeHostel, [
        'RESOLVED',
        'UNRESOLVED',
      ])}&page=${activePage}`,
      this.pastSuccessCallBack,
      this.pastErrCallBack
    )
  }

  handleEntriesChange = (e, { value }) => {
    this.setState({ entryNo: value })
    this.setState({
      pendingLoading: true
    })
    this.props.getPendingComplaints(
      `${statusComplaintsUrl(this.props.activeHostel, [
        'PENDING','INPROCESS'
      ])}page=${this.state.activePage}&perPage=${value}`,
      this.pendingSuccessCallBack,
      this.pendingErrCallBack
    )
  }

  handlePastEntriesChange = (e, { value }) => {
    this.setState({ entryAprNo: value })
    this.setState({
      pastLoading: true
    })
    this.props.getResolvedComplaints(
      `${statusComplaintsUrl(this.props.activeHostel, [
        'RESOLVED',
        'UNRESOLVED',
      ])}&page=${this.state.activeAprPage}&perPage=${value}`,
      this.pastSuccessCallBack,
      this.pastErrCallBack
    )   
  }

  dateFormatMatch = (dates) => {
    if (
      /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01]) - \d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(
        dates
      )
    ) {
      dates = dates.split(' ')
      let start = dates[0]
      let end = dates[2]

      var dateRange = start + '/' + end
      return dateRange
    } else {
      return null
    }
  }

  handleDateFilterChange = (e, { value }) => {
    this.setState({ datesRange: value })

    if (value) this.setState({ dateFilterActive: true })

    let dateRange
    dateRange = this.dateFormatMatch(value)

    if (dateRange) {
      this.setState({
        pendingLoading: true,
      })
      this.props.getPendingComplaints(
        `${statusComplaintsUrl(this.props.activeHostel, [
          'PENDING',
          'INPROCESS',
        ])}date=${dateRange}`,
        this.pendingSuccessCallBack,
        this.pendingErrCallBack
      )
    }
  }

  handlePastDateFilterChange = (e, { value }) => {
    this.setState({ pastDatesRange: value })

    if (value) this.setState({ pastDateFilterActive: true })

    let dateRange
    dateRange = this.dateFormatMatch(value)

    if (dateRange) {
      this.setState({
        pastLoading: true,
      })
      this.props.getResolvedComplaints(
        `${statusComplaintsUrl(this.props.activeHostel, [
          'RESOLVED',
          'UNRESOLVED',
        ])}date=${dateRange}`,
        this.pastSuccessCallBack,
        this.pastErrCallBack
      )
    }
  }

  handleDateDelete = () => {
    this.setState({ dateFilterActive: false, datesRange: '' })
    this.setState({
      pendingLoading: true,
    })
    this.props.getPendingComplaints(
      `${statusComplaintsUrl(this.props.activeHostel, [
        'PENDING',
        'INPROCESS',
      ])}`,
      this.pendingSuccessCallBack,
      this.pendingErrCallBack
    )
  }

  handlePastDateDelete = () => {
    this.setState({ pastDateFilterActive: false, pastDatesRange: '' })
    this.setState({
      pastLoading: true,
    })
    this.props.getResolvedComplaints(
      `${statusComplaintsUrl(this.props.activeHostel, [
        'RESOLVED',
        'UNRESOLVED',
      ])}`,
      this.pastSuccessCallBack,
      this.pastErrCallBack
    )
  }

  handleDefaultItemChange = (i, event, {value}) => {
    let complaint_item = [...this.state.complaint_item]
    complaint_item[i].default_item = parseInt(value)
    this.setState({ complaint_item })
  }
  handleQuantityChange(i, event) {
    let complaint_item = [...this.state.complaint_item]
    complaint_item[i].quantity = parseInt(event.target.value)
    this.setState({ complaint_item })
  }

  increaseUnsuccesfulComplaints = (id) => {
    this.props.increaseUnsuccefulAttempts(
      increaseUnsuccesfulComplaintsUrl(this.props.activeHostel, id),
      this.resolveSuccessCallBack,
      this.errCallBack
    )
  }

  render() {
    const {
      open,
      options,
      pastComplaintIcon,
      activePage,
      activeAprPage,
      pendingLoading,
      pastLoading,
      entryNo,
      entryAprNo,
      remark,
      complaintsDownloadUrl,
      residentSearch,
      residentSearchApr,
      activeStatus,
      datesRange,
      dateFilterActive,
      pastDatesRange,
      pastDateFilterActive,
    } = this.state
    const { pendingComplaints, resolvedComplaints, defaultItems, constants } = this.props
    let complaint_status_options = [];
    for (var i in constants.statuses['COMPLAINT_STATUSES']) {
      complaint_status_options.push({
        key: i.toString(),
        text: constants.statuses['COMPLAINT_STATUSES'][i].toString(),
        value: i.toString(),
      });
    }
    return (
      <Grid container>
          <Grid.Column width={16}>
            <Container>
              <div styleName="complaint-header">
                <Header as='h4'>Student Complaints and Feedback</Header>
                <div styleName="complaint-header">
                  {dateFilterActive ? (
                    <DatesRangeInput
                      name='datesRange'
                      placeholder='Date: From - To'
                      closable={true}
                      closeOnMouseLeave={true}
                      value={datesRange}
                      dateFormat='YYYY-MM-DD'
                      onChange={this.handleDateFilterChange}
                      icon={
                        <Icon
                          name='delete'
                          link
                          onClick={this.handleDateDelete}
                        />
                      }
                    />
                  ) : (
                    <DatesRangeInput
                      name='datesRange'
                      placeholder='Date: From - To'
                      closable={true}
                      closeOnMouseLeave={true}
                      value={datesRange}
                      dateFormat='YYYY-MM-DD'
                      onChange={this.handleDateFilterChange}
                    />
                  )}
                  <Input
                    name="residentSearch"
                    value={residentSearch}
                    onChange={this.handleResidentSearch}
                    icon="search"
                    placeholder="Search by Name/Enrollment no."
                  />
                  <a href={complaintsDownloadUrl} download>
                    <Button
                    primary
                    >
                      Download list
                    </Button>
                  </a>
                </div>
              </div>
              {!pendingLoading?
                (
                  <React.Fragment>
                  {(pendingComplaints.results &&
                    pendingComplaints.results.length >0)?
                    (
                      <React.Fragment>
                      <div styleName="table-height table-overflow">
                      <Table celled unstackable>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Complaint Description</Table.HeaderCell>
                            <Table.HeaderCell>Applicant Name</Table.HeaderCell>
                            <Table.HeaderCell>Complaint Date and Time</Table.HeaderCell>
                            <Table.HeaderCell>Complaint Type</Table.HeaderCell>
                            <Table.HeaderCell>Contact Number</Table.HeaderCell>
                            <Table.HeaderCell>Applicant Room</Table.HeaderCell>
                            <Table.HeaderCell>
                              Unsuccesful attempts to solve
                            </Table.HeaderCell>
                            <Table.HeaderCell>Complaint status</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {pendingComplaints.results &&
                            pendingComplaints.results.length > 0
                            ? pendingComplaints.results.map((complaint, index) => {
                                return (
                                  <Table.Row key={index}>
                                    <Table.Cell>
                                      {entryNo * (activePage - 1) + index + 1}
                                    </Table.Cell>
                                    <Table.Cell>{complaint.description}</Table.Cell>
                                    <Table.Cell>{complaint.complainant}</Table.Cell>
                                    <Table.Cell>
                                      {moment(
                                        complaint.datetimeCreated
                                      ).format('DD/MM/YY, hh:mm a')}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {
                                        constants.complaint_types[
                                          complaint.complaintType
                                        ]
                                      }
                                    </Table.Cell>
                                    <Table.Cell>{complaint.phoneNumber}</Table.Cell>
                                    <Table.Cell>{complaint.roomNo}</Table.Cell>
                                    <Table.Cell
                                      onClick={() =>
                                        this.increaseUnsuccesfulComplaints(complaint.id)
                                      }
                                    >
                                      {complaint.failedAttempts}
                                      <span styleName='cursor' styleName="plus-icon">
                                        <Icon name="add circle" color="grey" size="large" />
                                      </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                      <Dropdown 
                                        value={complaint.status} 
                                        onChange={(e,data) => this.show(complaint.id,data,complaint.remark)} 
                                        search 
                                        selection 
                                        options={complaint_status_options} 
                                      />
                                      {constants.statuses.COMPLAINT_STATUSES[complaint.status]!='RESOLVED' && complaint.remark && 
                                        <>
                                          <br/> ( {complaint.remark} )
                                        </>
                                      }
                                    </Table.Cell>
                                  </Table.Row>
                                )
                              })
                            : null}
                        </Table.Body>
                      </Table>
                      </div>
                      <div styleName='pagination-container'>
                        
                        <div>
                          {pendingComplaints.count > entryNo ? (
                            <Pagination
                              activePage={activePage}
                              onPageChange={this.handlePaginationChange}
                              totalPages={Math.ceil(pendingComplaints.count / entryNo)}
                            />
                          ) : null}
                        </div>
                        <div>
                          Entries per page : 
                          <Dropdown
                            name='entries'
                            selection
                            options={entries}
                            onChange={this.handleEntriesChange}
                            value={entryNo}
                            compact
                          />
                        </div>
                      </div>
                      </React.Fragment>
                    ):
                    (
                      <Segment>No pending complaints found</Segment>
                    )
                  }
                  </React.Fragment>
                ):
                (
                  < Loading />
                )
              }

              <Header as='h4'>
                Select slot for
                <Dropdown
                  name='type'
                  placeholder='type'
                  selection
                  options={types}
                  onChange={this.handleChange}
                  compact
                />
                from
                  <span styleName="info-icon">
                  <Popup
                    content='Set the time to send emails automatically for this type of complaint'
                    trigger={
                      <Icon
                        name='info'
                        size="small"
                        color="blue"
                        circular
                        aria-label='Set the time to send emails automatically for this type of complaint'
                      />
                    }
                  />
                  </span>
                  <TimeInput
                    name='from'
                    placeholder='From'
                    value={this.state.from}
                    iconPosition='left'
                    onChange={this.handleChange}
                  />
                  <TimeInput
                    name='to'
                    placeholder='To'
                    value={this.state.to}
                    iconPosition='left'
                    onChange={this.handleChange}
                  />
                <Button primary onClick={this.changeTiming}>Change</Button>
              </Header>
              <div styleName="complaint-header">
                <Header as='h4'>
                  Past Complaints and Feedback
                  <Icon name={pastComplaintIcon} onClick={this.togglePastIcon} />
                </Header>
                <div styleName='complaint-header'>
                {pastDateFilterActive ? (
                  <DatesRangeInput
                    name='pastDatesRange'
                    placeholder='Date: From - To'
                    closable={true}
                    closeOnMouseLeave={true}
                    value={pastDatesRange}
                    dateFormat='YYYY-MM-DD'
                    onChange={this.handlePastDateFilterChange}
                    icon={
                      <Icon
                        name='delete'
                        link
                        onClick={this.handlePastDateDelete}
                      />
                    }
                  />
                ) : (
                  <DatesRangeInput
                    name='pastDatesRange'
                    placeholder='Date: From - To'
                    closable={true}
                    closeOnMouseLeave={true}
                    value={pastDatesRange}
                    dateFormat='YYYY-MM-DD'
                    onChange={this.handlePastDateFilterChange}
                  />
                )}
                <Input
                  name='residentSearchApr'
                  value={residentSearchApr}
                  onChange={this.handlePastResidentSearch}
                  icon='search'
                  placeholder='Filter by Name/Enrollment no.'
                />
              </div>
              </div>
              {pastComplaintIcon === 'angle down' && (
                <React.Fragment>
                  {!pastLoading?
                    (
                      <React.Fragment>
                        {(resolvedComplaints.results && resolvedComplaints.results.length > 0) ?
                      (
                      <React.Fragment>
                        <div styleName="table-height">
                          <Table celled unstackable>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Complaint Description</Table.HeaderCell>
                                <Table.HeaderCell>Applicant Name</Table.HeaderCell>
                                <Table.HeaderCell>Complaint Date and Time</Table.HeaderCell>
                                <Table.HeaderCell>Complaint Type</Table.HeaderCell>
                                <Table.HeaderCell>Contact Number</Table.HeaderCell>
                                <Table.HeaderCell>Applicant Room</Table.HeaderCell>
                                <Table.HeaderCell>
                                  Unsuccesful attempts to solve
                                </Table.HeaderCell>
                                <Table.HeaderCell>Complaint Status</Table.HeaderCell>
                                <Table.HeaderCell>Items</Table.HeaderCell>
                                <Table.HeaderCell>Remark</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {resolvedComplaints.results &&
                              resolvedComplaints.results.length > 0
                                ? resolvedComplaints.results.map((complaint, index) => {
                                    return (
                                      <Table.Row key={index}>
                                        <Table.Cell>
                                          {entryAprNo * (activeAprPage - 1) + index + 1}
                                        </Table.Cell>
                                        <Table.Cell>{complaint.description}</Table.Cell>
                                        <Table.Cell>{complaint.complainant}</Table.Cell>
                                        <Table.Cell>
                                          {moment(
                                            complaint.datetimeCreated
                                          ).format('DD/MM/YY, hh:mm a')}
                                        </Table.Cell>
                                        <Table.Cell>
                                          {
                                            constants.complaint_types[
                                              complaint.complaintType
                                            ]
                                          }
                                        </Table.Cell>
                                        <Table.Cell>{complaint.phoneNumber}</Table.Cell>
                                        <Table.Cell>{complaint.roomNo}</Table.Cell> 
                                        <Table.Cell>
                                          {complaint.failedAttempts}
                                        </Table.Cell>
                                        <Table.Cell>
                                          {
                                            constants.statuses.COMPLAINT_STATUSES[
                                              complaint.status
                                            ]
                                          }
                                          {constants.statuses.COMPLAINT_STATUSES[complaint.status]!='RESOLVED' && complaint.remark && 
                                            <>
                                              <br/> ( {complaint.remark} )
                                            </>
                                          }
                                        </Table.Cell>
                                        <Table.Cell>
                                          {complaint.items.length > 0 
                                            ? complaint.items.map((item,index) => {
                                            return(
                                              <Table.Row>
                                                <Table.Cell>
                                                  {item.quantity}
                                                </Table.Cell>
                                                <Table.Cell>
                                                  {item.name}
                                                </Table.Cell>
                                              </Table.Row>
                                            )
                                          })
                                        : (
                                          'None'
                                        )}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {complaint.remark && complaint.remark.trim() != '' 
                                              ? complaint.remark : 'None'}
                                        </Table.Cell>
                                      </Table.Row>
                                    )
                                  })
                                : null}
                            </Table.Body>
                          </Table>
                        </div>
                        <div styleName='pagination-container'>
                        <div>
                          {resolvedComplaints.count > entryAprNo ? (
                            <Pagination
                              activePage={activeAprPage}
                              onPageChange={this.handlePastPaginationChange}
                              totalPages={Math.ceil(resolvedComplaints.count / entryAprNo)}
                            />
                          ) : null}
                        </div>
                        <div>
                          Entries per page : 
                          <Dropdown
                            name='entries'
                            selection
                            options={entries}
                            onChange={this.handlePastEntriesChange}
                            value={entryAprNo}
                            compact
                          />
                        </div>
                      </div>
                      </React.Fragment>
                    ):
                    <Segment>No resolved complaints found</Segment>
                  }
                      </React.Fragment>
                    ):
                    (
                      <Loading />
                    )
                  }
                </React.Fragment>
              )}
            </Container>
            <Modal size='mini' open={open} onClose={this.close}>
              <Modal.Header styleName='center'>Change complaint status?</Modal.Header>
              <Modal.Content>
              <Form>
              <Form.Group styleName='item-container'>
                  <Form.Field>
                  <label>Item</label>
                  </Form.Field>
                  <Form.Field styleName='field-width'>
                  <label>Quantity</label>
                  </Form.Field>
                </Form.Group>
              {this.state.complaint_item.map((element, index) => (
                  <Form.Group styleName='item-container' key={index}>
                  <Form.Field >
                    <Dropdown
                      name='default_item'
                      placeholder='Replace or repair items'
                      selection
                      disabled={activeStatus!='res'}
                      options={options}
                      onChange={(event, value) => this.handleDefaultItemChange(index, event, value)}
                    />
                  </Form.Field>
                  <Form.Field styleName='field-width'>
                  <Input
                      name='quantity'
                      id = {index}
                      type='number'
                      disabled={activeStatus!='res'}
                      onChange={(event) => this.handleQuantityChange(index, event)}
                      min={1}
                    />
                  </Form.Field>
                </Form.Group>
              ))}
              <div styleName='right-align'>
              <Header as='h5' disabled={activeStatus!='res'} onClick={activeStatus=='res'?this.addItemField:''} styleName='cursor'>
                  <span>+</span>
                  Add Item
              </Header>
              </div>
              <Form.Field
                name='remark'
                value={remark}
                onChange={this.handleChange}
                control={TextArea}
                label='Remark'
                placeholder='Type any remark ....'
                rows='3'
              />
              </Form>
              </Modal.Content>
              <Modal.Actions styleName='modalActions'>
                <Button positive fluid onClick={this.resolveComplaint}>
                  Yes
                </Button>
                <Button negative fluid onClick={this.close}>
                  No
                </Button>
              </Modal.Actions>
            </Modal>
          </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    pendingComplaints: state.pendingComplaints,
    resolvedComplaints: state.resolvedComplaints,
    defaultItems: state.defaultItems,
    timeSlots: state.timeSlots,
    activeHostel: state.activeHostel
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPendingComplaints: (url, successCallBack, errCallBack) => {
      dispatch(getPendingComplaints(url, successCallBack, errCallBack))
    },
    getResolvedComplaints: (url, successCallBack, errCallBack) => {
      dispatch(getResolvedComplaints(url, successCallBack, errCallBack))
    },
    getDefaultItems: (url) => {
      dispatch(getDefaultItems(url))
    },
    getTimeSlots: (residence) => {
      dispatch(getTimeSlots(residence))
    },
    changeTimeSlot: (
      data,
      found,
      foundId,
      residence,
      successCallBack,
      errorCallBack
    ) => {
      dispatch(
        changeTimeSlot(
          data,
          found,
          foundId,
          residence,
          successCallBack,
          errorCallBack
        )
      )
    },
    increaseUnsuccefulAttempts: (url, successCallBack, errCallBack) => {
      dispatch(increaseUnsuccefulAttempts(url, successCallBack, errCallBack))
    },
    resolveComplaint: (id, data, residence, successCallBack, errCallBack) => {
      dispatch(
        resolveComplaint(id, data, residence, successCallBack, errCallBack)
      )
    },
    addItem: (data, residence, successCallBack, errCallBack) => {
      dispatch(
        addItem(data, residence, successCallBack, errCallBack)
      )
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminComplaints)
