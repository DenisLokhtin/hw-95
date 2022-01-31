import {Route, Routes} from "react-router-dom";
import Main from "./containers/Main/Main";
import MyCocktails from "./containers/MyCocktails/MyCocktails";
import NewCocktail from "./containers/NewCocktail/NewCocktail";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import React from "react";
import './App.css'
import Cocktail from "./containers/Cocktail/Cocktail";

const App = () => {
    return (
        <div>
            <Toolbar/>
            <div className="container">
                <div className="container-inner">
                    <Routes>
                        <Route path="/" exact element={<Main/>}/>
                        <Route path="/cocktail/:id" exact element={<Cocktail/>}/>
                        <Route path="/newCocktail" exact element={<NewCocktail/>}/>
                        <Route path="/MyCocktails" exact element={<MyCocktails/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
};

export default App;