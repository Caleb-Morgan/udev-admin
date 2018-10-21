import React, { Component } from 'react';
import propTypes from 'prop-types';

class TodoItem extends Component{
    //当一个组件从父组件接收参数\只要父组件的render函数重新执行
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps')
    }
    //当父组件传递的props无改动时不执行update
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.content !== this.props.content){
            return true;
        }else{
            return false;
        }
    }
    //当前组件被移除时执行
    componentWillUnmount(){
        console.log('componentWillUnmount')
    }
    constructor(props){
        super(props)
        this.handelClick = this.handelClick.bind(this)
    }
    handelClick() {
        const { handelListDelete, index } = this.props;
        handelListDelete(index)
    }
    render(){
        console.log('child render')
        const { context, test } = this.props;
        return(
            <div onClick={this.handelClick}>
                {test} - {context}
            </div>
        )
    }
}
/* 数据验证 :
    array数组、
    bool布尔、
    func函数、
    number数字、
    object对象、
    string字符串、
    symbol符号、
    node可渲染节点、
    element可渲染元素、
    instanceOf（）指定类的实例、
    oneof(['','']) 特定的几个值、
    oneofType(['','']) 指定类型中的一个、
    arrayOf() 指定类型的数组、
    objectO() 特定成员变量的对象、
    shape({xx:,yy:}) 制定构成方式的对象、
    any 任何
    .isRequired 必须属性
*/
TodoItem.propTypes = {
    test: propTypes.string.isRequired,
    content: propTypes.string,
    handelListDelete: propTypes.func,
    index: propTypes.number
}
/* 定义默认值 */
TodoItem.defaultProps = {
    test:'test'
}
export default TodoItem;