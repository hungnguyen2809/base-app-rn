import { createReducer } from '@reduxjs/toolkit';
import { actionCommonKeyboard } from './actions';

interface CommonState {
  keyboardState: KeyboardState;
}

const initState: CommonState = {
  keyboardState: { open: false, height: 0 },
};

const commonReducer = createReducer(initState, (builder) => {
  builder.addCase(actionCommonKeyboard, (state, action) => {
    state.keyboardState.open = action.payload.open;
    state.keyboardState.height = action.payload.height;
  });
});

export default commonReducer;
