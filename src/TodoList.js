import React, { Component } from 'react';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import TodoListUI from './TodoListUI';
import store from './store/index';
import {changeInputValue, addList, deleteList, getTodoList} from './store/actionCreater';

import { Modal } from 'antd';


//容器组件不关注UI 只关注业务逻辑
class TodoList extends Component{
    constructor(props){
        super(props)
        this.state = store.getState();
        this.handelChange = this.handelChange.bind(this)
        this.handelClick = this.handelClick.bind(this)
        this.handelDelete = this.handelDelete.bind(this)
        this.changeStore = this.changeStore.bind(this)
        this.info = this.info.bind(this)
        store.subscribe(this.changeStore)
    }

    changeStore(){
        this.setState(store.getState()) 
    }

    handelChange(e){
        const action = changeInputValue(e.target.value)
        store.dispatch(action)
    }

    handelClick(){
        const action = addList(this.state.inputValue, this.info)
        store.dispatch(action)
    }

    handelDelete(index){
        const action = deleteList(index)
        store.dispatch(action)
        this.info('已经删除该条数据！')
    }
    info(msg){
        Modal.info({
            title: '提示',
            content: (
                <div>{msg}</div>
            ),
            onOk(){}
        })
    }
    render(){
        return(
            <TodoListUI
            placeholder={this.state.placeholder}
            inputValue={this.state.inputValue}
            handelChange={this.handelChange}
            handelClick={this.handelClick}
            handelDelete={this.handelDelete}
            list={this.state.list}
            />
        )
    }
    componentDidMount(){
        const action = getTodoList();
        store.dispatch(action)
    }
}
export default TodoList;