import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {toast} from "react-toastify";
import usersSlice from "../slices/usersSlice";

export const {
    registerUser,
    registerUserSuccess,
    registerUserFailure,
    logoutUsers,
    loginUser,
    loginUserRequest
} = usersSlice.actions;


export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, payload: user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, payload: error});

export const facebookLogin = data => {
    return async dispatch => {
        try {
            const response = await axiosApi.post('/users/facebookLogin', data);
            dispatch(loginUserSuccess(response.data.user));
            dispatch(historyPush('/'));
            toast.success('Login successful');
        } catch (error) {
            toast.error(error.response.data.global);
            dispatch(loginUserFailure(error.response.data));
        }
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        await axiosApi.delete('/users/sessions');
        dispatch({type: LOGOUT_USER});
        dispatch(historyPush('/'));
        dispatch(logoutUsers())
    };
};