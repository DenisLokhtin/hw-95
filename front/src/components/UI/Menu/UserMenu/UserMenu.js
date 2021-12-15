import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../../../store/actions/usersAction";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();

    return (
        <div>
            Hello, <b>{user.username}</b>! <Link to="/products/new" className="link">Add new post</Link> or <span onClick={() => dispatch(logoutUser())} className="link">Logout</span>
        </div>
    );
};

export default UserMenu;