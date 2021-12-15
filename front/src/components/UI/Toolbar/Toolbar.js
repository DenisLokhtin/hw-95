import React from 'react';
import UserMenu from "../Menu/UserMenu/UserMenu";
import AnonymousMenu from "../Menu/AnonymousMenu/AnonymousMenu";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import './Toolbar.css'

const Toolbar = () => {
    const user = useSelector(state => state.users.user);

    const menu = () => {
        if (user !== null) {
            return  <UserMenu user={user}/>
        } else {
            return <AnonymousMenu/>
        }
    }

    return (
        <div className="border">
            <div className="toolbar">
                <div className="header">
                    <Link to="/">Events</Link>
                </div>
                <div>
                    {menu()}
                </div>
            </div>
        </div>
    );
};

export default Toolbar;