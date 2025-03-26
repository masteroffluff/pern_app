import React, { useEffect } from "react";
//import MainDisplay from './components/mainPage/MainDisplay';
import { Outlet, useLocation, useNavigate } from "react-router";
import './blur.css';
import { selectPopupState } from "./components/mainPage/popupSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn, userAuthCheck } from "./components/user/auth/userAuthSlice";
import { UserLogin, UserDetailsMini } from "./components/user";
//import colourSwitch from "./utils/colourswitch.js";
import { selectColourObject } from "./components/user/details/userDetailsSlice";
import UserRegister from "./components/user/auth/UserResister";

function AppLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userAuthCheck())
  }, [dispatch])

  //const [colourObject, setColourObject] = useState(colourSwitch('sandy'))
  //const [colourSelectState, setColourSelectState] = useState('sandy')
  const colourObject = useSelector(selectColourObject)


  const { main_text_color,main_text_color_button, popup_text_color, main_background_color, main_background_color_alt, popup_background_color, main_background_image_URL } = colourObject

  const popupState = useSelector(selectPopupState)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  if (isLoggedIn) {
    if (location.pathname === '/') { navigate('/main') }
    return (<>
      <div id="background"></div>
      <div className='Appcontainer' >
        <style>{`
        :root {
          --main-text-color: ${main_text_color};
          --main-button-text-color:${main_text_color_button};
          --main-background-color: ${main_background_color};
          --main-background-color-alt:${main_background_color_alt};
          --popup-text-color:${popup_text_color};
          --popup-background-color:${popup_background_color};
        }
        body {
          color: var(--main-text-color);
          
          
        }
        #background{
        background-image:url(${main_background_image_URL});
        }
        .main{
          ${location.pathname === '/main'?'diplay:inline-block':'display:none'}
        }
        .user-details{
          ${location.pathname === '/userdetails'?'diplay:inline-block':'display:none'}
        }
      `}</style>
        <div className={popupState ? 'App blur-background' : 'App'}>
          <header>
            <div className="title">
              <h1>Fluffbook</h1>
            </div>
            <div>
              <UserDetailsMini />
            </div>
          </header>
          <nav>
            <div>
              <NavLink className='button-like-link' to='/userdetails'>User Details</NavLink>
              <NavLink className='button-like-link' to='/main'>Main Page</NavLink>
            </div>
            <div className='smallvp-button-block main'>
              <a className='button-like-link' href='#today'>Today</a>
              <a className='button-like-link' href='#wall'>Wall</a>
              <a className='button-like-link' href='#calendar'>Calendar</a>
              <a className='button-like-link' href='#todo'>Todo</a>
            </div>
            <div className='smallvp-button-block user-details'>
              <a className='button-like-link' href='#details'>User Details</a>
              <a className='button-like-link' href='#friends'>Friends</a>
            </div>
            
          </nav>

        </div>
        <Outlet />
      </div>
    </>
    );
  } else {
    return (
      <div className='Appcontainer' >
        <header><h1>Welcome to Fluffbook</h1></header>
        <div className="grid-container main-grid-container">
          <div className="grid-item">
            <UserLogin />
          </div>
          <div className="grid-item">
            <UserRegister />
          </div>
        </div>
      </div>
    )
  }

}

export default AppLayout;
