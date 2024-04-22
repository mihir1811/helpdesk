import { ADD_MESSAGES } from "../action";

const intialState = {
  chatInfo: {
    messages:[]
  },
};

export const chatInfo = (state = intialState.chatInfo, action) => {
  switch (action.type) {
    case ADD_MESSAGES:
// const data = [...intialState.chatInfo.mesages, action.payload]

console.log(action.payload , "SZEtdgfdtgfhgf" ,state)

       return {
        ...state,
        messages: [action.payload],
      };;

    default:
      return state;
  }
};
