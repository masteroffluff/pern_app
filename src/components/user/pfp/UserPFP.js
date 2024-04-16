import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserPfp, userPfpFetch } from "./userPfpSlice";


export default function UserPFP({ id, height, width }) {

    const dispatch = useDispatch()
    const userPFP = useSelector(selectUserPfp)

    useEffect(() => {

     dispatch(userPfpFetch())

    }, [dispatch, id])

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src={userPFP} height={height} width={width} alt='profile picture' />
        </>
    )
}