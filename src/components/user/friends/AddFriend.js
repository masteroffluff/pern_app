import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "../../mainPage/popupSlice";
import { useNavigate } from "react-router";

export default function AddFriend(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    alert("Add Friend")
    useEffect(() => {
        
        dispatch(setPopup(true))
        //dispatch(friendsFetch)
        return () => dispatch(setPopup(false))
    }, [dispatch])



    const cancelAddFriend = (e) => {
        e.preventDefault()
        navigate('/userdetails')
    }

    return (
    <div data-testid="addFriend" className='popup'>

        <p>Add a new friend</p>
        <button onClick={cancelAddFriend}>Cancel</button>
    </div>)
}