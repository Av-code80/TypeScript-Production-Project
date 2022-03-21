import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import call from "../gate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface AuthState {
  user?: {
    age: number;
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  token?: string;
  error?: SerializedError;
  loading?: boolean;
}

interface AuthResponse {
  token?: string;
  user?: {
    age: number;
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}
interface LogoutResponse {
  success: boolean;
}

export const loginAction = createAsyncThunk<
  AuthResponse,
  { email: string; password: string }
>("auth/login", async (data): Promise<AuthResponse> => {
  try {
    const { email, password } = data;
    const res = await call("post", "/user/login", { email, password });
    localStorage.setItem("localStorageAuth", JSON.stringify(res));
    toast.success("Welcom to your account 👋", {
      autoClose: 2000,
      delay: 500,
    });
    return res;
  } catch (error: any) {
    toast.error(
      "⚠️ Error in authuntification, please enter a valid email & password or subscribe"
    );
    throw new Error(error);
  }
});

export const registerAction = createAsyncThunk<
  AuthResponse,
  { name: string; email: string; password: string; age: number }
>("auth/register", async (data): Promise<AuthResponse> => {
  try {
    const { name, email, password, age } = data;
    const res = await call("post", "/user/register", {
      name,
      email,
      password,
      age: parseInt(age.toString()),
    });
    localStorage.setItem("localStorageAuth", JSON.stringify(res));
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
});

export const logoutAction = createAsyncThunk<AuthResponse, {}>(
  "auth/logout",
  async (): Promise<AuthResponse> => {
    try {
      const res = await call("post", "/user/logout", {});
      localStorage.removeItem("localStorageAuth");
      toast.success("Logout successfully 👋", {
        autoClose: 2000,
        delay: 500,
      });
      return res;
    } catch (error: any) {
      toast.error("Error in logout");
      throw new Error(error);
    }
  }
);

export const deleteAccountAction = createAsyncThunk<LogoutResponse, {}>(
  "auth/delete",
  async (): Promise<LogoutResponse> => {
    try {
      const res = await call("delete", "/user/me", {});
      localStorage.removeItem("localStorageAuth");
      toast.success("Your account is deleted successfully 👋", {
        autoClose: 1000,
        delay: 1000,
      });
      return res;
    } catch (error: any) {
      toast.error("Error in deleting account");
      throw new Error(error);
    }
  }
);

const initialState: AuthState = {
  error: undefined,
  user: localStorage.getItem("localStorageAuth")?.length
    ? JSON.parse(localStorage.getItem("localStorageAuth") || "")?.user
    : undefined,
  token: localStorage.getItem("localStorageAuth")?.length
    ? JSON.parse(localStorage.getItem("localStorageAuth") || "")?.token
    : undefined,

  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = undefined;
      state.loading = false;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    // Register
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = undefined;
      state.loading = false;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    // logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.user = undefined;
      state.token = undefined;
      state.error = undefined;
      state.loading = false;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    // deleteAccountAction => 1 builder
    builder.addCase(deleteAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteAccountAction.fulfilled, (state, action) => {
      state.user = undefined;
      state.token = undefined;
      state.error = undefined;
      state.loading = false;
    });
    builder.addCase(deleteAccountAction.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});
