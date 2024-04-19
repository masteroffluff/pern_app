import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "../../mainPage/popupSlice";
import { useNavigate } from "react-router";


import { friendsPotential, selectPotentials, isLoadingfriends, friendsAdd } from "./userFriendsSlice";
import AnyPFP from "../pfp/AnyPFP";


export default function AddFriend() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const potentialFriends = useSelector(selectPotentials)
    const isLoading = useSelector(isLoadingfriends)
    //const hasError = useSelector(hasErrorfriends)

    const blank = { id: -1, display_name: '_' }
    //const [potentialFriends, setPotentialFriends] = useState([])
    const [listToDisplay, setListToDisplay] = useState([blank, blank, blank, blank, blank])
    const [enterFriendValue, setEnterFriendValue] = useState('')

    function PotentialFriend({ person }) {
        const { display_name, id } = person
        // const dispatch = useDispatch()

        const freindAddClick = (e) => {
            e.preventDefault()
            dispatch(friendsAdd(person)).unwrap()
                .then(() =>{
                    dispatch(friendsPotential());
                    navigate('/userdetails');
                    })
        }


        return (
            <>
                <label className="addButton" htmlFor='potentialFreindAdd'>
                    <div><AnyPFP height='96' width='96' id={id} /> {display_name}</div>
                    <button style={{ display: 'none' }} id='potentialFreindAdd' onClick={freindAddClick} />
                </label>
            </>
        )
    }

    useEffect(() => {
        dispatch(setPopup(true))
        dispatch(friendsPotential())
        //dispatch(friendsFetch)
        return () => dispatch(setPopup(false))
    }, [dispatch])

    const cancelAddFriend = (e) => {
        e.preventDefault()
        navigate('/userdetails')
    }
    const enterFriendUpdate = (e) => {
        e.preventDefault()
        const targetValue = e.target.value
        setEnterFriendValue(targetValue)
        let tempArray
        if (!targetValue) {
            tempArray = []
        } else {
            tempArray = potentialFriends.filter(({ display_name }) => String(display_name).toLocaleLowerCase().includes(targetValue));
        }

        setListToDisplay([tempArray[0] || blank, tempArray[1] || blank, tempArray[2] || blank, tempArray[3] || blank, tempArray[4] || blank])
    }
    return (
        <div data-testid="addFriend" className='popup'>
            <h4>Add Friend</h4>
            <form>
                <label htmlFor="enterFriend">Select Friend</label>
                {isLoading}
                {isLoading ? <p aria-label="Select Friend">Please wait loading</p> : <input data-testid="enterFriend" type='text' id="enterFriend" value={enterFriendValue} onChange={enterFriendUpdate} />}

                {listToDisplay.map((e, i) => <PotentialFriend key={i} person={e} />)}
                <button onClick={cancelAddFriend}>Cancel</button>

            </form>


        </div>)
}