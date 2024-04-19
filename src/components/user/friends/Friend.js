import React from "react";
import { friendUpdate } from "./userFriendsSlice";
import { useDispatch } from "react-redux";
import { AnyPFP } from '../index'

export default function Friend({ person, type }) {
    const dispatch = useDispatch()
    
    // const dispatch = useDispatch()

    const FreindButtonBar = ({ type }) => {
        
        const unfollowFriendClick = (e) => {
            e.preventDefault();
            dispatch(friendUpdate({person, command:'unfollow'}))
        };
        const blockFriendClick = (e) => {
            e.preventDefault();
            dispatch(friendUpdate({person, command:'block'}))
        };
        const confirmFriendClick = (e) => {
            e.preventDefault();
            dispatch(friendUpdate({person, command:'confirm'}))
        };
        const refollowFriendClick = (e) => {
            e.preventDefault();
            dispatch(friendUpdate({person, command:'refollow'}))
        };
        const unblockFriendClick = (e) => {
            e.preventDefault();
            dispatch(friendUpdate({person, command:'unblock'}))
        };
        
        switch (type) {
            case 'friend':
                return (<div className='friend-button-bar'>
                    <button id='blockFriend' onClick={blockFriendClick}>Block</button>
                    <button id='unfollowFriend' onClick={unfollowFriendClick}>Unfollow</button>
                </div>)
                
            case 'pending':
                return (<div className='friend-button-bar'>
                    <button id='blockFriend' onClick={blockFriendClick}>Block</button>
                    <button id='unfollowFriend' onClick={unfollowFriendClick}>Unfollow</button>
                    <button id='confirmFriend' onClick={confirmFriendClick}>Confirm</button>
                </div>)
                
            case 'sent':
                return (<div className='friend-button-bar'>
                    <button id='blockFriend' onClick={blockFriendClick}>Block</button>
                    <button id='unfollowFriend' onClick={unfollowFriendClick}>Unfollow</button>
                </div>)
                
            case 'unfollowed':
                return (<div className='friend-button-bar'>
                    <button id='blockFriend' onClick={blockFriendClick}>Block</button>
                    <button id='confirmFriend' onClick={refollowFriendClick}>Follow</button>
                </div>)
                
            case 'blocked':
                return (<div className='friend-button-bar'>
                    <button id='unfollowFriend' onClick={unfollowFriendClick}>Unfollow</button>
                    <button id='confirmFriend' onClick={unblockFriendClick}>Unblock</button>
                </div>)
                

            default:
                return (<div className='friend-button-bar'>
                    <p className="errorMessage">error type not identified</p>
                </div>)

        }
    }

    const { display_name, id } = person;
    return (<div className='friend'>
        <div className="friend-details">
            <AnyPFP height='64' width='64' id={id} />
            <div>{display_name}</div>
            
        </div>
        <FreindButtonBar type={type} />
    </div>);
}
