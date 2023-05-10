import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Roles } from '../../interface';

export interface UserState {
  username: string | null;
  loginstatus: boolean;
  role: Roles | null;
}

const initialState: UserState = {
  loginstatus: false,
  username: null,
  role: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.loginstatus = true;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.loginstatus = false;
      state.username = null;
      state.role = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
