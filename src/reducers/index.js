import { combineReducers } from 'redux'
import authorities from './authorities'
import facilities from './facilities'

const rootReducers = combineReducers({
  authorities: authorities,
  facilities: facilities,
})

export default rootReducers
