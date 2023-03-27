import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase/FirebaseUtils";

const initialData = {
  token: localStorage.getItem("token"),
};
export const loginSlice = createSlice({
  name: "login",
  initialState: initialData,
  reducers: {
    userLogin: (state, action) => {
      const token = action.payload;
      state.token = action.payload;
      localStorage.setItem("token", token);
    },
    userLogout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      auth.signOut();
    },
  },
});
export const { userLogin, userLogout } = loginSlice.actions;
export default loginSlice.reducer;
