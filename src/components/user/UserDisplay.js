import React from "react";
import UserDetails from "./details/UserDetails";
import UserFriends from "./friends/UserFriends";
import { Outlet } from "react-router";

export default function UserDisplay(){
    return (<>
    <div data-testid="userDisplay" className="grid-container">
        <UserDetails />
        <UserFriends />
    </div>
    <Outlet />
    </>)
}