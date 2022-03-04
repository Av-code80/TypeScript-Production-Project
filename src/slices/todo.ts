import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import call from "../gate";

interface InitialState {
  todos?: {
    completed: boolean;
    _id: string;
    description: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  error?: SerializedError;
  loading?: boolean;
}

interface AddTodoResponse {
  success: boolean;
  data: {
    completed: boolean;
    _id: string;
    description: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
}

export const addTaskAction = createAsyncThunk<
  AddTodoResponse,
  {
    description: string;
  }
>("todo/add", async (data): Promise<AddTodoResponse> => {
  try {
    const { description } = data;
    console.log(description, "description**");

    const res = await call("post", "/task", { description });
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
});

// getAllTaskAction
export const getAllTaskAction = createAsyncThunk<AddTodoResponse>(
  "all/task",
  async (data): Promise<AddTodoResponse> => {
    try {
      const res = call("get", "/task", {});
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

// deleteTaskAction
export const deleteTaskAction = createAsyncThunk<AddTodoResponse>(
  "delete/task",
  async (data): Promise<AddTodoResponse> => {
    try {
      const res = call("delete", `/task/${_id}`, {});
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

const initialState: InitialState = {
  todos: [],
  error: undefined,
  loading: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTaskAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addTaskAction.fulfilled, (state, action) => {
      // state.todos = action.payload.data;
      state.error = undefined;
      state.loading = false;
    });
    builder.addCase(addTaskAction.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    // getAllTaskAction
    builder.addCase(getAllTaskAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllTaskAction.fulfilled, (state, action) => {
      state.todos = action.payload.data;
      state.error = undefined;
      state.loading = false;
    });
    builder.addCase(getAllTaskAction.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    // deleteTaskAction
  },
});
