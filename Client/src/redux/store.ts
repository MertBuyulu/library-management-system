import { configureStore } from '@reduxjs/toolkit'
import logger from "redux-logger"
// reducers
import booksReducer from "./books/index"
import authorsReducer from "./authors/index"
import borrowersReducer from "./borrowers/index"
import finesReducer from "./fines/index"
import loansReducer from "./loans/index"

const rootReducer = {
    books: booksReducer,
    authors: authorsReducer,
    borrowers: borrowersReducer,
    fines: finesReducer,
    loans: loansReducer
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck : false,
        serializableCheck: false,
    }).concat(logger)

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store