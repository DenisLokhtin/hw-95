import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchEvents} from "../../store/actions/actions";
import './Main.css'
import CocktailCard from "../CocktailCard/CocktailCard";
import {Link} from "react-router-dom";


const Main = (props) => {
    const dispatch = useDispatch();
    const event = useSelector(state => state.reducer.events);
    const user = useSelector(state => state.users.user);

    const userCheck = () => {
        if (user !== null) {
            return user.username;
        } else {
            return ''
        }
    };

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch]);

    const printEvent = () => {
        if (event) {
            return event.map(event => {
                return (
                    <CocktailCard
                        key={event._id}
                        title={event.title}
                        text={event.text}
                        date={event.date}
                        duration={event.duration}
                        author={event.author}
                    />
                )
            })
        }
    };

    return (
        <div>
            <div className="main-header">
                <h2>Events list</h2>
                <Link to='/newEvent' className="newEvent">New event</Link>
            </div>
            <div className="cards">
                {printEvent()}
            </div>
        </div>
    )
};

export default Main;