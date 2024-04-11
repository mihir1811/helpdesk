import { USER_INFO, USER_LOGOUT } from "../action";

const intialState = {
  userInfo: {},
};

export const userInfo = (state = intialState.userInfo, action) => {
  switch (action.type) {
    case USER_INFO:
      return action.payload;
    case USER_LOGOUT:
      localStorage.removeItem("authtoken");
      console.log("log out please");
      // persistor.purge(); // Clear persisted data
      // Optionally reset state to initial values
      return intialState.userInfo;
    default:
      return state;
  }
};
