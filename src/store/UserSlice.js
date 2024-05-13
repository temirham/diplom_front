import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {IP4} from "./pref";



async function fetchJSON(url, options) {
    let response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`status code ${response.status}`);
    }
    return response.json();
}

export const addUser = createAsyncThunk(
    'users/addUser',
    async (newUser) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: newUser.username,
                password: newUser.password,
            })
        };
        console.log(newUser)
        const response = await fetch(`${IP4}profiles_api/v1/signup`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
)

export const getUserInfo = createAsyncThunk(
    'users/getUserInfo',
    async () => {
        try {
            const response = await axios.get(`${IP4}profiles_api/v1/user/info`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            return response.data.user_id;
        } catch (error) {
            throw new Error('Failed to fetch user info');
        }
    }
);


export const authUser = createAsyncThunk(
    'users/authUser',
    async (user) => {
        return await fetchJSON(
            `${IP4}profiles_api/v1/token/get`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password,
                })
            }
        )
    }
)



export const refreshUser = createAsyncThunk(
    'users/refreshUser',
    async () => {
        return await fetchJSON(
        `${IP4}profiles_api/v1/token/refresh`,
        {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    refresh: localStorage.getItem('refreshToken'),
                })
            }
        )
            // .then((data) => data.json())
    }
)

export const logoutUser = createAsyncThunk(
    'users/refreshUser',
    async () => {
        return await fetchJSON(
        `${IP4}profiles_api/v1/token/logout`,
        {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    refresh: localStorage.getItem('refreshToken'),
                })
            }
        )
            // .then((data) => data.json())
    }
)


export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        accessToken:"",
        refreshToken:"",
        userID: 0
    },
    reducers: {
        exit: (state, action) => {
            state.userID=0;
            localStorage.setItem('userID', '')
            state.accessToken="";
            localStorage.setItem('accessToken', '')
            state.refreshToken="";
            localStorage.setItem('refreshToken', '')
            localStorage.clear()
        },
        // updateUserID: (state, action) => {
        //     state.userID = action.payload;
        // },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        updateRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authUser.fulfilled, (state, action) => {
                state.accessToken=action.payload['access']
                state.refreshToken=action.payload['refresh']
                localStorage.setItem('accessToken', action.payload['access'])
                localStorage.setItem('refreshToken', action.payload['refresh'])
                
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.accessToken=action.payload['access']
                localStorage.setItem('accessToken', action.payload['access'])
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.userID = action.payload;
                localStorage.setItem('userID', action.payload)
                // console.log(state.userID)
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                console.error('Failed to fetch user info:', action.error.message);
            });
    }

})

export const {exit, updateAccessToken, updateRefreshToken,
}=userSlice.actions;
export default userSlice.reducer;