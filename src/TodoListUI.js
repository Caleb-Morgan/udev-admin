import React from 'react';
import { Input, Button, List } from 'antd';


//UI组件只关注UI不含业务逻辑
//无状态组件 性能高不用处理render
const TodoListUI = (props) => {
    return(
        <div style={{marginTop: '10px', marginRight: '10px'}}>
            <div>
                <Input
                placeholder={props.placeholder}
                style={{width: '300px', marginRight: '10px'}}
                value={props.inputValue}
                onChange={props.handelChange}/>
                <Button
                type="primary"
                onClick={props.handelClick}>提交</Button>
            </div>
            <List
            style={{width: '300px'}}
            dataSource={props.list}
            bordered
            renderItem={(item, index) =>(<List.Item onClick={()=>{props.handelDelete(index)}}>{item}</List.Item>)}
            />
        </div>
    )
}
/* class TodoListUI extends Component{
    render(){
        return(
            <div style={{marginTop:'10px', marginLeft:'10px'}}>
                <div>
                    <Input 
                    placeholder={this.props.placeHolder} 
                    style={{'width': '300px', marginRight: '10px'}}
                    onChange={this.props.handelInputChange}
                    value = {this.props.inputValue}
                    ></Input>
                    <Button 
                    type="primary"
                    onClick={this.props.handelClick}>提交</Button>
                </div>
                <List
                    style={{marginTop: '0px', 'width': '300px'}}
                    bordered
                    dataSource={this.props.dataSource}
                    ref = 'item'
                    renderItem={(item, index) => (<List.Item onClick = {index =>{this.props.handelDelete(index)}}>{item}</List.Item>)}
                />
            </div>
        )
    }
} */

export default TodoListUI;