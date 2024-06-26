import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../utils/apiFetch';

const apiUrl = process.env.REACT_APP_API_URL// actual api path is stored in .env.client

const initialState = {
    calendarItems: [],
    isLoading: true,
    hasError: null,
  };

const name = "today"
// // get     /today                       todaySlice       today      list of user details (display name, email, phone number)

export const todayFetch = createAsyncThunk(
    'todayFetch',
    async (_, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken
        const endPoint = `${apiUrl}/today`
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




export const todaySlice = createSlice({
    name,
    initialState,
    reducers: {
        reset:()=>{
            return initialState;
        }},
    extraReducers:
        (builder) => {
            builder
                .addMatcher(isAnyOf(
                    todayFetch.fulfilled,
                    ),
                    (state, action) => {
                        //console.log(action.payload)
                        state.calendarItems = action.payload
                        state.isLoading = false;
                        state.hasError = null;
                    }) 
  
                .addMatcher(
                    isAnyOf(
                        todayFetch.pending,
                        ),
                    (state) => {
                        state.isLoading = true;
                        state.hasError = null;
                    }
                )
                .addMatcher(
                    isAnyOf(
                        todayFetch.rejected,
                    ),
                    (state, action) => {
                        //console.log(action)
                        state.isLoading = false;
                        //state.hasError = JSON.stringify({error:action.error,actionType:action.type});
                        let temp = action.payload?.message||action.error.message
                        if (typeof(temp)==='object'){
                            temp = JSON.stringify(temp)
                        }
                        console.log(temp)
                        state.hasError=temp
                    }
                )
        }
})



/* export const selectedTodayId = (state) => state.today.today_id; */
export const isLoadingToday = (state) => state.today.isLoading;
export const hasErrorToday = (state) => state.today.hasError;
export const selectToday = (state) => state.today.calendarItems

export const {reset} = todaySlice.actions
export default todaySlice.reducer