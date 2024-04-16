import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hasErrorUserDetails, selectedUserDetails, userDetailsFetch, userDetailsUpdate } from "./userDetailsSlice";
import { setPopup, selectPopupState } from "../../mainPage/popupSlice";

import '../../../App.css'
import { selectColourChoice, selectColourObject, setColour } from "../../mainPage/colourSlice";
// ✕ displays user display name (4 ms)
// ✕ displays user phone number (3 ms)
// ✕ displays user email (4 ms)

export default function UserDetails() {
  const { display_name, email, telephoneNumber, birthday } = useSelector(selectedUserDetails)
  const colourObject = useSelector(selectColourObject)
  //const colourSelectState= useSelector(selectColourChoice)
  const { main_text_color, popup_text_color, main_background_color, main_background_color_alt, popup_background_color, main_background_image_URL } = colourObject

  const colourSelectState = useSelector(selectColourChoice)
  const errorUserDetails  = useSelector(hasErrorUserDetails) 
  const popupState = useSelector(selectPopupState)


  const [display_nameTemp, setDisplayNameTemp] = useState(display_name)
  const [emailTemp, setEmailTemp] = useState(email)
  const [telephoneNumberTemp, setTelephoneNumberTemp] = useState(telephoneNumber)
  const [birthdayTemp, setBirthdayTemp] = useState(birthday)

  useEffect(()=>{ 
    // the above default states were not working for some reason :/
    setDisplayNameTemp(display_name)
    setEmailTemp(email)
    setTelephoneNumberTemp(telephoneNumber)
    setBirthdayTemp(birthday)
  },[display_name, email, telephoneNumber, birthday])
  
  const colourSelectorChangeHandler = (e) => {
    e.preventDefault()
    dispatch(setColour(e.target.value))
  }
  const display_nameChange = (e) => {
    e.preventDefault()
    setDisplayNameTemp(e.target.value)
  }
  const emailChange = (e) => {
    e.preventDefault()
    setEmailTemp(e.target.value)
  }
  const telephoneNumberChange = (e) => {
    e.preventDefault()
    setTelephoneNumberTemp(e.target.value)
  }
  const birthdayChange = (e) => {
    e.preventDefault()
    setBirthdayTemp(e.target.value)
  }
  const saveButton = (e) => {
    e.preventDefault()
    dispatch(setPopup(true))
  }
  const noButton = (e) => {
    e.preventDefault()
    dispatch(setPopup(false))
  }
  const submitForm = async (e) => {
    e.preventDefault()
      dispatch(userDetailsUpdate({ display_name: display_nameTemp, email: emailTemp, phone_no: telephoneNumberTemp, birthday: birthdayTemp, colour: colourSelectState }))
      dispatch(setPopup(false))
    
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userDetailsFetch())

  }, [dispatch])
  return <>
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
    <form onSubmit={submitForm}><div data-testid="userDetails" className={popupState ? 'grid-item blur-background' : 'grid-item'} >
      <h3>User Details</h3><br />
      <label htmlFor="display_name">
        <h4>Display Name</h4>
      </label>
      <input className='details' id="display_name" value={display_nameTemp} onChange={display_nameChange} />
      <label htmlFor="email">
        <h4>Email</h4>
      </label>
      <input className='details' type='email' id="email" value={emailTemp} onChange={emailChange} />
      <label htmlFor="telephoneNumber">
        <h4>Telephone Number</h4>
      </label>
      <input className='details' type='tel' id="telephoneNumber"  value={telephoneNumberTemp} onChange={telephoneNumberChange} />
      <label htmlFor="birthday">
        <h4>Birthday</h4>
      </label>
      <input className='details' type='date' id="birthday" value={birthdayTemp} onChange={birthdayChange} />
      <label htmlFor="colors">
        <h4>Colour Scheme</h4>
      </label>
      <select className='details' id='colors' onChange={colourSelectorChangeHandler} value={colourSelectState}>
        <option value="sandy">Sandy</option>
        <option value="forest">Forest</option>
        <option value="ocean">Ocean</option>
        <option value="pinky">Pinky</option>
        <option value="contrast">High Contrast</option>
        <option value="dark">Dark</option>
      </select><br />
      <button onClick={saveButton}>Save</button>
      <p className={errorUserDetails?'error':'hidden'}>{errorUserDetails}</p>
    </div>
      <div className={popupState ? 'popup' : 'hidden'}>
        <h4>Save Details?</h4>
        <button type='submit'>Yes</button>
        <button onClick={noButton}>No</button>
      </div>
        
    </form>


  </>
}