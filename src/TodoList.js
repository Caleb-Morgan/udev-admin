import React, { Component, Fragment } from 'react';
import TodoItem from './todoItem';
import './style.css';

class TodoList extends Component{
    //最优先执行函数
    constructor(props){
        super(props)
        //组件的状态
        this.state = {
            inputValue:'',
            list:['xx']
        }
        this.handelButtonClick = this.handelButtonClick.bind(this);
        this.handelInputChange = this.handelInputChange.bind(this);
        this.handelListDelete = this.handelListDelete.bind(this)
        
    }
    //在组件即将挂在到页面上前自动执行
    componentWillMount(){
        console.log('componentWillMount')
    }
    //组件被挂在到页面后执行
    componentDidMount(){
        console.log('componentDidMount')
    }
    //组件数据更新时执行 return true更新、false不更新
    shouldComponentUpdate(){
        console.log('shouldComponentUpdate')
        return true;
    }
    /*组件被更新前在shouldComponentUpdate之后自动执行
    如果shouldComponentUpdat返回true执行
    返回false不执行*/
    componentWillUpdate(){
      console.log('componentWillUpdate')
    }
    //组建更新完成后执行
    componentDidUpdate() {
        console.log('componentDidUpdate')
    }

    //通过bind(this)或者用es6箭头函数确定this指向
    handelInputChange(e){
        const value = this.input.value;
        this.setState(() => ({
            inputValue:value
        }));
                
    }
    /* setState异步如有与数据更新的操作应写在第二个函数内 */
    handelButtonClick(e){
        this.setState((prevState) =>({
            list:[...prevState.list, prevState.inputValue],
            inputValue:''
        }), () =>{
            console.log(this.ul.querySelectorAll('div').length)
        });
    }
    handelListDelete(index){
        this.setState((prevState)=>{
            const list = [...prevState.list];
            list.splice(index, 1)
            return {list};
        });
    }
    getTodoItem(){
        return this.state.list.map((item, index) => { 
            return( 
                  <TodoItem 
                    key={item}
                    context={item} 
                    index={index} 
                    handelListDelete={this.handelListDelete}
                  />
                
            )
        })
    }
    render(){
        console.log('render')
        return(
           
            <Fragment>
                <div>
                    <label htmlFor="ip">输入框</label>
                    <input 
                        id="ip" 
                        className="input" 
                        value={this.state.inputValue} 
                        onChange={this.handelInputChange}
                        ref={(input) =>{this.input = input}}
                    />
                    {/*尽量少用或不用ref */}
                    <button onClick={this.handelButtonClick}>提交</button>
                </div>
                <ul ref={(ul) =>{this.ul = ul}}>
                    {this.getTodoItem()}
                </ul>
            </Fragment>
        )
    }
}
export default TodoList;