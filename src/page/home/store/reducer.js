import *as creaters from './actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    list:[]
})

export default (state = defaultState ,action) =>{
    switch(action.type){
        case creaters.GETAUTHOR:
        return state.set('list', action.data);
        default:
        return state;
    }
} 