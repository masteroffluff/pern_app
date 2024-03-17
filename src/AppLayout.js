import React from "react";
import MainDisplay from './components/mainPage/MainDisplay';
import { Outlet } from "react-router";
import { selectPopupState } from "./components/mainPage/popupSlice";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "./components/user/auth/userAuthSlice";


function AppLayout() {
  const popupState = useSelector(selectPopupState)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return (
    <div className="App" style={popupState?{'blur':'5px'}:{}}>
      <header><h1>I havent thought of a title yet</h1></header>
      <nav>
        <NavLink to='/userdetails'>User Details</NavLink>
        
      </nav>
      <MainDisplay />
      <Outlet />
    </div>
  );
}

export default AppLayout;
