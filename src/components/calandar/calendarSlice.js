import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../utils/apiFetch';

const apiUrl = process.env.REACT_APP_API_URL// actual api path is stored in .env.client
//const authToken = ""


const initialState = {
    calendarItems: [],
    isLoading: false,
    hasError: null,
  };



const name = "calendar"
// // get     /calendar                   calendarSlice   calendarGet      list of users calendar items in date range

export const calendarFetch = createAsyncThunk(
    'calendarGet',
    async (_, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken
        const endPoint = `${apiUrl}/calendar`
        //                // .addDefaultCase(
                //     (_, action) => { console.log(action) }
                // ) (endPoint)
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
    async ({ title,type, notes, place, dateFrom, dateTo, attendees, shared_to}, { rejectWithValue, getState }) => {
        
        const endPoint = `${apiUrl}/calendar`
        //console.log (endPoint)
        const authToken = getState().user.authentication.authToken
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken,

            },
            body:JSON.stringify({
                type,
                title,
                notes,
                place,
                dateFrom,
                dateTo,
                attendees,
                shared_to
            })
        };
        return await apiFetch(endPoint, options, rejectWithValue)
    }
)

export const calendarUpdate = createAsyncThunk(
    'calendarUpdate',
    async ({ item_id, title,type, notes, place, dateFrom, dateTo, attendees, shared_to}, { rejectWithValue, getState }) => {

        const endPoint = `${apiUrl}/calendar`
        //console.log (endPoint)
        const authToken = getState().user.authentication.authToken
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken,

            },
            body:JSON.stringify({
                type,
                title,
                notes,
                place,
                dateFrom,
                dateTo,
                attendees,
                shared_to
            })
        };
        return await apiFetch(endPoint, options, rejectWithValue)
    }
)



// // delete  /calendar                   calendarSlice   calendarDelete   list of users calendar items in date range

export const calendarDelete = createAsyncThunk(
    'calendarDelete',
    async ({ item_id }, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken
        const endPoint = `${apiUrl}/calendar?item_id=${item_id}`
    
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

export const calendarPostAttendee = createAsyncThunk(
    'calendarPostAttendees',
    async ({ item_id, attendee}, { rejectWithValue, getState }) => {

        const endPoint = `${apiUrl}/calendar/attendees?item_id=${item_id}&attendee=${attendee}s`
        //console.log (endPoint)
        const authToken = getState().user.authentication.authToken
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken,

            },
        };
        return await apiFetch(endPoint, options, rejectWithValue)
    }
)

// // delete  /calendar                   calendarSlice   calendarDelete   list of users calendar items in date range

export const calendarDeleteAttendee = createAsyncThunk(
    'calendarDeleteAttendees',
    async ({ item_id, attendee }, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken
        const endPoint = `${apiUrl}/calendar/attendees?item_id=${item_id}&attendee=${attendee}`
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

export const calendarUpdateAttendee = createAsyncThunk(
    'calendarUpdateAttendee',
    async ({ item_id, attendees}, { rejectWithValue, getState }) => {

        const endPoint = `${apiUrl}/calendar/attendees`
        //console.log (endPoint)
        const authToken = getState().user.authentication.authToken
        const options = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer ' + authToken,

            },
            body:JSON.stringify({
                item_id,
                attendees
            })
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
                .addMatcher(
                    isAnyOf(
                        calendarFetch.fulfilled,   
                        calendarPost.fulfilled,  
                        calendarDelete.fulfilled,
                        calendarPostAttendee.fulfilled,
                        calendarDeleteAttendee.fulfilled,
                        calendarUpdateAttendee.fulfilled
                    ),
                    (state, action) => {
                        //console.log(action.payload)
                        state.calendarItems = action.payload
                        state.isLoading = false;
                        state.hasError = null;
                    }) 
                .addMatcher(
                    isAnyOf(
                        calendarFetch.pending,   
                        calendarPost.pending,  
                        calendarDelete.pending,
                        calendarPostAttendee.pending,
                        calendarDeleteAttendee.pending,
                        calendarUpdateAttendee.pending
                        ),
                    (state) => {
                        state.isLoading = true;
                        state.hasError = null;
                    }
                )
                .addMatcher(
                    isAnyOf(
                        calendarFetch.rejected,   
                        calendarPost.rejected,  
                        calendarDelete.rejected,
                        calendarPostAttendee.rejected,
                        calendarDeleteAttendee.rejected,
                        calendarUpdateAttendee.rejected
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

export const isLoadingCalendar = (state) => state.calendar.isLoading;
export const hasErrorCalendar = (state) => state.calendar.hasError;
export const selectCalendar = (state) => state.calendar.calendarItems;


export default calendarSlice.reducer