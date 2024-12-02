import { createSlice } from "@reduxjs/toolkit";


const createAuthSlice =(sliceName)=>{
    const initialState ={
        [sliceName]:localStorage.getItem(sliceName)?
        JSON.parse(localStorage.getItem(sliceName)):null
    }

    return createSlice({
        name:sliceName,
        initialState,
        reducers:{
            setCredentials:(state, action)=>{
                state[sliceName] = action.payload;
                localStorage.setItem(sliceName, JSON.stringify(action.payload))
            },
            logout:(state)=>{
                state[sliceName] = null;
                localStorage.removeItem(sliceName)
                
            }
        }

    })
}

const adminAuthSlice = createAuthSlice("adminInfo")
const userAuthSlice = createAuthSlice("userInfo")
const tutorAuthSlice = createAuthSlice("tutorInfo")

export const {setCredentials:setAdminCredentials, logout:adminLogout} = adminAuthSlice.actions
export const{setCredentials:setUserCredentials, logout:userLogout} =userAuthSlice.actions
export const{setCredentials:setTutorCredentials, logout:tutorLogout} = tutorAuthSlice.actions

export const adminAuthReducer = adminAuthSlice.reducer;
export const userAuthReducer = userAuthSlice.reducer
export const tutorAuthReducer = tutorAuthSlice.reducer;
