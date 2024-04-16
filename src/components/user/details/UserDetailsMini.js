import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedUserDetails, userDetailsFetch } from "./userDetailsSlice";
import { LogoutButton } from '../../user'


export default function UserDetailsMini() {
  const { display_name} = useSelector(selectedUserDetails)

  const dispatch = useDispatch()
  
  useEffect(() => {
    if(!display_name){
    dispatch(userDetailsFetch())
  }
  }, [dispatch, display_name])


  return (
  <div>
    <div><img src='./images/fluffbook_blankpfp.png' alt='profile'/></div>
    <div>
      <h4>{display_name}</h4>
      <LogoutButton />
    </div>
  </div>)
}