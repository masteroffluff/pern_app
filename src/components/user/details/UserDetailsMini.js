import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedUserDetails, userDetailsFetch } from "./userDetailsSlice";
import { LogoutButton, AnyPFP } from '../../user'


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
    <AnyPFP id='0' height='200' width='200' />
    <div>
      <h4 data-testid="display_name">{display_name}</h4>
      <LogoutButton />
    </div>
  </div>)
}