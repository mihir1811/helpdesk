import { combineReducers } from "redux";
import {
  isLoading,
  isSideBarSmall,
  selectedTab,
  screenSize,
} from "./uiReducer";
import { userInfo } from "./authReducer";

const rootReducer = combineReducers({
  isLoading,
  isSideBarSmall,
  selectedTab,
  screenSize,
  userInfo,
});

export default rootReducer;
