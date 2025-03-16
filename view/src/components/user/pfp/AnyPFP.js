/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthToken } from "../auth/userAuthSlice";

const default_image = '/images/fluffbook_blankpfp.png'
const loading_image = '/images/fluffbook_loadingpfp.png'
const error_image = '/images/fluffbook_errorpfp.png'

const apiUrl = process.env.REACT_APP_API_URL;

export default function AnyPFP({ id, height, width }) {
    const dispatch = useDispatch();
    const authToken = useSelector(selectAuthToken);
    const [imageSrc, setImageSrc] = useState(default_image);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        async function fetchImage(id) {
            try {
                const options = {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Authorization': `Bearer ${authToken}`,
                    }
                };
                const response = await fetch(`${apiUrl}/user/pfp?id=${id}`, options);
                if (!response.ok) {
                    throw new Error(`Error fetching image: ${response.status} ${response.statusText}`);
                }

                const blob = await response.blob();
                console.log(blob)
                const imageUrl = URL.createObjectURL(blob);
                setImageSrc(imageUrl);
                //console.log(imageUrl)
                setHasError(false)
            } catch (error) {
                console.error(error);
                setHasError(true)
            } finally {
                setIsLoading(false); 
            }
        }

        if (id !== -1) {
            setIsLoading(true);
            setHasError(false)
            fetchImage(id);
        } else {
            setImageSrc(default_image);
            setIsLoading(false); // Set loading state to false if id is -1
        }
    }, [authToken, dispatch, id]);

    if (isLoading){
        return (
            <div data-testid="PFP" style={{height:`${height}px`, width:`${width}px`}}>
                <img aria-label='profile image' src={loading_image} height={height} width={width} alt='profile picture(loading)' />
            </div>
        );
    }
    if (hasError){
        return (
            <div data-testid="PFP" style={{height:{height}, width:{width}}}>
                <img aria-label='profile image' src={error_image} height={height} width={width} alt='profile picture(error)' />    
            </div>
        );
    }

    return (
        <div className="PFP" style={{ height: `${height}px`, width: `${width}px` }}>
            <img aria-label='profile image' src={imageSrc} style={{maxHeight:'100%',maxWidth:'100%'}} alt='profile picture' />
        </div>
    );
}
