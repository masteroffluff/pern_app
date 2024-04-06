import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../../utils/apiFetch';

const apiUrl = process.env.REACT_APP_API_URL// actual api path is stored in .env.client

const initialState = {
    display_name: '',
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
    async (body, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken
        const endPoint = `${apiUrl}/user`
        console.log(endPoint)
        const options = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken,

            },
            body: JSON.stringify(body)
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
                        const { display_name, email, phone_no, birthday, colour } = action.payload
                        state.display_name = display_name;
                        state.email = email;
                        state.telephoneNumber = phone_no;
                        state.birthday = birthday;
                        state.colour = colour;
                        state.isLoading = false;
                        state.hasError = null;


                    })

                .addMatcher(
                    isAnyOf(
                        userDetailsFetch.pending,
                        userDetailsUpdate.pending,
                    ),
                    (state) => {
                        state.isLoading = true;
                        state.hasError = null;
                    }
                )
                .addMatcher(
                    isAnyOf(
                        userDetailsFetch.rejected,
                        userDetailsUpdate.rejected,
                    ),
                    (state, action) => {
                        console.log(action)
                        state.isLoading = false;
                        if (typeof (action.payload?.message) == 'object') {
                            state.hasError = action.payload.message.message;
                        } else {
                            // no message then just return the error
                            state.hasError = action.error
                        }
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