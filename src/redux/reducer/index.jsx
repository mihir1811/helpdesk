import { combineReducers } from "redux";
import {
  isLoading,
  isSideBarSmall,
  selectedTab,
  screenSize,
} from "./uiReducer";
import { userInfo } from "./authReducer";
import { chatInfo } from "./messageReducer";

const rootReducer = combineReducers({
  isLoading,
  isSideBarSmall,
  selectedTab,
  screenSize,
  userInfo,
  chatInfo
});

export default rootReducer;
