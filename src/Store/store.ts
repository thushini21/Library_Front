import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from "./slice/AuthSlice.ts";


export const store = configureStore({
      reducer: {
          isAuth:AuthReducer
      }
  })

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =typeof store.dispatch;