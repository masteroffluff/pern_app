import React, {useState} from "react";
import MainDisplay from './components/mainPage/MainDisplay';
import { Outlet } from "react-router";
import './blur.css';
import { selectPopupState } from "./components/mainPage/popupSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn, userAuthCheck } from "./components/user/auth/userAuthSlice";
import UserLogin from "./components/user/auth/UserLogin";
import colourSwitch from "./utils/colourswitch.js";

function AppLayout() {
  const dispatch = useDispatch();

  const [colourObject, setColourObject] = useState(colourSwitch('sandy'))
  const [colourSelectState, setColourSelectState] = useState('sandy')
  const colourSelectorChangeHandler = (e) =>{
    e.preventDefault()
    setColourSelectState(e.target.value)
    setColourObject(colourSwitch(e.target.value))
  }
  const {main_text_color, popup_text_color, main_background_color, main_background_color_alt, popup_background_color, main_background_image_URL} = colourObject

  dispatch(userAuthCheck())
  const popupState = useSelector(selectPopupState)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  if (isLoggedIn) {
    return (<>
      <div className='Appcontainer' /* style={{ 
          '--main-text-color': main_text_color, 
          '--main-background-color': main_background_color, 
          '--main-background-color-alt':main_background_color_alt,
          '--popup-text-color':popup_text_color,
          '--popup-background-color':popup_background_color,
          }} */ >
        <style>{`
        :root {
          --main-text-color: ${main_text_color};
          --main_background_color: ${main_background_color};
          --main-background-color:${main_background_color};
          --main-background-color-alt:${main_background_color_alt};
          --popup-text-color:${popup_text_color};
          --popup-background-color':${popup_background_color}
        }
        body {
          color: var(--main-text-color);
          /* background-color: var(--background-color); */
          background-image:url(${main_background_image_URL})
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
          <MainDisplay />
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
