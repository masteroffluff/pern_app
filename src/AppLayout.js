import React, {useEffect, useState} from "react";
//import MainDisplay from './components/mainPage/MainDisplay';
import { Outlet } from "react-router";
import './blur.css';
import { selectPopupState } from "./components/mainPage/popupSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn, userAuthCheck } from "./components/user/auth/userAuthSlice";
import UserLogin from "./components/user/auth/UserLogin";
//import colourSwitch from "./utils/colourswitch.js";
import { selectColourChoice, selectColourObject, setColour } from "./components/mainPage/colourSlice";

function AppLayout() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(userAuthCheck())
  },[dispatch])
  
  //const [colourObject, setColourObject] = useState(colourSwitch('sandy'))
  //const [colourSelectState, setColourSelectState] = useState('sandy')
  const colourObject = useSelector(selectColourObject)
  const colourSelectState= useSelector(selectColourChoice)

  const {main_text_color, popup_text_color, main_background_color, main_background_color_alt, popup_background_color, main_background_image_URL} = colourObject

  const colourSelectorChangeHandler = (e) =>{
    e.preventDefault()
    // setColourSelectState(e.target.value)
    // setColourObject(colourSwitch(e.target.value))
    dispatch(setColour(e.target.value))

  }

  
  
  const popupState = useSelector(selectPopupState)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  console.log(main_background_image_URL)
  if (isLoggedIn) {
    return (<>
      <div className='Appcontainer' >
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
        <div className={popupState ? 'App blur-background' : 'App'}>
          <header><h1>I havent thought of a title yet</h1></header>
          <nav>
            <NavLink to='/userdetails'>User Details</NavLink>
            <select id='colors' onChange={colourSelectorChangeHandler} value={colourSelectState}>
              <option value="sandy">Sandy</option>
              <option value="forest">Forest</option>
              <option value="ocean">Ocean</option>
              <option value="pinky">Pinky</option>
              <option value="contrast">High Contrast</option>
              <option value="dark">Dark</option>
            </select>
          </nav>
          
        </div>
        <Outlet />
      </div>
    </>
    );
  } else {
    return <UserLogin />
  }

}

export default AppLayout;
