import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthRegister, selectIsWaitingAuth, selectHasErrorAuth } from "./userAuthSlice";
import { setPopup, selectPopupState } from "../../mainPage/popupSlice";


import '../../../App.css'
import { selectColourChoice, selectColourObject, setColour } from "../../user/details/userDetailsSlice";

// ✕ displays user display name (4 ms)
// ✕ displays user phone number (3 ms)
// ✕ displays user email (4 ms)

export default function UserRegister() {
  //const { display_name, email, telephoneNumber, birthday } = useSelector(selectedUserDetails)
  const colourObject = useSelector(selectColourObject)
  //const colourSelectState= useSelector(selectColourChoice)
  const { main_text_color, popup_text_color, main_background_color, main_background_color_alt, popup_background_color, main_background_image_URL } = colourObject

  const colourSelectState = useSelector(selectColourChoice)
  const errorAuth  = useSelector(selectHasErrorAuth) 
  const popupState = useSelector(selectPopupState)

  const dispatch = useDispatch()

  const [display_nameTemp, setDisplayNameTemp] = useState('')
  const [passwordTemp, setPasswordTemp] = useState('')
  const [passwordTemp1, setPasswordTemp1] = useState('')
  const [emailTemp, setEmailTemp] = useState('')
  const [telephoneNumberTemp, setTelephoneNumberTemp] = useState('')
  const [birthdayTemp, setBirthdayTemp] = useState('')

  
  const colourSelectorChangeHandler = (e) => {
    e.preventDefault()
    dispatch(setColour(e.target.value))
  }
  const display_nameChange = (e) => {
    e.preventDefault()
    setDisplayNameTemp(e.target.value)
  }
  const passwordChange = (e) => {
    e.preventDefault()
    setPasswordTemp(e.target.value)
  }
  const password1Change = (e) => {
    e.preventDefault()
    setPasswordTemp1(e.target.value)
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
      dispatch(userAuthRegister({ display_name: display_nameTemp, password:passwordTemp, email: emailTemp, phone_no: telephoneNumberTemp, birthday: birthdayTemp, colour: colourSelectState }))
      dispatch(setPopup(false))
    
  }

  

  return <>
    <style>
        {`
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
    <h3>Register</h3><br />  
    <form onSubmit={submitForm}><div data-testid="userDetails" className={popupState ? 'blur-background' : ''} >
      
      <label htmlFor="display_name">
        <h4>Display Name</h4>
      </label>
      <input className='details' type="text" id="display_name" value={display_nameTemp} onChange={display_nameChange} />
      <label htmlFor="password">
        <h4>Password</h4>
      </label>
      <input className='details' type="password" id="password" value={passwordTemp} onChange={passwordChange} />      
      <label htmlFor="email">
      <label htmlFor="password1">
        <h4>Please Re-Enter Password</h4>
      </label>
      <input className='details' type="password" id="password1" value={passwordTemp1} onChange={password1Change} />      
      <label htmlFor="email"></label>
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
      <p className={errorAuth?'error':'hidden'}>{errorAuth}</p>
    </div>
      <div className={popupState ? 'popup' : 'hidden'}>
        <h4>Save Details?</h4>
        <button type='submit'>Yes</button>
        <button onClick={noButton}>No</button>
      </div>
        
    </form>


  </>
}