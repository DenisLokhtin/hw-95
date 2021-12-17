import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {registerUser} from "../../store/actions/usersAction";
import '../Login/Login.css'

const Register = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email: '',
        displayName: '',
        password: '',
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(registerUser({...user}));
    };

    return (
        <div>
            <form onSubmit={submitFormHandler} className="authorization">
                <h2>Register</h2>
                <input name="email" value={user.email} onChange={e => (inputChangeHandler(e))} type="text" placeholder="email" autoComplete="on"/>
                <input name="displayName" value={user.displayName} onChange={e => (inputChangeHandler(e))} type="text" placeholder="display Name" autoComplete="on"/>
                <input name="password" value={user.password} onChange={e => (inputChangeHandler(e))} type="password" placeholder="Password" autoComplete="on"/>
                <button>Send</button>
            </form>
        </div>
    );
};

export default Register;