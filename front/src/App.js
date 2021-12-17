import {Route, Routes} from "react-router-dom";
import Main from "./components/Main/Main";
import MyCocktails from "./components/MyCocktails/MyCocktails";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import NewCocktail from "./containers/NewCocktail/NewCocktail";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import React from "react";
import './App.css'

const App = () => {
    return (
        <div>
            <Toolbar/>
            <div className="container">
                <div className="container-inner">
                    <Routes>
                        <Route path="/" exact element={<Main/>}/>
                        <Route path="/cocktails" exact element={<Main/>}/>
                        <Route path="/register" exact element={<Register/>}/>
                        <Route path="/login" exact element={<Login/>}/>
                        <Route path="/newCocktail" exact element={<NewCocktail/>}/>
                        <Route path="/MyCocktails" exact element={<MyCocktails/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
};

export default App;