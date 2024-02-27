import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../utils/apiFetch';

const apiUrl = process.env.REACT_APP_API_URL// actual api path is stored in .env.client

const initialState =[]

const name = "today"
// // get     /today                       todaySlice       today      list of user details (display name, email, phone number)

export const todayFetch = createAsyncThunk(
    'todayFetch',
    async ({ authToken }, { rejectWithValue }) => {

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
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                .addMatcher(isAnyOf(
                    todayFetch.fulfilled,
                    ),
                    (state, action) => {
                        //console.log(action.payload)

                    })
  
                .addMatcher(
                    isAnyOf(
                        todayFetch.pending,
                        ),
                    (state) => {
                        state.isLoading = true;
                        state.hasError = false;
                    }
                )
                .addMatcher(
                    isAnyOf(
                        todayFetch.rejected,
                    ),
                    (state, action) => {
                        //console.log(action)
                        state.isLoading = false;
                        state.hasError = action.error;
                    }
                )
        }
})



/* export const selectedTodayId = (state) => state.today.today_id; */
export const isLoadingToday = (state) => state.today.isLoading;
export const hasErrorToday = (state) => state.today.hasError;
export const selectedToday = (state) => state.today;


export default todaySlice.reducer