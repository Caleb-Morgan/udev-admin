import *as creaters from './actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    list:[],
    isActive: false,
    articleItem:[]
})

export default (state = defaultState ,action) =>{
    switch(action.type){
        case creaters.GETAUTHOR:
        return state.set('list', action.data);
        case creaters.SHOWPOPOVER:
        debugger
        return state.set('isActive', true);
        case creaters.HIDEPOPOVER:
        return state.set('isActive', false);
        case creaters.GETARTICLE:
        return state.set('articleItem', action.data)
        default:
        return state;
    }
} 