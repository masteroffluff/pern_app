import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../../utils/apiFetch';

const apiUrl = process.env.REACT_APP_API_URL// actual api path is stored in .env.client

const initialState = {
    data: null,
    isLoading: false,
    hasError: null,
}

const name = "pfp"
// // get     /userpfp                       userSlice       userPfp      list of user details (display name, email, phone number)

export const userPfpFetch = createAsyncThunk(
    'userPfpFetch',
    async (_, { rejectWithValue, getState }) => {
        alert('userPfpFetch')
        const authToken = getState().user.authentication.authToken
        const endPoint = `${apiUrl}/user/pfp`
        //console.log (endPoint)
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken,

            },

        };
        try {
            const response = await fetch(endPoint, options);
            if (response.ok) {

                const data = await response.blob();
                console.log(endPoint + ' success')
                try {
                    return JSON.parse(data)  // trap them tricksy double encoded replies
                }
                catch (error) {            // this simply passes throuch anything JSON.parse doesn't like
                    return data
                }
            } else {
                //console.log({response})
                console.log(endPoint + ' failed')
                try {
                    const message = await response.json()
                    return rejectWithValue({ status: response.status, message })
                }
                catch (e) {
                    rejectWithValue(e)
                }

            }

        } catch (e) {

            return rejectWithValue(e)
        }
    }
)

// // update  /userpfp                       userSlice       userUpdate       list of user details (display name, email, phone number)

export const userPfpUpdate = createAsyncThunk(
    'userPfpUpdate',
    async (_, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken

        const endPoint = `${apiUrl}/userpfp`
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



export const userPfpSlice = createSlice({
    name,
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        }
    },
    extraReducers:
        (builder) => {
            builder
                .addMatcher(isAnyOf(
                    userPfpFetch.fulfilled,
                    userPfpUpdate.fulfilled

                ),
                    (state, action) => {
                        //console.log(action.payload)
                        state.isLoading = false;
                        state.hasError = null;
                        state.data = action.payload
                    })

                .addMatcher(
                    isAnyOf(
                        userPfpFetch.pending,
                        userPfpUpdate.pending,
                    ),
                    (state) => {
                        state.isLoading = true;
                        state.hasError = null;
                    }
                )
                .addMatcher(
                    isAnyOf(
                        userPfpFetch.rejected,
                        userPfpUpdate.rejected,
                    ),
                    (state, action) => {
                        //console.log(action)
                        state.isLoading = false;
                        state.hasError = action.error;
                    }
                )
            // .addDefaultCase(
            //     (_, action) => { console.log(action) }
            // )
        }
})



/* export const selectedUserPfpId = (state) => state.userpfp.userpfp_id; */
export const isLoadingUserPfp = (state) => state.user.pfp.isLoading;
export const hasErrorUserPfp = (state) => state.user.pfp.hasError;
export const selectUserPfp = (state) => state.user.pfp.data;

export const { reset } = userPfpSlice.actions
export default userPfpSlice.reducer