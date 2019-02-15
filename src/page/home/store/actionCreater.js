import *as creaters from './actionTypes';
import axios from 'axios';
import { fromJS } from 'immutable';

export const get_list = (data) =>({
    type: creaters.GETAUTHOR,
    data: data
})

export const axios_list = () =>{
    return (dispatch) =>{
        axios.get('./api/list.json')
        .then((res) =>{
            const data = res.data.data;
            dispatch(get_list(fromJS(data)))
        })
        .catch((error) =>{
            console.error(error)
        })
    }
}