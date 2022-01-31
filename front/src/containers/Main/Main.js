import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FetchCocktailsRequest} from "../../store/actions/cocktailsActions";
import './Main.css'
import CocktailCard from "../../components/CocktailCard/CocktailCard";
import {Link} from "react-router-dom";


const Main = (props) => {
    const dispatch = useDispatch();
    const cocktails = useSelector(state => state.cocktails.cocktails);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(FetchCocktailsRequest())
    }, [dispatch]);

    const printCocktails = () => {
        return cocktails.map((cocktails, index) => {
            if (cocktails.published === 'true' || user.role === 'admin') {
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
            } else return null
        })
    };

    return (
        <div>
            <div className="main-header">
                <h2>Cocktails list</h2>
                {user ?
                    <div>
                        <Link to='/MyCocktails' className="newCocktails">My cocktails</Link>
                        <Link style={{marginLeft: '30px'}} to='/newCocktail' className="newCocktails">New cocktail</Link>
                    </div>
                    : null
                }
            </div>
            <div className="cards">
                {printCocktails()}
            </div>
        </div>
    )
};

export default Main;