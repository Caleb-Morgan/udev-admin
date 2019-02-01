import *as creaters from './actionTypes';
import { fromJS } from 'immutable';
const defaultState = fromJS({
    focused: false,
    mouseIn: false,
    totalPage: 1,
    page: 1,
    list: []
})

export default (state = defaultState, action) =>{
    switch(action.type){
        case creaters.SEARCHBLUR:
        return state.set('focused', false);
        case creaters.SEARCHFOCUS:
        return state.set('focused', true);
        case creaters.HANDELENTER:
        return state.set('mouseIn', true);
        case creaters.HANDELLEAVE:
        return state.set('mouseIn', false);
        case creaters.CHANGELIST:
        return state.merge({
            list: action.data,
            totalPage: action.totalPage
        });
        case creaters.CHANGEPAGE:
        return state.set('page', action.page);
        default:
        return state;
    }
}