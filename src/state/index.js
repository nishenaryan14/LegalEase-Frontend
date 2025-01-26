import { configureStore, createSlice } from "@reduxjs/toolkit";

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    token: null,
    licenseVerified: false,
    email: "",
    name: "",
    phone: "",
    license: "",
    userId: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { token, licenseVerified, email, name, phone, license, userId } =
        action.payload;
      state.isAuthenticated = true;
      state.token = token;
      state.licenseVerified = licenseVerified;
      state.email = email;
      state.name = name;
      state.phone = phone;
      state.license = license;
      state.userId = userId;
    },
    logout: (state) => {
      // Reset user state on logout
      state.isAuthenticated = false;
      state.token = null;
      state.licenseVerified = false;
      state.email = "";
      state.name = "";
      state.phone = "";
      state.license = "";
      state.userId = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

// Configure store
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
