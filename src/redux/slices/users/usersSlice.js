import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import baseURL from '../../../utils/baseURL'
import { resetErrAction } from '../globalActions/globalActions'

// initial state
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  useAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
}

// register action
export const registerUserAction = createAsyncThunk(
  'users/register',
  async (
    { email, password, fullname },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      // make the http request
      const { data } = await axios.post(`${baseURL}/users/register`, {
        email,
        password,
        fullname,
      })

      return data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  }
)

// login action
export const loginUserAction = createAsyncThunk(
  'users/login',
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      // make the http request
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      })
      // save user into local storage
      localStorage.setItem('userInfo', JSON.stringify(data))
      return data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  }
)

// users slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    // handle actions
    // login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.useAuth.loading = true
    })
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.useAuth.userInfo = action.payload
      state.useAuth.loading = false
    })
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.useAuth.error = action.payload
      state.useAuth.loading = false
    })

    // register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.user = action.payload
      state.loading = false
    })
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    // reset error action
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null
    })
  },
})

// generate reducer
const usersReducer = userSlice.reducer

export default usersReducer
