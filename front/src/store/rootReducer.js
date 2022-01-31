import {combineReducers} from "redux";
import usersSlice from "./slices/usersSlice";
import cocktailsSlice from "./slices/cocktailsSlice";

const rootReducer = combineReducers({
    users: usersSlice.reducer,
    cocktails: cocktailsSlice.reducer,
});

export default rootReducer;