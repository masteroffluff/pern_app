import React from "react";
import MainDisplay from './components/mainPage/MainDisplay';
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div className="App">
      <MainDisplay />
      <Outlet />
    </div>
  );
}

export default AppLayout;
