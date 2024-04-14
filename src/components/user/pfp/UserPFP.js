import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserPfp, userPfpFetch } from "./userPfpSlice";


export function UserPFP({id,height,width}){

    const userPFP = useSelector(selectUserPfp)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(userPfpFetch({id}))
    }, [dispatch,id])
        
    return(
        <>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src={userPFP} height={height} width={width} alt='profile picture' />
        </>
    )
}