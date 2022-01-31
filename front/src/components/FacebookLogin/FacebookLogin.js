import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {useDispatch} from "react-redux";
import './FacebookLogin.css'
import {facebookAppId} from "../../config";
import {facebookLoginRequest} from "../../store/actions/usersAction";

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const facebookResponse = response => {
        if (response.id) {
            dispatch(facebookLoginRequest(response));
        }
    };


    return <FacebookLoginButton
        appId={facebookAppId}
        fields="name,email,picture"
        render={renderProps => (
            <button className='facebook' onClick={renderProps.onClick}>Enter with Facebook</button>
        )}
        callback={facebookResponse}
    />
};

export default FacebookLogin;