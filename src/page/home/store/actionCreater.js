import *as creaters from './actionTypes';
import axios from 'axios';
import { fromJS } from 'immutable';

export const get_list = (data) =>({
    type: creaters.GETAUTHOR,
    data: data
})

export const show_popover = () =>({
    type: creaters.SHOWPOPOVER
})

export const hide_popover = () =>({
    type: creaters.HIDEPOPOVER
})

export const get_article = (data) =>({
    type: creaters.GETARTICLE,
    data
})

export const axios_article = () =>{
    return (dispatch) =>{
        axios.get('./api/article.json')
        .then((res) =>{
            const data = res.data.data;
            dispatch(get_article(fromJS(data)))
        })
    }
}

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