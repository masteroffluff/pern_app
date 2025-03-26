import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userDetails from './components/user/details/userDetailsSlice.js'
import userAuth from './components/user/auth/userAuthSlice.js'
import friends from './components/user/friends/userFriendsSlice.js'


import calendar from './components/calandar/calendarSlice.js'
import items from './components/items/itemSlice.js'
import wall from './components/mainPage/wallSlice.js'
import today from './components/mainPage/todaySlice.js'
// state to manage the modal popups
import popup from './components/mainPage/popupSlice.js'

const user = combineReducers({
  friends: friends,
  details: userDetails,
  authentication: userAuth
});

 const store = configureStore({
  reducer: {
    calendar,
    items,
    user,
    today,
    wall,
    popup,
  }
});
export default store
// Create the root reducer separately so we can extract the RootState type
export const rootReducer = combineReducers({
  calendar,
  items,
  user,
  today,
  wall,
  popup,

})

export const setupStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

