import commonReducer from '@/redux/common/reducer';
import { combineReducers } from '@reduxjs/toolkit';

const createRootReducer = () => {
  return combineReducers({
    common: commonReducer,
  });
};

export default createRootReducer;
