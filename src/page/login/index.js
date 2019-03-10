import React, { Component } from 'react';
import { Form,  Icon, Input, Button, Checkbox }  from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className="login-box">
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '账号不能为空!' }],
                    })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" autoFocus />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                    rules: [{ required: true, message: '密码不能为空!' }],
                    })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: false,
                    })(
                    <Checkbox>记住密码</Checkbox>
                    )}
                    <a className="login-form-forgot">忘记密码？</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                    </Button>
                    <Link to="/home">免费注册</Link>
                </FormItem>
            </Form>
        </div>
      );
    }
  }
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;