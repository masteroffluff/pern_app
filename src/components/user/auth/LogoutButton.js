import React from "react";
import { useDispatch } from "react-redux";
import { userLogOut } from "./userAuthSlice";
import { reset as friendsReset} from "../friends/userFriendsSlice";
import { reset as pfpReset} from "../pfp/userPfpSlice";
import { reset as detailsReset} from "../details/userDetailsSlice";
import { reset as calendarReset} from "../../calandar/calendarSlice";
import { reset as itemsReset} from "../../items/itemSlice";
import { reset as todayReset} from "../../mainPage/todaySlice";
import { reset as wallReset} from "../../mainPage/wallSlice";

import { useNavigate } from "react-router";

export default function LogoutButton(){
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const clickHandler =(e)=>{

        //e.preventDefault()
        dispatch(userLogOut())
        dispatch(friendsReset())
        dispatch(pfpReset())
        dispatch(detailsReset())
        dispatch(calendarReset())
        dispatch(itemsReset())
        dispatch(todayReset())
        dispatch(wallReset())
        navigate('/')
    }
    
    return <button onClick={clickHandler}>Logout</button>

}



