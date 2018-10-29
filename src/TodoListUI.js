import React from 'react';
import { List, Button, Input } from 'antd';

const TodoListUI = (props) =>{
    return(
        <div style={{marginTop: '10px', marginLeft: '10px'}}>
            <div>
                <Input
                style={{width: '300px'}}
                onChange={props.handelChange}
                placeholder={props.placeHolder}
                value={props.inputValue}
                />
                <Button
                type="primary"
                style={{marginLeft: '10px'}}
                onClick={props.handelClick}
                >添加</Button>
            </div>
            <List
            style={{width: '300px'}}
            bordered
            dataSource={props.list}
            renderItem={(item, index) =>(<List.Item onClick={() =>{props.handelDelete(index)}}>{item}</List.Item>)}
            />
        </div>
    )
}

export default TodoListUI;