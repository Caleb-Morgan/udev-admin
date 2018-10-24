import { CHANGE_INPUT_VALUE, ADD_LIST, DELETE_LIST, INIT_LIST } from './actionType';
import axios from 'axios';

export const changeInputValue = (value) =>({
    type: CHANGE_INPUT_VALUE,
    value
})

export const addList = (value, info) =>({
    type: ADD_LIST,
    value,
    info
})

export const deleteList = (index) =>({
    type: DELETE_LIST,
    index
})

export const initListAction = (data) =>({
    type:INIT_LIST,
    data
})


export const getTodoList = () =>{
    return (dispatch) =>{
        axios.get('http://127.0.0.1:9527/api/list')
        .then((res) =>{
            const data = res.data.body;
            const action = initListAction(data)
            dispatch(action)
        })
        .catch((error) =>{
            console.table(error)
        })
    }
}
