import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../../utils/apiFetch';

const apiUrl = process.env.REACT_APP_API_URL// actual api path is stored in .env.client

const initialState ={
    date:'',
    isLoading: false,
    hasError: null,       
}

const name = "pfp"
// // get     /userpfp                       userSlice       userPfp      list of user details (display name, email, phone number)

export const userPfpFetch = createAsyncThunk(
    'userPfpFetch',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/userpfp`
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

// // update  /userpfp                       userSlice       userUpdate       list of user details (display name, email, phone number)

export const userPfpUpdate = createAsyncThunk(
    'userPfpUpdate',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/userpfp`
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



export const userPfpSlice = createSlice({
    name,
    initialState,
    reducers: {},
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
                        state.data=action.payload
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
export const isLoadingUserPfp = (state) => state.userpfp.isLoading;
export const hasErrorUserPfp = (state) => state.userpfp.hasError;
export const selectedUserPfp = (state) => state.userpfp.data;


export default userPfpSlice.reducer