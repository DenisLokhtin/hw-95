import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCocktailsRequest} from "../../store/actions/actions";
import './Main.css'
import CocktailCard from "../CocktailCard/CocktailCard";
import {Link} from "react-router-dom";


const Main = (props) => {
    const dispatch = useDispatch();
    const cocktails = useSelector(state => state.reducer.cocktails);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchCocktailsRequest())
    }, [dispatch]);

    const printCocktails = () => {
        if (cocktails) {
            return cocktails.map(cocktails => {
                return (
                    <CocktailCard
                        key={cocktails._id}
                        title={cocktails.title}
                        text={cocktails.text}
                        date={cocktails.date}
                        duration={cocktails.duration}
                        author={cocktails.author}
                    />
                )
            })
        }
    };

    return (
        <div>
            <div className="main-header">
                <h2>Cocktails list</h2>
                <Link to='/newCocktail' className="newCocktails">New cocktail</Link>
            </div>
            <div className="cards">
                <CocktailCard/>
                <CocktailCard/>
                <CocktailCard/>
                <CocktailCard/>
                <CocktailCard/>
                {printCocktails()}
            </div>
        </div>
    )
};

export default Main;