import axios from 'axios'
import baseURL from '../../../utils/baseURL'
const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit')

//initalsState
const initialState = {
  colors: [],
  color: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
}

//create color action
export const createColorAction = createAsyncThunk(
  'color/create',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name } = payload
      // token -authenticate
      const token = getState()?.users?.useAuth?.userInfo?.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      // images

      const { data } = await axios.post(
        `${baseURL}/colors`,
        {
          name,
        },
        config
      )
      return data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  }
)

//fetch colors action
export const fetchColorsAction = createAsyncThunk(
  'colors/fetch All',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/colors`)
      return data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  }
)

// slice
const colorsSlice = createSlice({
  name: 'brands',
  initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createColorAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.loading = false
      state.color = action.payload
      state.isAdded = true
    })
    builder.addCase(createColorAction.rejected, (state, action) => {
      state.loading = false
      state.color = null
      state.isAdded = false
      state.error = action.payload
    })

    // fetch all
    builder.addCase(fetchColorsAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
      state.loading = false
      state.colors = action.payload
      state.isAdded = true
    })
    builder.addCase(fetchColorsAction.rejected, (state, action) => {
      state.loading = false
      state.colors = null
      state.isAdded = false
      state.error = action.payload
    })
  },
})

// generate the reducer
const colorsReducer = colorsSlice.reducer

export default colorsReducer
