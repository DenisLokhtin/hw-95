import {SET_EVENTS} from "../actions/actions";

const initialState = {
  events: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      console.log('set')
      return {...state, events: action.payload};
    default:
      return state;
  }
};

export default reducer;