import React from "react";
import { useSelector } from "react-redux";
import { selectFriends_Blocked, selectFriends_Pending, selectFriends_Live, selectFriends_Unfollowed} from '../friends/userFreindsSlice'

export default function UserFriends(){

    const friends = useSelector(selectFriends_Live)
    const blocked = useSelector(selectFriends_Blocked)
    const unfollowed = useSelector(selectFriends_Unfollowed)
    const pending = useSelector(selectFriends_Pending)

    return (<div data-testid="userFriends">
        <h3>Friends</h3>
        <h4>Your Friends</h4>
        <ul >
            {friends.map((e,i)=><li key={i} aria-label="friends">{e.name}</li>)}
        </ul>
        <h4>Pending Requests to be Freinds</h4>
        <ul >
            {pending.map((e,i)=><li key={i} aria-label="pending">{e.name}</li>)}
        </ul>
        <h4>Unfollowed</h4>
        <ul >
            {unfollowed.map((e,i)=><li key={i} aria-label="unfollowed">{e.name}</li>)}
        </ul>
        <h4>Blocked</h4>
        <ul >
            {blocked.map((e,i)=><li key={i} aria-label="blocked" >{e.name}</li>)}
        </ul>
    </div>)
}