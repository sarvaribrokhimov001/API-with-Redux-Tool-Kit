import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
});

const usersSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    Loading: false,
    Error: null,
  },
  reducers: [],

  extraReducers: (builder) => {
    (builder.addCase(fetchUsers.pending, (state) => {
      ((state.Loading = true), (state.Error = null));
    }),
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        ((state.Loading = false),
          (state.Error = null),
          (state.data = action.payload));
      }),
      builder.addCase(fetchUsers.rejected, (state, action) => {
        ((state.Loading = false), (state.Error = action.error.message));
      }));
  },
});
export default usersSlice.reducer