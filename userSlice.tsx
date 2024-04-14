// Import the createSlice API from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// This is the initial state of the slice
const initialState = {
  auth: {},
};

export const userSlice = createSlice({
  name: "balance", // This is the name of the slice, we will later use this name to access the slice from the store
  initialState: initialState, // This is the initial state of the slice
  reducers: {
    // All the reducers go here
    setUser: (state, action) => {
      console.log("action---------", action);

      // This is the reducer function for the deposit action
      return { ...state, auth: action.payload };
    },
    // withdraw: (state, action) => {
    //   // This is the reducer function for the withdraw action
    //   state.value -= action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

// We export the reducer function so that it can be added to the store
export default userSlice.reducer;
