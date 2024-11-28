import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import RootReducer from './reducers/RootReducer';
import { thunk } from 'redux-thunk'

const store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware(applyMiddleware(thunk))
})

export default store