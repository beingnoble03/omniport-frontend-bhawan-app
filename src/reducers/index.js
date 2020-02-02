import { combineReducers } from 'redux'
import authorities from './authorities'
import facilities from './facilities'
import complains from './complains'

const rootReducers = combineReducers({
  authorities: authorities,
  facilities: facilities,
  complains: complains,
})

export default rootReducers
