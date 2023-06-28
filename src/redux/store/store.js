import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../slices/users/usersSlice'
import productReducer from '../slices/products/productSlices'
import categoryReducer from '../slices/categories/categoriesSlice'
import brandReducer from '../slices/categories/brandsSlice'
import colorsReducer from '../slices/categories/colorsSlice'

// store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    colors: colorsReducer,
  },
})

export default store
