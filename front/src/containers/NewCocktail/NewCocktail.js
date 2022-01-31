import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {PostCocktailsRequest} from "../../store/actions/cocktailsActions";
import './NewCocktail.css'

const NewCocktail = (props) => {
    const dispatch = useDispatch();

    const [data, setData] = useState({
        title: '',
        image: null,
        recipe: '',
        ingredients: [{
            title: '',
            amount: '',
            id: '',
        }],
    });

    const onSubmit = (e) => {
        e.preventDefault();
        let newData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            if (key !== 'ingredients') {
                newData.append(key, value);
            }
        }
        newData.append('ingredients', JSON.stringify(data.ingredients));
        dispatch(PostCocktailsRequest(newData));
        setData({
            title: '',
            image: null,
            recipe: '',
            ingredients: [{
                title: '',
                amount: '',
                id: '',
            }],
        });
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

    const deleteInput = (e) => {
        const id = e.target.id;
        setData(prevState => {
            const ingredients = prevState.ingredients;
            ingredients.splice(id, 1);
            return {
                ...prevState, ingredients: ingredients
            }
        });
    };

    const printIngredient = () => {
        if (data.ingredients.length > 0) {
            return data.ingredients.map((value, index, array) => {
                return (
                    <p key={index}>
                        <input id={index} value={value.title} onChange={setIngredient} name="title" type="text"
                               placeholder="ingredient name"/>
                        <input id={index} value={value.amount} onChange={setIngredient} name="amount" type="text"
                               placeholder="amount"/>
                        <button id={index} onClick={deleteInput}>delete</button>
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
        <div>
            <h2>Add cocktail</h2>
            <form onSubmit={onSubmit}>
                <p>
                    <input onChange={inputChangeHandler} value={data.title} name="title" type="text" placeholder="title"/>
                </p>
                <p>
                    <textarea onChange={inputChangeHandler} value={data.recipe} name="recipe" id="" cols="50" rows="5"
                              placeholder="recipe"/>
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
        </div>
    )
};

export default NewCocktail;