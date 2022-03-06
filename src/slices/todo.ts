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
  // data?: {};
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
interface deleteTodoResponse {
  succes: boolean;
  message?: string;
  data?: {};
}

export const addTaskAction = createAsyncThunk<
  AddTodoResponse,
  {
    description: string;
    dispatch: any;
  }
>("todo/add", async (data): Promise<AddTodoResponse> => {
  try {
    const { description, dispatch } = data;
    const res = await call("post", "/task", { description });
    dispatch(getAllTaskAction()); // get all item after adding new item
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
});

// getAllTaskAction
export const getAllTaskAction = createAsyncThunk<AddTodoResponse>(
  "all/task",
  async (): Promise<AddTodoResponse> => {
    try {
      const res = await call("get", "/task", {});
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

// deleteTaskAction
export const deleteTaskAction = createAsyncThunk<
  deleteTodoResponse,
  { _id: string; dispatch: any }
>("delete/task", async (data): Promise<deleteTodoResponse> => {
  try {
    const { _id, dispatch } = data;
    const res = await call("delete", `/task/${_id}`, { _id });
    dispatch(getAllTaskAction());
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
});

//updateTaskAction
export const updateTaskAction = createAsyncThunk<
  AddTodoResponse,
  { completed: boolean; _id: string; dispatch: any }
>("todo/put", async (data): Promise<AddTodoResponse> => {
  try {
    const { completed, _id, dispatch } = data;
    const res = await call("put", `/task/${_id}`, { completed });
    dispatch(getAllTaskAction());
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
});

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
    builder.addCase(deleteTaskAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTaskAction.fulfilled, (state, action) => {
      state.error = undefined;
      state.loading = false;
    });
    builder.addCase(deleteTaskAction.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    //updateTaskAction
    builder.addCase(updateTaskAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTaskAction.fulfilled, (state, action) => {
      state.error = undefined;
      state.loading = false;
    });
    builder.addCase(updateTaskAction.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});
