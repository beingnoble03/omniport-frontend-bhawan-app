import config from '../config.json'

// Frontend URLs

export const baseNavUrl = forwardLink => {
  return `${config.baseUrl}${forwardLink}`
}

// Backend URLs

export const baseApiUrl = () => {
  return `/api/bhawan_app/`
}

export const complainsUrl = (residence) => {
    return `${baseApiUrl()}${residence}/complaint/`
  }

export const statusComplainsUrl = (residence, statuses) => {
    let allStatus = "?"
    statuses.map( status => {
      status = status.toUpperCase()
      allStatus = `${allStatus}status=${status}&`
    })
    return `${baseApiUrl()}${residence}/complaint/${allStatus}&`
}

export const increaseUnsuccesfulComplainsUrl = (residence, id) => {
  return `${baseApiUrl()}${residence}/complaint/${id}/unsuccessful/`
}

export const bookingsUrl = (residence) => {
  return `${baseApiUrl()}${residence}/room_booking/`
}

export const statusBookingsUrl = (residence, status) => {
  status = status.toUpperCase()
  return `${baseApiUrl()}${residence}/room_booking/?status=${status}`
}