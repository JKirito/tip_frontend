import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState {
  username: string | null;
  loginstatus: boolean;
}

const initialState: UserState = {
  loginstatus: false,
  username: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.loginstatus = true;
      state.username = action.payload.username;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.loginstatus = false;
      state.username = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
