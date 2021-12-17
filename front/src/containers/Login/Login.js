import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {loginUser} from "../../store/actions/usersAction";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";
import './Login.css';

const Login = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();
    };

    return (
        <div>
            <form onSubmit={submitFormHandler} className="authorization">
                <h2>Login</h2>
                <input name="email" value={user.email} onChange={e => (inputChangeHandler(e))} type="text" placeholder="email" autoComplete="on"/>
                <input name="password" value={user.password} onChange={e => (inputChangeHandler(e))} type="password" placeholder="Password" autoComplete="on"/>
                <FacebookLogin classname="facebook"/>
                <button onClick={() => dispatch(loginUser({...user}))} className="send">Send</button>
            </form>
        </div>
    );
};

export default Login;