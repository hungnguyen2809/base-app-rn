import { RootState } from '@/app/store';

export const selectKeyboardState = (state: RootState) => state.common.keyboardState;
