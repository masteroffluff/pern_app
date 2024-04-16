import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../../utils/apiFetch';
import { createSelector } from '@reduxjs/toolkit'

const apiUrl = process.env.REACT_APP_API_URL// actual api path is stored in .env.client

const initialState = {
    list: [],
    isLoading: false,
    hasError: null,
    potentials: []
}

const name = "friends"
// // get     /friends                    friendsSlice    friendsFetch     list of users friends and their state (friend, unfollowed, blocked)

export const friendsFetch = createAsyncThunk(
    'friendsListFetch',
    async (_, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken

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

export const friendsPotential = createAsyncThunk(
    'friendsPotential',
    async (_, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken

        const endPoint = `${apiUrl}/friends/potential`
        console.log (endPoint)
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken

            }
        };
        return await apiFetch(endPoint, options, rejectWithValue)
    }
)

// // post    /friends                    friendsSlice    friendsAdd       list of users friends and their state (friend, unfollowed, blocked)

export const friendsAdd = createAsyncThunk(
    'friendsAdd',
    async ({ friend_id }, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken

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



// // update  /friends/confirm            friendsSlice    friendConfirm    list of users friends and their state (friend, unfollowed, blocked)

export const friendConfirm = createAsyncThunk(
    'friendsUpdate',
    async (_, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken

        const endPoint = `${apiUrl}/friends/confirm`
        //console.log (endPoint)
        const options = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken,

            }
        };
        return await apiFetch(endPoint, options, rejectWithValue)
    }
)

// // update  /friends/unfollow           friendsSlice    friendsUnfollow  list of users friends and their state (friend, unfollowed, blocked)

export const friendsUnfollow = createAsyncThunk(
    'friendsUpdate',
    async (_, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken

        const endPoint = `${apiUrl}/friends/unfollow`
        //console.log (endPoint)
        const options = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken,

            }
        };
        return await apiFetch(endPoint, options, rejectWithValue)
    }
)

// // update  /friends/block              friendsSlice    friendsBlock     list of users friends and their state (friend, unfollowed, blocked)

export const friendsBlock = createAsyncThunk(
    'friendsUpdate',
    async (_, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken

        const endPoint = `${apiUrl}/friends/block`
        //console.log (endPoint)
        const options = {
            method: 'PUT',
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
                .addCase(friendsPotential.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.hasError = null;
                    console.log(action.payload)
                    state.potentials = action.payload;
                })
                .addMatcher(isAnyOf(
                    friendsFetch.fulfilled,
                    friendsAdd.fulfilled,
                    friendConfirm.fulfilled,
                    friendsUnfollow.fulfilled,
                    friendsBlock.fulfilled,


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
                        friendsBlock.pending,
                        friendsPotential.pending
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
                        friendsBlock.rejected,
                        friendsPotential.rejected
                    ),
                    (state, action) => {
                        //console.log(action)
                        state.isLoading = false;
                        state.hasError = action.error;
                    }
                )

        }
})


export const isLoadingfriends = (state) => state.user.friends.isLoading;
export const hasErrorfriends = (state) => state.user.friends.hasError;
export const selectPotentials = (state) => state.user.friends.potentials
const selectfriends = (state) => state.user.friends.list
// memoizing friends selectors to improve efficiency
export const selectFriends_Live = createSelector(selectfriends, (friends) => friends.filter((e) => e.status === 'friend'))
export const selectFriends_Blocked = createSelector(selectfriends, (friends) => friends.filter((e) => e.status === 'blocked'))
export const selectFriends_Unfollowed = createSelector(selectfriends, (friends) => friends.filter((e) => e.status === 'unfollowed'))
export const selectFriends_Pending = createSelector(selectfriends, (friends) => friends.filter((e) => e.status === 'pending'))
export const selectFriends_Sent = createSelector(selectfriends, (friends) => friends.filter((e) => e.status === 'sent'))
export const selectFriends_LiveMap = createSelector(selectfriends, (friends) => {
    const friendsMap = new Map();
    friends.forEach((e) => {
        console.log(e)
        if (e.status === 'friend'){
            
            friendsMap.set( e.id,e.display_name)
        }

    })
    return friendsMap
})

export default friendsSlice.reducer