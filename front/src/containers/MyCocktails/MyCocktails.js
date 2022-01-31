import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
import {useDispatch, useSelector} from "react-redux";
import {FetchMyCocktailsRequest} from "../../store/actions/cocktailsActions";

const MyCocktails = (props) => {
    const dispatch = useDispatch();
    const myCocktails = useSelector((state) => state.cocktails.myCocktails);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        if (user) {
            dispatch(FetchMyCocktailsRequest())
        }
    }, [dispatch]);

    const printCocktails = () => {
        return myCocktails.map((cocktails, index) => {
            if (cocktails) {
                return (
                    <CocktailCard
                        key={cocktails._id}
                        image={cocktails.image}
                        title={cocktails.title}
                        id={cocktails._id}
                        index={index}
                        author={cocktails.author}
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