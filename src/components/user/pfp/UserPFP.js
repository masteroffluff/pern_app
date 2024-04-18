/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthToken, selectUserID } from "../auth/userAuthSlice";


const default_image = '/images/fluffbook_blankpfp.png'
const loading_image = '/images/fluffbook_loadingpfp.png'
const error_image = '/images/fluffbook_errorpfp.png'
const apiUrl = process.env.REACT_APP_API_URL;


export default function UserPFP({ height, width }) {
    const dispatch = useDispatch();
    const authToken = useSelector(selectAuthToken);
    const id = useSelector(selectUserID)
    const [imageSrc, setImageSrc] = useState(default_image);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false)
    const [imageType, setImageType] = useState('')

    useEffect(() => {
        async function fetchImage() {
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
        }
    },
        [authToken, dispatch, id]);

    async function updateImage(imageBuffer) {

        try {
            const formData = new FormData();
            formData.append('image', imageBuffer);
            const options = {
                'method': 'PUT',
                'credentials': 'include',
                'headers': {
                    'Authorization': `Bearer ${authToken}`,
                    //"Content-type": "multipart/form-data",
                },
                'body': formData
            };
            //console.log(options)

            const response = await fetch(`${apiUrl}/user/pfp`, options);
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

    const handleImageChange = (e) => {
        e.preventDefault()

        const file = (e.target.files[0])


        const reader = new FileReader();

        reader.onloadend = () => {
            // Once the file is read, send the image data to the server
            if (file) {
                console.log(file)
                const image = new Image();
                image.src = reader.result;
                image.onload = () => {
                    const width = image.width;
                    const height = image.height;
                    if (width > 1000 || height > 1000) {
                        alert('Image dimensions should not exceed 1000x1000.');
                        return;
                    }
                    updateImage(file)
                }
            };
        }
        if (file) {
            setImageType(file.type)
            reader.readAsDataURL(file);

        }

    }


    if (isLoading) {
        return (
            <div data-testid="PFP">
                <img aria-label='profile image' src={loading_image} height={height} width={width} alt='profile picture(loading)' />
            </div>
        );
    }
    if (hasError) {
        return (
            <div data-testid="PFP">
                <img aria-label='profile image' src={error_image} height={height} width={width} alt='profile picture(error)' />
            </div>
        );
    }

    return (<>

        <label data-testid="PFP" htmlFor="filepicker">
            <img aria-label='profile image' src={imageSrc} height={height} width={width} alt='profile picture' />
            <input id="filepicker" type="file" style={{ display: 'none' }} onChange={handleImageChange} accept="jpeg, jpg, png, webp" />
        </label>

    </>
    );
}



