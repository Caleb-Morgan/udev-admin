import React, { Component } from 'react';
import store from './store/index';
import TodoListUI from './TodoListUI';
import { changeInput, addList, deleteList, getInitList } from './store/acitonCreater';

import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

class TodoList extends Component{
    constructor(props){
        super(props)
        this.state = store.getState();
        this.handelChange = this.handelChange.bind(this);
        this.handelClick = this.handelClick.bind(this);
        this.handelDelete = this.handelDelete.bind(this);
        this.changeState = this.changeState.bind(this);
        store.subscribe(this.changeState);
    }

    changeState(){
        this.setState(store.getState);
    }

    handelChange(e){
        const action = changeInput(e.target.value);
        store.dispatch(action);
    }

    handelClick(){
        const action = addList(this.state.inputValue);
        store.dispatch(action);
    }

    handelDelete(index){
        const action = deleteList(index);
        store.dispatch(action)
    }

    render(){
        return(
            <TodoListUI
            handelChange={this.handelChange}
            handelClick={this.handelClick}
            handelDelete={this.handelDelete}
            list={this.state.list}
            placeHolder={this.state.placeHolder}
            inputValue={this.state.inputValue}
            />
        )
    }
    componentDidMount(){
        const action = getInitList();
        store.dispatch(action)
    }
}
export default TodoList;