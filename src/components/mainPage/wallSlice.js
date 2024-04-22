import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../utils/apiFetch';

const apiUrl = process.env.REACT_APP_API_URL// actual api path is stored in .env.client

const initialState = {
    wallItems: [],
    isLoading: true,
    hasError: null,
};

const name = "wall"
// // get     /wall                       wallSlice       wall      list of user details (display name, email, phone number)

export const wallFetch = createAsyncThunk(
    'wallFetch',
    async (_, { rejectWithValue, getState }) => {
        const authToken = getState().user.authentication.authToken
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
    reducers: {
        reset: () => {
            return initialState;
        }
    },
    extraReducers:
        (builder) => {
            builder
                .addMatcher(isAnyOf(
                    wallFetch.fulfilled,
                ),
                    (state, action) => {
                        //console.log(action.payload)
                        state.wallItems = action.payload
                        state.isLoading = false;
                        state.hasError = null;
                    })

                .addMatcher(
                    isAnyOf(
                        wallFetch.pending,
                    ),
                    (state) => {
                        state.isLoading = true;
                        state.hasError = null;
                    }
                )
                .addMatcher(
                    isAnyOf(
                        wallFetch.rejected,
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


/* export const selectedWallId = (state) => state.wall.wall_id; */
export const isLoadingWall = (state) => state.wall.isLoading;
export const hasErrorWall = (state) => state.wall.hasError;
export const selectWall = (state) => state.wall.wallItems;

export const {reset} = wallSlice.actions
export default wallSlice.reducer