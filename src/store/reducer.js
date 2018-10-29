import React from 'react'
import { CHANGE_INPUT, ADD_LIST, DELETE_LIST, INIT_LIST } from './actionType';
import { Modal } from 'antd';
const defaultState = {
    inputValue: '',
    list: [],
    placeHolder: '请输入'
}

export default (state = defaultState, action) =>{
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case CHANGE_INPUT:
        newState.inputValue = action.value;
        return newState;
        case ADD_LIST:
        const check_list = newState.list.filter(
            (item) =>{
                if(item === action.value){
                    return item;
                }else{
                    return false;
                }
                
            })
        if(check_list.length === 0){
            newState.list.push(action.value)
            newState.inputValue = '';
        }else{
            Modal.info({
                title:'提示',
                content:(
                    <div>该项已存在</div>
                ),
                onOk(){}
            })
            
        }
        
        return newState;
        case DELETE_LIST:
        newState.list.splice(action.index, 1);
        return newState;
        case INIT_LIST:
        newState.list = action.list;
        return newState;
        default:
        break;
    }
    return state
}