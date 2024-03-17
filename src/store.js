import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userDetails from './components/user/details/userDetailsSlice.js'
import userAuth from './components/user/auth/userAuthSlice.js'
import friends from './components/user/friends/userFriendsSlice.js'
import userPfp from './components/user/details/userPfpSlice.js'
import popup from './components/mainPage/popupSlice.js';

import calendar from './components/calandar/calendarSlice.js'
import items from './components/items/itemSlice.js'
import wall from './components/mainPage/wallSlice.js'
import today from './components/mainPage/todaySlice.js'

const user = combineReducers({
  friends: friends,
  details: userDetails,
  authentication: userAuth,
  pfp: userPfp
});
const reducer = {
    calendar,
    items,
    user,
    today,
    wall,
    popup,
  }
const store = configureStore({
  reducer
});
export default store

// Create the root reducer separately so we can extract the RootState type for testing
export const rootReducer = combineReducers(reducer)
// setup store for testing too
export const setupStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

