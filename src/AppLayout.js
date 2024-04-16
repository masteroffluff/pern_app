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


  const { main_text_color, popup_text_color, main_background_color, main_background_color_alt, popup_background_color, main_background_image_URL } = colourObject

  const popupState = useSelector(selectPopupState)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  if (isLoggedIn) {
    if (location.pathname === '/') { navigate('/main') }
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
          <header><div>
            <h1>Fluffbook</h1>
          </div>
            <div>
              <UserDetailsMini />
            </div>
          </header>
          <nav>
            <NavLink to='/userdetails'>User Details</NavLink>
            <NavLink to='/main'>Main Page</NavLink>
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
        <div className="grid-container">
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
