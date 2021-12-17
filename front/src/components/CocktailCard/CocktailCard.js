import React from 'react';
import './CocktailCard.css'
import {useDispatch, useSelector} from "react-redux";

const CocktailCard = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const cocktails = useSelector(state => state.reducer.cocktails);

    const onPublish = () => {

    };

    const publishedCheck = () => {
        if (cocktails[props.index].published) {
            return (
                <div className='edit'>
                    <span>read</span>
                </div>
            )
        } else if (!cocktails[props.index].published && user.displayName === cocktails[props.index].author) {
            return (
                <h3>На рассмотрении у модератора</h3>
            )
        } else if (user.role === 'admin') {
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