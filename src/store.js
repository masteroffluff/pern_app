import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userDetailsSlice from './components/user/details/userDetailsSlice.js'
import userAuthSlice from './components/user/auth/userAuthSlice.js'
import userFreindsSlice from './components/user/friends/userFreindsSlice.js'
import userPfpSlice from './components/user/details/userPfpSlice.js'

import calendar from './components/calandar/calendarSlice.js'
import items from './components/items/itemSlice.js'
import wall from './components/mainPage/wallSlice.js'
import today from './components/mainPage/todaySlice.js'

const user = combineReducers({
    friends: userFreindsSlice,
    details: userDetailsSlice,
    authentication: userAuthSlice,
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