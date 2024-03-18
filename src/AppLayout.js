import React from "react";
import MainDisplay from './components/mainPage/MainDisplay';
import { Outlet } from "react-router";
import './blur.css';
import { selectPopupState } from "./components/mainPage/popupSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn, userAuthCheck } from "./components/user/auth/userAuthSlice";
import UserLogin from "./components/user/auth/UserLogin";


function AppLayout() {
  const dispatch = useDispatch()
  dispatch(userAuthCheck())
  const popupState = useSelector(selectPopupState)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  if (isLoggedIn) {
    return (<>
      <div className={popupState ? 'App blur-background' : 'App'}>
        <header><h1>I havent thought of a title yet</h1></header>
        <nav>
          <NavLink to='/userdetails'>User Details</NavLink>
        </nav>
        <MainDisplay />

      </div>
      <Outlet />
    </>
    );
  } else {
    return <UserLogin />
  }

}

export default AppLayout;
