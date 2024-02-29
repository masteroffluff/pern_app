import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../../utils/apiFetch';
import { createSelector } from '@reduxjs/toolkit'

const apiUrl = process.env.REACT_APP_API_URL// actual api path is stored in .env.client

const initialState ={
    list:[],
    isLoading:false,
    hasError: null
}

const name = "friends"
// // get     /friends                    friendsSlice    friendsFetch     list of users freinds and their state (freind, unfollowed, blocked)

export const friendsFetch = createAsyncThunk(
    'friendsListFetch',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/friends`
        //console.log (endPoint)
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken,

            }
        };
        return await apiFetch(endPoint, options, rejectWithValue)
    }
)
// // post    /friends                    friendsSlice    friendsAdd       list of users freinds and their state (freind, unfollowed, blocked)

export const friendsAdd = createAsyncThunk(
    'friendsAdd',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/friends`
        //console.log (endPoint)
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken,

            }
        };
        return await apiFetch(endPoint, options, rejectWithValue)
    }
)

// // update  /friends/confirm            friendsSlice    friendConfirm    list of users freinds and their state (freind, unfollowed, blocked)

export const friendConfirm = createAsyncThunk(
    'friendsUpdate',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/friends/confirm`
        //console.log (endPoint)
        const options = {
            method: 'UPDATE',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken,

            }
        };
        return await apiFetch(endPoint, options, rejectWithValue)
    }
)

// // update  /friends/unfollow           friendsSlice    friendsUnfollow  list of users freinds and their state (freind, unfollowed, blocked)

export const friendsUnfollow = createAsyncThunk(
    'friendsUpdate',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/friends/unfollow`
        //console.log (endPoint)
        const options = {
            method: 'UPDATE',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken,

            }
        };
        return await apiFetch(endPoint, options, rejectWithValue)
    }
)

// // update  /friends/block              friendsSlice    friendsBlock     list of users freinds and their state (freind, unfollowed, blocked)

export const friendsBlock = createAsyncThunk(
    'friendsUpdate',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/friends/block`
        //console.log (endPoint)
        const options = {
            method: 'UPDATE',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken,

            }
        };
        return await apiFetch(endPoint, options, rejectWithValue)
    }
)


export const friendsSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                .addMatcher(isAnyOf(
                    friendsFetch.fulfilled,    
                    friendsAdd.fulfilled,     
                    friendConfirm.fulfilled,  
                    friendsUnfollow.fulfilled,
                    friendsBlock.fulfilled  

                    ),
                    (state, action) => {
                        // console.log(action.payload)
                        state.isLoading = false;
                        state.hasError = null;
                        state.list = action.payload;
                    })
  
                .addMatcher(
                    isAnyOf(
                        friendsFetch.pending,    
                        friendsAdd.pending,     
                        friendConfirm.pending,  
                        friendsUnfollow.pending,
                        friendsBlock.pending  
                        ),
                    (state) => {
                        state.isLoading = true;
                        state.hasError = null;
                    }
                )
                .addMatcher(
                    isAnyOf(
                        friendsFetch.rejected,    
                        friendsAdd.rejected,     
                        friendConfirm.rejected,  
                        friendsUnfollow.rejected,
                        friendsBlock.rejected  
                    ),
                    (state, action) => {
                        //console.log(action)
                        state.isLoading = false;
                        state.hasError = action.error;
                    }
                )

        }
})


/* export const selectedfriendsId = (state) => state.friends.friends_id; */
export const isLoadingfriends = (state) => state.user.friends.isLoading;
export const hasErrorfriends = (state) => state.user.friends.hasError;
const selectFreinds = (state) => state.user.friends.list
// export const selectFriends_Live = (state) => state.user.friends.list.filter((e)=>e.status === 'friend');
// export const selectFriends_Blocked = (state) => state.user.friends.list.filter((e)=>e.status === 'blocked');;
// export const selectFriends_Unfollowed = (state) => state.user.friends.list.filter((e)=>e.status === 'unfollowed');;
// export const selectFriends_Pending = (state) => state.user.friends.list.filter((e)=>e.status === 'pending');;
// memoizing friends selectors to improve efficiency
export const selectFriends_Live = createSelector(selectFreinds,(friends)=>friends.filter((e)=>e.status === 'friend'))
export const selectFriends_Blocked = createSelector(selectFreinds,(friends)=>friends.filter((e)=>e.status === 'blocked'))
export const selectFriends_Unfollowed = createSelector(selectFreinds,(friends)=>friends.filter((e)=>e.status === 'unfollowed'))
export const selectFriends_Pending = createSelector(selectFreinds,(friends)=>friends.filter((e)=>e.status === 'pending'))


export default friendsSlice.reducer