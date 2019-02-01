import *as creaters from './actionTypes';
import axios from 'axios';
import { fromJS } from 'immutable';

export const search_focus = ()  =>({
    type: creaters.SEARCHFOCUS
})

export const search_blur = () =>({
    type: creaters.SEARCHBLUR
})

export const handel_enter = () =>({
    type: creaters.HANDELENTER
})

export const handel_leave = () =>({
    type: creaters.HANDELLEAVE
})

export const change_list = (data) =>({
    type: creaters.CHANGELIST,
    totalPage: Math.ceil(data.size/10),
    data
})

export const change_page = (page) =>({
    type: creaters.CHANGEPAGE,
    page
})

export const axois_hot = () =>{
    return (dispatch) =>{
        axios.get('./api/hot.json')
        .then((res) =>{
            const data = res.data.data;
            dispatch(change_list(fromJS(data)));
        })
        .catch((error) =>{
            console.log(error)
        })
    }
}