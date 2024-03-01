import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userDetails from './components/user/details/userDetailsSlice.js'
import userAuth from './components/user/auth/userAuthSlice.js'
import friends from './components/user/friends/userFreindsSlice.js'
import userPfpSlice from './components/user/details/userPfpSlice.js'

import calendar from './components/calandar/calendarSlice.js'
import items from './components/items/itemSlice.js'
import wall from './components/mainPage/wallSlice.js'
import today from './components/mainPage/todaySlice.js'

const user = combineReducers({
  friends: friends,
  details: userDetails,
  authentication: userAuth,
  pfp: userPfpSlice
});

export default configureStore({
  reducer: {
    calendar,
    items,
    user,
    today,
    wall,
  }
});

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  calendar,
  items,
  user,
  today,
  wall,
})

export const setupStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

