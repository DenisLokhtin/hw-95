import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import CocktailCard from "../CocktailCard/CocktailCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchCocktailsRequest} from "../../store/actions/actions";

const MyCocktails = (props) => {
    const dispatch = useDispatch();
    const cocktails = useSelector(state => state.reducer.cocktails);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        if (user) {
            dispatch(fetchCocktailsRequest())
        }
    }, [dispatch]);

    const printCocktails = () => {
        return cocktails.map((cocktails, index) => {
            if (cocktails && cocktails.author === user.displayName) {
                return (
                    <CocktailCard
                        key={cocktails._id}
                        image={cocktails.image}
                        title={cocktails.title}
                        index={index}
                        published={cocktails.published}
                    />
                )
            }
        })
    };

    return (
        <div>
            <div className="main-header">
                <h2>My Cocktails list</h2>
                <Link to='/newCocktail' className="newCocktails">New cocktail</Link>
            </div>
            <div className="cards">
                {printCocktails()}
            </div>
        </div>
    )
};

export default MyCocktails;