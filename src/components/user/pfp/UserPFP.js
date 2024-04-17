import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserPfp, userPfpFetch, isLoadingUserPfp, hasErrorUserPfp } from "./userPfpSlice";


export default function UserPFP({ height, width }) {

    const dispatch = useDispatch()
    const userPFPdata = useSelector(selectUserPfp)
    const isLoading = useSelector(isLoadingUserPfp)
    const hasError = useSelector(hasErrorUserPfp)

    useEffect(() => {
        if (!userPFPdata) {
            dispatch(userPfpFetch())
        }
    }, [dispatch, userPFPdata])
    if (isLoading) {
        return (
            <div style={{ height: { height }, width: { width } }}>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <p>loading image</p>
            </div>
        )
    }
    if (hasError) {
        return (
            <div style={{ height: { height }, width: { width } }}>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <p className="error">error</p>
            </div>
        )
    }
    return (
        <div style={{ height: { height }, width: { width } }}>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src={userPFPdata} height={height} width={width} alt='profile picture' />
        </div>
    )
}