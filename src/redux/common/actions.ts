import { createAction } from '@reduxjs/toolkit';

const PREFIX = 'common';

export const actionCommonKeyboard = createAction<KeyboardState>(`${PREFIX}/actionCommonKeyboard`);
