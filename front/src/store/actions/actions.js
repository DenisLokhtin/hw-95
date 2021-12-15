import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";

export const SET_EVENTS = 'SET_EVENTS';
export const FETCH_EVENTS = 'FETCH_EVENTS';

export const fetchEvents = value => ({type: FETCH_EVENTS, payload: value});

export const setEvents = value => ({type: SET_EVENTS, payload: value});

export const createEvent = data => {
    return async () => {
        try {
            console.log(data)
            await axiosApi.post('/events', data);
            toast.success('Event Created');
        } catch (e) {
            console.log(e)
        }
    };
};



