import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@states/store';

interface UserState {
  user: any;
  isVegMode: boolean;
}

const initialState: UserState = {
  user: {},
  isVegMode: false,
};

export const userSlick = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, Action: PayloadAction<object>) => {
      state.user = Action.payload;
    },
    setVegMode: (state, Action: PayloadAction<boolean>) => {
      state.isVegMode = Action.payload;
    },
  },
});

export const {setUser, setVegMode} = userSlick.actions;

export const selectUser = (state: RootState) => state.user?.user;

export default userSlick.reducer;
