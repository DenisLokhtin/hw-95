import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createEvent} from "../../store/actions/actions";
import './NewCocktail.css'

const NewCocktail = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    const userCheck = () => {
        if (user !== null) {
            return user.username;
        } else {
            return ''
        }
    };

    const [data, setData] = useState({
        title: '',
        image: null,
        recipe: '',
        ingredients: [{
            title: '',
            amount: '',
        }],
        author: userCheck(),
    });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createEvent(data));
    };

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setData(prevState => {
            return {...prevState, [name]: value};
        }); 
    };

    const setIngredient = e => {
        const name = e.target.name;
        const value = e.target.value;
        const id = e.target.id;
        setData(prevState => {
            const target = prevState.ingredients[id];
            target[name] = value;
            prevState.ingredients[id] = target;
            const newIngredients = [...prevState.ingredients];
            return {...prevState, ingredients: newIngredients};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setData(prevState => {
            return {...prevState, [name]: file};
        });
    };

    const printIngredient = () => {
        if (data.ingredients.length > 0) {
            return data.ingredients.map((value, index, array) => {
                return (
                    <p key={index}>
                        <input id={index} onChange={setIngredient} name="title" type="text" placeholder="ingredient name"/>
                        <input id={index} onChange={setIngredient} name="amount" type="text" placeholder="amount"/>
                    </p>
                )
            })
        }
    };

    const addIngredient = (e) => {
        e.preventDefault();
        setData(prevState => {
            const ingredients = prevState.ingredients;
            ingredients.push({
                title: '',
                amount: '',
            });
            return {
                ...prevState, ingredients: ingredients
            };
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <p>
                <input onChange={inputChangeHandler} name="title" type="text" placeholder="title"/>
            </p>
            <p>
                <textarea onChange={inputChangeHandler} name="recipe" id="" cols="50" rows="5" placeholder="recipe"/>
            </p>
            <div className="ingredients">
                {printIngredient()}
                <button onClick={addIngredient}>Add ingredient</button>
            </div>
            <p>
                <input name="image" onChange={fileChangeHandler} type="file"/>
            </p>
            <button>Create</button>
        </form>
    )
};

export default NewCocktail;