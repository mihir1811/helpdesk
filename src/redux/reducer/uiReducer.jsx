import {
  HANDLE_SCREEN,
  IS_LOADING,
  IS_SIDEBAR_SMALL,
  SELECTED_TAB,
} from "../action";
import { store } from "../store";

const intialState = {
  isLoading: false,
  isSideBarSmall: false,
  selectedTab: "Dashboard",
  screenSize: {
    height: window.innerHeight,
    width: window.innerWidth,
  },
  userProfileData:{
    
  }
};

export const isLoading = (state = intialState.isLoading, action) => {
  switch (action.type) {
    case IS_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export const isSideBarSmall = (state = intialState.isSideBarSmall, action) => {
  switch (action.type) {
    case IS_SIDEBAR_SMALL:
      return action.payload;
    default:
      return state;
  }
};

export const selectedTab = (state = intialState.selectedTab, action) => {
  switch (action.type) {
    case SELECTED_TAB:
      return action.payload;
    default:
      return state;
  }
};

export const screenSize = (state = intialState.screenSize, action) => {
  switch (action.type) {
    case HANDLE_SCREEN:
      return {
        ...state,
        height: action.payload.height,
        width: action.payload.width,
      };
    default:
      return state;
  }
};

export const handleScreen = () => {
  return {
    type: HANDLE_SCREEN,
    payload: {
      height: window.innerHeight,
      width: window.innerWidth,
    },
  };
};

// Add event listener to update screen size when the window is resized
window.addEventListener("resize", () => {
  store.dispatch(handleScreen());
});
