import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../utils/apiFetch';

const apiUrl = process.env.REACT_APP_API_URL// actual api path is stored in .env.client

const initialState =[]

const name = "wall"
// // get     /wall                       wallSlice       wall      list of user details (display name, email, phone number)

export const wallFetch = createAsyncThunk(
    'wallFetch',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/wall`
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




export const wallSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                .addMatcher(isAnyOf(
                    wallFetch.fulfilled,
                    ),
                    (state, action) => {
                        //console.log(action.payload)

                    })
  
                .addMatcher(
                    isAnyOf(
                        wallFetch.pending,
                        ),
                    (state) => {
                        state.isLoading = true;
                        state.hasError = false;
                    }
                )
                .addMatcher(
                    isAnyOf(
                        wallFetch.rejected,
                    ),
                    (state, action) => {
                        //console.log(action)
                        state.isLoading = false;
                        state.hasError = action.error;
                    }
                )
        }
})



/* export const selectedWallId = (state) => state.wall.wall_id; */
export const isLoadingWall = (state) => state.wall.isLoading;
export const hasErrorWall = (state) => state.wall.hasError;
export const selectedWall = (state) => state.wall;


export default wallSlice.reducer