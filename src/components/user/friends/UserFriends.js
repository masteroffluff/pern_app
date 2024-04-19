import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFriends_Blocked, selectFriends_Pending, selectFriends_Live,selectFriends_Sent, selectFriends_Unfollowed, friendsFetch} from './userFriendsSlice'
import { useNavigate } from "react-router";
import { selectPopupState } from "../../mainPage/popupSlice";


export default function UserFriends(){
    const popupState = useSelector(selectPopupState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const friends = useSelector(selectFriends_Live)
    const blocked = useSelector(selectFriends_Blocked)
    const unfollowed = useSelector(selectFriends_Unfollowed)
    const pending = useSelector(selectFriends_Pending)
    const sent = useSelector(selectFriends_Sent)

    useEffect(()=>{
        dispatch(friendsFetch())
    },[dispatch])

    const addFriend = (e) => {
        e.preventDefault()
        navigate('/userdetails/addfriend')
    }

    return (
        <div data-testid="userFriends" className={popupState ? 'grid-item blur-background' : 'grid-item'}>
            <h3>Friends</h3>
            <h4>Your Friends</h4>
            {friends.length>0?<ul >{friends.map((e,i)=><li key={i} aria-label="friends">{e.display_name}</li>)}</ul>:<p>You have no freinds.</p>}
            <h4>Pending Requests to be friends from other users</h4>
            {pending.length>0?<ul >{pending.map((e,i)=><li key={i} aria-label="pending">{e.display_name}</li>)}</ul>:<p>There are no pending friend requests</p>}
            <h4>Sent requests to be friends</h4>
            {sent.length>0?<ul >{sent.map((e,i)=><li key={i} aria-label="sent">{e.display_name}</li>)}</ul>:<p>You have not got any unaccepted friend requests.</p>}
            <h4>Unfollowed</h4>
            {unfollowed.length>0?<ul >{unfollowed.map((e,i)=><li key={i} aria-label="unfollowed">{e.display_name}</li>)}</ul>:<p>You have no unfollowed freinds.</p>}
            <h4>Blocked</h4>
            {blocked.length>0?<ul >{blocked.map((e,i)=><li key={i} aria-label="blocked">{e.display_name}</li>)}</ul>:<p>You have no freinds blocked.</p>}
            <button onClick={addFriend} >Add Friend</button>
        </div>)
}