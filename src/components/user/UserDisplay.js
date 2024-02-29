import React from "react";
import UserDetails from "./details/UserDetails";
import UserFriends from "./friends/UserFriends";

export default function UserDisplay(){
    return <div data-testid="userDisplay">
        <UserDetails />
        <UserFriends />
    </div>
}