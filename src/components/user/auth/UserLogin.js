import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHasErrorAuth, userAuthLogin } from "./userAuthSlice";

// ✕ displays user display name (4 ms)
// ✕ displays user phone number (3 ms)
// ✕ displays user email (4 ms)

export default function UserLogin(){

    const dispatch = useDispatch()

    const authError = useSelector(selectHasErrorAuth)

    const [display_name, setDisplayName] = useState('')    
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const display_nameChange=(e)=>{
        e.preventDefault()
        setDisplayName(e.target.value)

    }
    const passwordChange=(e)=>{
        e.preventDefault()
        setPassword(e.target.value)
    }
    const loginSubmit=(e)=>{
        e.preventDefault()
        if(!display_name||!password){
            setErrorMessage('Please enter your display name and password')
            return
        }
        dispatch(userAuthLogin({password,username:display_name}))
    }

    return <div className="App" data-testid="userDetails">
        <h3>Please Login</h3>
        <form onSubmit={loginSubmit}>
            <label htmlFor="display_name"><h4>Display Name</h4></label>
            <input type="text" id='display_name' value = {display_name} onChange={display_nameChange} />
            <label htmlFor="password"><h4>Pasword</h4></label>
            <input type="password" id='password' value = {password} onChange={passwordChange} />
            <button type="submit" id='submit' >Log In</button>
            {errorMessage?<p className="errorMessage">{errorMessage}</p>:<></>}
            {errorMessage?<p className="errorMessage">{authError}</p>:<></>}
        </form>
    </div>
}