import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;
export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
    const response = await axios.get(baseUrl + `auth/user/${userId}`);
    return response.data;
});



const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload;
        },
        clearUser: (state) => {
            state.userInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
          })
          .addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
});


export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
