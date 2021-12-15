import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createEvent} from "../../store/actions/actions";

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
        text: '',
        title: '',
        date: '',
        duration: 1,
        author: userCheck(),
    });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createEvent(data));
    };

    return (
        <form onSubmit={onSubmit}>
            <p>
                <input
                    value={data.title}
                    onChange={(event => setData({...data, title: event.target.value}))}
                    type="text" placeholder="title"
                />
            </p>
            <p>
                <textarea
                    value={data.text}
                    onChange={(event => setData({...data, text: event.target.value}))}
                    placeholder="text"
                />
            </p>
            <p>
                <label htmlFor="date">Event Date: </label>
                <input
                    value={data.date}
                    onChange={(event => setData({...data, date: event.target.value}))}
                    type="date"
                    min={1}
                    id="date"
                    name="date"
                />
            </p>
            <p>
                <label htmlFor="duration">Event Duration (days): </label>
                <input
                    value={data.duration}
                    onChange={(event => setData({...data, duration: event.target.value}))}
                    type="number"
                    id="duration"
                    name="duration"
                    min='1'
                />
            </p>
            <button>Create</button>
        </form>
    )
};

export default NewCocktail;