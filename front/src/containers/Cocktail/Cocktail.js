import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {FetchSoloCocktailRequest} from "../../store/actions/cocktailsActions";
import {useParams} from "react-router";

const Cocktail = (props) => {
    const dispatch = useDispatch();
    const cocktail = useSelector((state) => state.cocktails.cocktail);
    const params = useParams(); // не работает

    useEffect(() => {
        console.log(params);
        dispatch(FetchSoloCocktailRequest(params.id));
    }, [params, dispatch]);

    return (
        <div className="CocktailCard">
            <img src={'http://localhost:8001/' + cocktail.image} alt=""/>
            <h3>{cocktail.title}</h3>
            <>{cocktail.published && cocktail.published === "false" ? <p>Не опубликован</p> : <p>Опубликован</p>}</>
        </div>
    );
};

export default Cocktail;