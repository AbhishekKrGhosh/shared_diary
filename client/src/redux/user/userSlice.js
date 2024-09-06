import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  accountName: null,
  theme: null,
  color: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
        state.loading = true;
      },
      signInSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = false;
      },
      signInFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    updateAccountName: (state, action) => {
        state.accountName = action.payload.accountName
    },
    updateAccountInfo: (state, action) => {
        state.accountName = action.payload.accountName,
        state.currentUser = action.payload.mail
    },
    updateAccountDetails: (state, action) => {
        state.color = action.payload.color,
        state.theme = action.payload.theme
    },
    updateAccountColor: (state,action)=>{
        state.color = action.payload.color
    },
    signOut: (state)=>{
        state.currentUser = null
        state.accountName = null
        state.loading = false
        state.error = false
    }
  },
});

export const {
    signInStart,
  signInSuccess,
  signInFailure,
  updateAccountName,
  updateAccountInfo,
  updateAccountDetails,
  updateAccountColor,
  signOut
} = userSlice.actions;
export default userSlice.reducer;
