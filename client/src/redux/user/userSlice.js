import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  accountName: null,
  theme: '/src/assets/images/fantasy.png',
  color: 'rgba(25, 25, 112, 0.5)',
  loading: false,
  error: false,
  flag: false,
  diaries: [], 
  editMode: false, 
  currentDiary: null 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggle: (state) => {
      state.flag = !state.flag;
    },
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
      state.accountName = action.payload.accountName;
    },
    updateAccountInfo: (state, action) => {
      state.accountName = action.payload.accountName;
      state.currentUser = action.payload.mail;
    },
    updateAccountDetails: (state, action) => {
      state.color = action.payload.color;
      state.theme = action.payload.theme;
    },
    updateAccountColor: (state, action) => {
      state.color = action.payload.color;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.accountName = null;
      state.loading = false;
      state.error = false;
    },
    setDiaries: (state, action) => {
      state.diaries = action.payload;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setCurrentDiary: (state, action) => {
      state.currentDiary = action.payload;
    },
    resetCurrentDiary: (state) => {
      state.currentDiary = null;
    }
  }
});

export const {
  toggle,
  signInStart,
  signInSuccess,
  signInFailure,
  updateAccountName,
  updateAccountInfo,
  updateAccountDetails,
  updateAccountColor,
  signOut,
  setDiaries,
  setEditMode,
  setCurrentDiary,
  resetCurrentDiary
} = userSlice.actions;
export default userSlice.reducer;
