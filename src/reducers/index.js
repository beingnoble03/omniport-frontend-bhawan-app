import { combineReducers } from 'redux'
import authorities from './authorities'
import facilities from './facilities'
import complains from './complains'
import who_am_i from './who-am-i'

const rootReducers = combineReducers({
  authorities: authorities,
  facilities: facilities,
  complains: complains,
  who_am_i: who_am_i,
})

export default rootReducers
