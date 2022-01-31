import React from 'react';
import './CocktailCard.css'
import {useDispatch, useSelector} from "react-redux";
import {DeleteCocktailsRequest, PublishedCocktailsRequest} from "../../store/actions/cocktailsActions";
import {Link} from "react-router-dom";

const CocktailCard = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    return (
        <div className="CocktailCard">
            <img src={'http://localhost:8001/' + props.image} alt=""/>
            <h3>{props.title}</h3>
            <Link to={`/cocktail/` + props.id}>read more >>></Link>
            <>{props.published && props.published === "false" ? <p>Не опубликован</p> : <p>Опубликован</p>}</>
            {user.role === "admin" && (
                <div style={{margin: "20px 0 20px 0"}}>
                    {props.published !== "true" && (
                        <button onClick={() => dispatch(PublishedCocktailsRequest(props.id))}>
                            To published
                        </button>
                    )}
                    <button onClick={() => dispatch(DeleteCocktailsRequest(props.id))}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default CocktailCard;