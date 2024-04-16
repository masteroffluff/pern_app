import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import apiFetch from '../../../utils/apiFetch';
import { isTokenExpired } from '../../../utils/decodeJwtToken'
//import {fetchCartbyId} from  '../cart/cartSlice'

const apiUrl = process.env.REACT_APP_API_URL// actual api path is stored in .env.client
export const storageKey = 'authToken';


const initialState = {
    id: "",
    authToken: "",
    isLoggedIn: false,
    customer_id: null,
    userAlreadyExists: null,
}

const name = 'authentication'

export const userAuthLogin = createAsyncThunk(
    'userAuthLogin',
    async ({ username, password }, { rejectWithValue }) => {
        console.log(username)
        console.log(password)

        const endPoint = `${apiUrl}/login`;
        console.log(endPoint)
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ username, password }),
        }

        /*         const authToken =JSON.parse(await apiFetch(endPoint,options,(e)=> authToken.rejectWith=e))
                if (authToken.rejectWith) {return rejectWithValue(authToken.rejectWith)} */
        //dispatch(fetchCartbyUser(authToken.token))
        const authToken = await apiFetch(endPoint, options, rejectWithValue);
        return authToken
    }
)
// export const userAuthLogOut= createAsyncThunk(
//     'userAuthLogOut',
//     async (_,{rejectWithValue, getState}) => {
//         //console.log(username)
//         //console.log(password)
//         const authToken = getState().userAuth.authToken;
//         const endPoint = `${apiUrl}/logout`; 
//         const options = {
//             method:'GET',
//             credentials: 'include',
//             headers:{
//                 "Content-Type":"application/json; charset=utf-8",
//                 'Authorization':'Bearer ' + authToken,

//             }}


//         return await apiFetch(endPoint,options,rejectWithValue)
//     }
// )
export const userAuthCheckExists = createAsyncThunk(
    // checking the user doesnt already exist
    'userAuthCheckExists',
    async (email, { rejectWithValue }) => {
        //console.log(username)
        //console.log(password)
        const encoded_email = encodeURI(email)
        const endPoint = `${apiUrl}/usercheck?email=${encoded_email}`;
        const options = {
            method: 'GET',
        }
        return await apiFetch(endPoint, options, rejectWithValue)
    }
)

export const userAuthRegister = createAsyncThunk(
    'userAuthRegister',
    async ({ userdata }, { rejectWithValue }) => {
        console.log(userdata)
        const endPoint = `${apiUrl}/register`;
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userdata),
        }
        return await apiFetch(endPoint, options, rejectWithValue);

    }
)

export const userAuthRegister_github = createAsyncThunk(
    'userAuthRegister_github',
    async ({ userdata }, { rejectWithValue }) => {
        console.log("userAuthRegister_github")
        const endPoint = `${apiUrl}/auth/github/register`;
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userdata),
        }

        return await apiFetch(endPoint, options, rejectWithValue);

    }
)


export const userAuthSlice = createSlice({
    name,
    initialState,
    reducers: {
        userAuthCheck: (state) => {
            // 1. Retrieve the token from localStorage
            //console.log('auth check reducer')
            const token = localStorage.getItem(storageKey);
            // 2. Check if the token exists
            if (token) {
                // 3. Check if token is expired
                if (!isTokenExpired(token)) {
                    //console.log('auth check logged in!')
                    state.authToken = token
                    state.isLoggedIn = true

                } else {
                    //console.log('auth check old token')
                    //console.log(token)
                    state.authToken = ""
                    state.isLoggedIn = false
                    localStorage.removeItem(storageKey); // as well as not logging in remove the out of date token           
                }
            } else {
                //console.log('auth check, no token')
                state.authToken = ""
                state.isLoggedIn = false
            }
        },
        userLogOut: (state) => {
            console.log(state)
            localStorage.removeItem(storageKey);
            return initialState;



        }
    },
    extraReducers:
        (builder) => {
            builder
                // handle the general user calls 
                .addCase(userAuthLogin.fulfilled,
                    (state, action) => {
                        const { token } = action.payload
                        localStorage.setItem(storageKey, token);

                        state.authToken = token;
                        state.isLoggedIn = true
                        state.isLoading = false;
                        state.hasError = null;
                    })
                // .addCase(userAuthLogOut.fulfilled,
                //     (state)=>{
                //         state.authToken=""
                //         state.isLoggedIn=false
                //         localStorage.removeItem(storageKey);
                //         state.isLoading = false;
                //         state.hasError = null;
                //     })
                .addCase(userAuthCheckExists.fulfilled,
                    (state, action) => {
                        state.userAlreadyExists = action.payload.exists
                        state.isLoading = false;
                        state.hasError = null;
                    }
                )
                .addCase(userAuthRegister.fulfilled,
                    (state, action) => {
                        const { token } = action.payload
                        localStorage.setItem(storageKey, token);

                        state.authToken = token;
                        state.isLoggedIn = true
                        state.isLoading = false;
                        state.hasError = null;
                    })
                .addCase(userAuthRegister_github.fulfilled,
                    (state, action) => {
                        const { token } = action.payload
                        localStorage.setItem(storageKey, token);

                        state.authToken = token;
                        state.isLoggedIn = true
                        state.isLoading = false;
                        state.hasError = null;
                    })

                .addMatcher(
                    isAnyOf(
                        userAuthLogin.pending,
                        //userAuthLogOut.pending,
                        userAuthCheckExists.pending,
                        userAuthRegister.pending,
                        userAuthRegister_github.pending
                    ),
                    (state) => {
                        state.isLoading = true;
                        state.hasError = null;
                    }
                )
                .addMatcher(
                    isAnyOf(userAuthLogin.rejected,
                        //userAuthLogOut.rejected,
                        userAuthCheckExists.rejected,
                        userAuthRegister.rejected,
                        userAuthRegister_github.rejected
                    ),
                    (state, action) => {
                        //console.log(action)
                        state.isLoading = false;
                        //state.hasError = JSON.stringify({error:action.error,actionType:action.type});
                        state.hasError = action.error
                    }
                )
        }
})
export const { userAuthCheck, userLogOut } = userAuthSlice.actions

export const selectIsLoggedIn = (state) => state.user.authentication.isLoggedIn;
export const selectAuthToken = (state) => state.user.authentication.authToken;
export const selectUserAlreadyExists = (state) => state.user.authentication.userAlreadyExists;
export const selectIsWaitingAuth = (state) => state.user.authentication.isLoading;
export const selectHasErrorAuth = (state) => state.user.authentication.hasError;


export default userAuthSlice.reducer