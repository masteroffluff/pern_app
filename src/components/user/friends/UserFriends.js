import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFriends_Blocked, selectFriends_Pending, selectFriends_Live, selectFriends_Sent, selectFriends_Unfollowed, friendsFetch } from './userFriendsSlice'
import { useNavigate } from "react-router";
import { selectPopupState } from "../../mainPage/popupSlice";
import Friend from './Friend'

export default function UserFriends() {
    const popupState = useSelector(selectPopupState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const friends = useSelector(selectFriends_Live)
    const blocked = useSelector(selectFriends_Blocked)
    const unfollowed = useSelector(selectFriends_Unfollowed)
    const pending = useSelector(selectFriends_Pending)
    const sent = useSelector(selectFriends_Sent)

    useEffect(() => {
        dispatch(friendsFetch())
    }, [dispatch])

    const addFriend = (e) => {
        e.preventDefault()
        navigate('/userdetails/addfriend')
    }

    return (
        <div id='friends' data-testid="userFriends" className={popupState ? 'grid-item blur-background' : 'grid-item'}>
            <div className="friends-container" >
                <h3>Friends</h3>
                <div className="friend-list-container">

                    <h4>Pending Requests to be friends from other users</h4>
                    {pending.length > 0 ? <div className='friend-list' aria-label="pending">{pending.map((e, i) => <Friend key={i} person={e} type='pending' >{e.display_name}</Friend>)}</div> : <p>There are no pending friend requests</p>}
                    <h4>Sent requests to be friends</h4>
                    {sent.length > 0 ? <div className='friend-list' aria-label="sent">{sent.map((e, i) => <Friend key={i} person={e} type='sent' />)}</div> : <p>You have not got any unaccepted friend requests.</p>}
                    <h4>Your Current Friends</h4>               
                    {friends.length > 0 ? <div className='friend-list' aria-label="friends">{friends.map((e, i) => <Friend key={i} person={e} type='friend' />)}</div> : <p>You currently have no freinds.</p>}
                    <h4>Unfollowed</h4>
                    {unfollowed.length > 0 ? <div className='friend-list' aria-label="unfollowed">{unfollowed.map((e, i) => <Friend key={i} person={e} type='unfollowed' />)}</div> : <p>You have no unfollowed freinds.</p>}
                    <h4>Blocked</h4>
                    {blocked.length > 0 ? <div className='friend-list' aria-label="blocked">{blocked.map((e, i) => <Friend key={i} person={e} type='blocked' />)}</div> : <p>You have not blocked anyone.</p>}
                    <br />
                    <br />
                    <br />
                </div>
            </div>
            <button onClick={addFriend} >Add Friend</button>
        </div>)
}