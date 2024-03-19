import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFriends_Blocked, selectFriends_Pending, selectFriends_Live, selectFriends_Unfollowed, friendsFetch} from './userFriendsSlice'
import { useNavigate } from "react-router";

export default function UserFriends(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const friends = useSelector(selectFriends_Live)
    const blocked = useSelector(selectFriends_Blocked)
    const unfollowed = useSelector(selectFriends_Unfollowed)
    const pending = useSelector(selectFriends_Pending)
    useEffect(()=>{
        dispatch(friendsFetch())
    },[dispatch])

    const backButton= (e)=>{
        console.log('back')
        e.preventDefault()
        navigate('/')
    }
    return (
        <div data-testid="userFriends">
            <h3>Friends</h3>
            <h4>Your Friends</h4>
                {friends.length>0?<ul >{friends.map((e,i)=><li key={i} aria-label="friends">{e.display_name}</li>)}</ul>:<p>You have no freinds.</p>}
            <h4>Pending Requests to be friends</h4>
            <ul >
                {pending.length>0?<ul >{pending.map((e,i)=><li key={i} aria-label="pending">{e.display_name}</li>)}</ul>:<p>There are no pending friend requests</p>}
            </ul>
            <h4>Unfollowed</h4>
            <ul >
                {unfollowed.length>0?<ul >{unfollowed.map((e,i)=><li key={i} aria-label="unfollowed">{e.display_name}</li>)}</ul>:<p>You have no unfollowed freinds.</p>}
            </ul>
            <h4>Blocked</h4>
            <ul >
                {blocked.length>0?<ul >{blocked.map((e,i)=><li key={i} aria-label="blocked">{e.display_name}</li>)}</ul>:<p>You have no freinds blocked.</p>}
            </ul>
            <button onClick={backButton}>Back</button>
        </div>)
}