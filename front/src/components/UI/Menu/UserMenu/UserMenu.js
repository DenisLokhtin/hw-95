import React from 'react';
import {useDispatch} from "react-redux";
import {logoutRequest} from "../../../../store/actions/usersAction";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();

    return (
        <div>
            Hello, <b>{user}</b>! <span onClick={() => dispatch(logoutRequest())} className="link">Logout</span>
        </div>
    );
};

export default UserMenu;