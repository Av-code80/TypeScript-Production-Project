import { RootState } from "../store";

// get whole auth state
export const authSelector = (state: RootState) => state.auth;