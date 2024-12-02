import {configureStore} from  "@reduxjs/toolkit"
import { adminAuthReducer, userAuthReducer, tutorAuthReducer } from "../features/authSlice"


export const store = configureStore({
    reducer:{
        admin:adminAuthReducer,
        user:userAuthReducer,
        tutor:tutorAuthReducer

    }
})
export default store;