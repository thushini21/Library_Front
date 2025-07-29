import {createSlice} from "@reduxjs/toolkit";
interface AuthSlice {
    isAuth: boolean;
}


const initialState:AuthSlice = {
    isAuth:false
}

export const AuthSlice = createSlice({
    name : "AuthSlice",
    initialState,
    reducers:{
        login:(state) =>{
            state.isAuth = true
            localStorage.setItem("isAuth","true")
        },
        logOut:(state)=>{
            state.isAuth = false;
            localStorage.setItem("isAuth","false");
        }
    }
})

export default AuthSlice.reducer;
export const {login, logOut} = AuthSlice.actions;
