import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../utils/apiFetch';

const apiUrl = process.env.REACT_APP_API_URL// actual api path is stored in .env.client

const initialState ={
    displayName: '',
    telephoneNumber: '',
    email: '',
}

const name = "details"
// // get     /user                       userSlice       userDetails      list of user details (display name, email, phone number)

export const userDetailsFetch = createAsyncThunk(
    'userDetailsFetch',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/user`
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

// // update  /user                       userSlice       userUpdate       list of user details (display name, email, phone number)

export const userDetailsUpdate = createAsyncThunk(
    'userDetailsUpdate',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/user`
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





export const userDetailsSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                .addMatcher(isAnyOf(
                    userDetailsFetch.fulfilled,
                    userDetailsUpdate.fulfilled

                    ),
                    (state, action) => {
                        //console.log(action.payload)

                    })
  
                .addMatcher(
                    isAnyOf(
                        userDetailsFetch.pending,
                        userDetailsUpdate.pending,
                        ),
                    (state) => {
                        state.isLoading = true;
                        state.hasError = false;
                    }
                )
                .addMatcher(
                    isAnyOf(
                        userDetailsFetch.rejected,
                        userDetailsUpdate.rejected,
                    ),
                    (state, action) => {
                        //console.log(action)
                        state.isLoading = false;
                        state.hasError = action.error;
                    }
                )
                .addDefaultCase(
                    (_, action) => { console.log(action) }
                )
        }
})


/* export const selectedUserDetailsId = (state) => state.userdetails.userdetails_id; */
export const isLoadingUserDetails = (state) => state.userdetails.isLoading;
export const hasErrorUserDetails = (state) => state.userdetails.hasError;
export const selectedUserDetails = (state) => state.userdetails;
export const selectedNotes = (state) => state.userdetails.todos;
export const selectedTodos = (state) => state.userdetails.notes;


export default userDetailsSlice.reducer