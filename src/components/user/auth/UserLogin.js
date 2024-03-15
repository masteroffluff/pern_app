import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectedUserDetails } from "./userDetailsSlice";

// ✕ displays user display name (4 ms)
// ✕ displays user phone number (3 ms)
// ✕ displays user email (4 ms)

export default function UserLogin(){
    const [displayName, setDisplayName] = useState('')    
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const displayNameChange=(e)=>{
        e.preventDefault()
        setDisplayName(e.target.value)

    }
    const passwordChange=(e)=>{
        e.preventDefault()
        setPassword(e.target.value)
    }
    const loginSubmit=(e)=>{
        e.preventDefault()
        if(!displayName||!password){
            setErrorMessage('Please enter your display name and password')
            return
        }
    }

    return <div data-testid="userDetails">
        <h3>Login</h3>
        <form onSubmit={loginSubmit}>
            <label htmlFor="displayName"><h4>Display Name</h4></label>
            <input type="text" id='displayName' value = {displayName} onChange={displayNameChange} />
            <label htmlFor="password"><h4>Pasword</h4></label>
            <input type="password" id='password' value = {password} onChange={passwordChange} />
            <input type="submit" id='submit' >Log In</input>
            <p className="errorMessage">{errorMessage}</p>
        </form>
    </div>
}