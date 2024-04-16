import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthToken } from "../auth/userAuthSlice";

const default_image = '/images/fluffbook_blankpfp.png'
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

    return (
        <>
            {isLoading ? (
                <img aria-label='profile image' src={default_image} height={height} width={width} alt='profile picture' />
            ) : (
                <img style={hasError?{color:'red'}:{}}  aria-label='profile image' src={imageSrc} height={height} width={width} alt='profile picture' />
            )}
        </>
    );
}
