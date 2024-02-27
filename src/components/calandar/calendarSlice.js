import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../utils/apiFetch';

const apiUrl = process.env.REACT_APP_API_URL// actual api path is stored in .env.client

const initialState =[]



const name = "calendar"
// // get     /calendar                   calendarSlice   calendarGet      list of users calendar items in date range

export const calendarGet = createAsyncThunk(
    'calendarGet',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/items/note`
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

// // post    /calendar                   calendarSlice   calendarPost     list of users calendar items in date range

export const calendarPost = createAsyncThunk(
    'calendarPost',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/items/note`
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

// // delete  /calendar                   calendarSlice   calendarDelete   list of users calendar items in date range

export const calendarDelete = createAsyncThunk(
    'calendarDelete',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/items/note`
        //console.log (endPoint)
        const options = {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken,

            }
        };
        return await apiFetch(endPoint, options, rejectWithValue)
    }
)


export const calendarSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                .addMatcher(isAnyOf(
                    calendarGet.fulfilled,   
                    calendarPost.fulfilled,  
                    calendarDelete.fulfilled
                    ),
                    (state, action) => {
                        //console.log(action.payload)

                    }) 
                .addMatcher(
                    isAnyOf(
                        calendarGet.pending,   
                        calendarPost.pending,  
                        calendarDelete.pending
                        ),
                    (state) => {
                        state.isLoading = true;
                        state.hasError = false;
                    }
                )
                .addMatcher(
                    isAnyOf(
                        calendarGet.rejected,   
                        calendarPost.rejected,  
                        calendarDelete.rejected
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

export const isLoadingCalendar = (state) => state.calendar.isLoading;
export const hasErrorCalendar = (state) => state.calendar.hasError;
export const selectCalendar = (state) => state.calendar;


export default calendarSlice.reducer