import {CHANGE_INPUT, ADD_LIST, DELETE_LIST, INIT_LIST, GET_INIT_LIST} from './actionType';

export const changeInput = (value) =>({
    type: CHANGE_INPUT,
    value
})

export const addList = (value) =>({
    type: ADD_LIST,
    value
})

export const deleteList = (index) =>({
    type: DELETE_LIST,
    index
})

export const appendList= (list) => ({
    type: INIT_LIST,
    list
})

export const getInitList= () => ({
    type: GET_INIT_LIST
})
