import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedUserDetails, userDetailsFetch } from "./userDetailsSlice";
import { friendsFetch } from "../friends/userFriendsSlice";

// ✕ displays user display name (4 ms)
// ✕ displays user phone number (3 ms)
// ✕ displays user email (4 ms)

export default function UserDetails(){
    const {displayName, email, telephoneNumber} = useSelector(selectedUserDetails)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(userDetailsFetch())
        
    },[dispatch])
    return <div data-testid="userDetails">
        <h3>User Details</h3>
        <form>
            <h4>Display Name</h4>
            <p aria-label="displayName">{displayName}</p>
            <h4>Email</h4>
            <p aria-label="email">{email}</p>
            <h4>Telephone Number</h4>
            <p aria-label="telephoneNumber">{telephoneNumber}</p>
        </form>
    </div>
}