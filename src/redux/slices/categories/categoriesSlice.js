import axios from 'axios'
import baseURL from '../../../utils/baseURL'
const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit')

//initalsState
const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
}

//create category action
export const createCategoryAction = createAsyncThunk(
  'category/create',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name } = payload
      // make request
      // token -authenticate
      const token = getState()?.users?.useAuth?.userInfo?.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      // images

      const { data } = await axios.post(
        `${baseURL}/categories`,
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

//fetch categories action
export const fetchCategoriesAction = createAsyncThunk(
  'category/fetch All',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/categories`)
      return data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  }
)

// slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false
      state.category = action.payload
      state.isAdded = true
    })
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false
      state.category = null
      state.isAdded = false
      state.error = action.payload
    })

    // fetch all
    builder.addCase(fetchCategoriesAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false
      state.categories = action.payload
      state.isAdded = true
    })
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false
      state.categories = null
      state.isAdded = false
      state.error = action.payload
    })
  },
})

// generate the reducer
const categoryReducer = categorySlice.reducer

export default categoryReducer
