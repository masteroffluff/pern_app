import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../../utils/apiFetch';

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
    async (_, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken
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
    async (_, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken
        const endPoint = `${apiUrl}/user`
        console.log (endPoint)
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
                        const {displayName,email, telephoneNumber} = action.payload
                        state.displayName = displayName
                        state.email = email
                        state.telephoneNumber = telephoneNumber
                        state.isLoading = false;
                        state.hasError =  null;
                        

                    })
  
                .addMatcher(
                    isAnyOf(
                        userDetailsFetch.pending,
                        userDetailsUpdate.pending,
                        ),
                    (state) => {
                        state.isLoading = true;
                        state.hasError =  null;
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
                        //console.log(action)
                    }
                )
                // .addDefaultCase(
                //     (_, action) => { console.log(action) }
                // )
        }
})


/* export const selectedUserDetailsId = (state) => state.userdetails.userdetails_id; */
export const isLoadingUserDetails = (state) => state.user.details.isLoading;
export const hasErrorUserDetails = (state) => state.user.details.hasError;
export const selectedUserDetails = (state) => state.user.details;
export const selectedNotes = (state) => state.user.details.todos;
export const selectedTodos = (state) => state.user.details.notes;


export default userDetailsSlice.reducer