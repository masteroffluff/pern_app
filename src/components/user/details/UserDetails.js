import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedUserDetails, userDetailsFetch } from "./userDetailsSlice";
import { friendsFetch } from "../friends/userFriendsSlice";
import '../../../App.css'
import { selectColourChoice, selectColourObject, setColour } from "../../mainPage/colourSlice";
// ✕ displays user display name (4 ms)
// ✕ displays user phone number (3 ms)
// ✕ displays user email (4 ms)

export default function UserDetails(){
    const {displayName, email, telephoneNumber} = useSelector(selectedUserDetails)
    const colourObject = useSelector(selectColourObject)
    //const colourSelectState= useSelector(selectColourChoice)
    const {main_text_color, popup_text_color, main_background_color, main_background_color_alt, popup_background_color, main_background_image_URL} = colourObject

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(userDetailsFetch())
        
    },[dispatch])
    return <div data-testid="userDetails" >
        <style>{`
        :root {
          --main-text-color: ${main_text_color};
          --main_background_color: ${main_background_color};
          --main-background-color:${main_background_color};
          --main-background-color-alt:${main_background_color_alt};
          --popup-text-color:${popup_text_color};
          --popup-background-color:${popup_background_color};
        }
        body {
          color: var(--main-text-color);
          background-image:url(${main_background_image_URL});
        }
      `}</style>
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