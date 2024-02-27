import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../utils/apiFetch';

const apiUrl = process.env.REACT_APP_API_URL// actual api path is stored in .env.client

const initialState ={
    todos: [],
    notes: [],
    isLoading:false,
    hasError:false
    }



const name = "item"
// // get     /items/note                 itemsSlice      itemsNoteFetch   list of notes in descending date order

export const itemsNoteFetch = createAsyncThunk(
    'itemsNoteFetch',
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
// // post    /items/note                 itemsSlice      itemsNoteAdd     list of notes in descending date order

export const itemsNoteAdd = createAsyncThunk(
    'itemsNoteAdd',
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
// // update  /items/note                 itemsSlice      itemsNoteUpdate  list of notes in descending date order

export const itemsNoteUpdate = createAsyncThunk(
    'itemsNoteUpdate',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/items/note`
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
// // delete  /items/note                 itemsSlice      itemsNoteDelete  list of notes in descending date order

export const itemsNoteDelete = createAsyncThunk(
    'itemsNoteDelete',
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
// // get     /items/todo                 itemsSlice      itemsTodoFetch   list of todos in descending date order
export const itemsTodoFetch = createAsyncThunk(
    'itemsTodoFetch',
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

// // post    /items/todo                 itemsSlice      itemsTodoAdd     list of todos in descending date order

export const itemsTodoAdd = createAsyncThunk(
    'itemsTodoAdd',
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

// // update  /items/todo                 itemsSlice      itemsTodoUpdate  list of todos in descending date order

export const itemsTodoUpdate = createAsyncThunk(
    'itemsTodoUpdate',
    async ({ authToken }, { rejectWithValue }) => {

        const endPoint = `${apiUrl}/items/note`
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
// // delete  /items/todo                 itemsSlice      itemsTodoDelete  list of todos in descending date order

export const itemsTodoDelete = createAsyncThunk(
    'itemsTodoDelete',
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





export const itemSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                .addMatcher(isAnyOf(
                    itemsNoteFetch.fulfilled,
                    itemsNoteAdd.fulfilled   ,
                    itemsNoteUpdate.fulfilled,
                    itemsNoteDelete.fulfilled),
                    (state, action) => {
                        //console.log(action.payload)

                    })
                .addMatcher(isAnyOf(
                    itemsTodoFetch.fulfilled ,
                    itemsTodoAdd.fulfilled   ,
                    itemsTodoUpdate.fulfilled,
                    itemsTodoDelete.fulfilled),
                    (state, action) => {
                        //console.log(action.payload)

                    })    
                .addMatcher(
                    isAnyOf(
                        itemsNoteFetch.pending,
                        itemsNoteAdd.pending   ,
                        itemsNoteUpdate.pending,
                        itemsNoteDelete.pending,
                        itemsTodoFetch.pending ,
                        itemsTodoAdd.pending   ,
                        itemsTodoUpdate.pending,
                        itemsTodoDelete.pending
                        ),
                    (state) => {
                        state.isLoading = true;
                        state.hasError = false;
                    }
                )
                .addMatcher(
                    isAnyOf(
                        itemsNoteFetch.rejected,
                        itemsNoteAdd.rejected   ,
                        itemsNoteUpdate.rejected,
                        itemsNoteDelete.rejected,
                        itemsTodoFetch.rejected ,
                        itemsTodoAdd.rejected   ,
                        itemsTodoUpdate.rejected,
                        itemsTodoDelete.rejected),
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


/* export const selectedItemsId = (state) => state.items.items_id; */
export const isLoadingItems = (state) => state.items.isLoading;
export const hasErrorItems = (state) => state.items.hasError;
export const selectedNotes = (state) => state.items.todos;
export const selectedTodos = (state) => state.items.notes;


export default itemSlice.reducer