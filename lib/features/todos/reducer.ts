import { createAction, createReducer } from "@reduxjs/toolkit";

interface UserState {
  g_user: any;
  g_isSession: any;
}

export const setUserData = createAction<any>("user/userData");
export const setIsSession = createAction<any>("user/isSession");

const initialState = {
  g_isSession: false,
  g_user: {},
} as UserState;

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUserData, (state, action) => {
      state.g_user = action.payload;
    })
    .addCase(setIsSession, (state, action) => {
      state.g_isSession = action.payload;
    });
});
