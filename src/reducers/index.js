import { combineReducers } from 'redux'
import AuthReducers from './auth'


const MargApp = combineReducers({
  AuthReducers,
})

export default MargApp