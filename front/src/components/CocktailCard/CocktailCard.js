import React from 'react';
import './CocktailCard.css'
import {useSelector} from "react-redux";

const CocktailCard = (props) => {
    const user = useSelector(state => state.users.user);
    const cocktails = useSelector(state => state.reducer.cocktails);


    const userCheck = () => {
        if (user !== null) {
            return user.username;
        } else {
            return ''
        }
    };

    const publishedCheck = () => {
        if (cocktails[props.index]) {
            return (
                <div className='edit'>
                    <span>read</span> or <span>delete</span>
                </div>
            )
        } else {
            return (
                <div className='edit'>
                    <span>publish</span> or <span>delete</span>
                </div>
            )
        }
    };

    return (
        <div className="CocktailCard">
            <img src={'http://localhost:8001/' + props.image} alt=""/>
            <h3>{props.title}</h3>
            {publishedCheck()}
        </div>
    );
};

export default CocktailCard;