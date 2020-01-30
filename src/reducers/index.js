import { combineReducers } from 'redux'
import authorities from './authorities'
import facility from './facility'

const rootReducers = combineReducers({
  authorities: authorities,
  facility: facility,
})

export default rootReducers
