import { RootState } from "../store";

// get whole auth state
export const authSelector = (state: RootState) => state.auth;
export const todoSelector = (state: RootState) => state.todo;
export const removeSelector = (state: RootState) => state.todo;