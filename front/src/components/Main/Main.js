import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCocktailsRequest, fetchCocktailsSuccess} from "../../store/actions/actions";
import './Main.css'
import CocktailCard from "../CocktailCard/CocktailCard";
import {Link} from "react-router-dom";


const Main = (props) => {
    const dispatch = useDispatch();
    const cocktails = useSelector(state => state.reducer.cocktails);

    useEffect(() => {
        dispatch(fetchCocktailsRequest())
    }, [dispatch]);

    const printCocktails = () => {
        if (cocktails) {
            return cocktails.map(cocktails => {
                return (
                    <CocktailCard
                        key={cocktails._id}
                        image={cocktails.image}
                        title={cocktails.title}
                    />
                )
            })
        }
    };

    return (
        <div>
            <div className="main-header">
                <h2>Cocktails list</h2>
                <Link to='/MyCocktails' className="newCocktails">My cocktails</Link>
                <Link to='/newCocktail' className="newCocktails">New cocktail</Link>
            </div>
            <div className="cards">
                {printCocktails()}
            </div>
        </div>
    )
};

export default Main;