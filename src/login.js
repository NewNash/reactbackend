import React from "react";
import {Form, Icon, Input, Button, Checkbox, message} from "antd";
import {connect} from 'react-redux'
import './login.css'
import axios from 'axios'
import {withRouter} from "react-router-dom";

class LoginForm extends React.Component {
    componentDidMount() {
        //获取cookie中的用户名
        this.props.form.setFields({
            username: {
                value: this.getCookie('username'),
                error: [new Error('forbid ha')],
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, value) => {

            if (!err) {
                //是否设置cookie
                if (value.remember) {
                    this.setCookie('username', value.username, 1)
                } else {
                    this.delCookie('username')
                }
                axios.post('http://127.0.0.1:3001/login', value).then((res) => {
                    if (res.data === 'ok') {
                        message.success('登陆成功')
                        this.props.dispatch({type: 'login', text: true})
                        this.props.history.push('/')
                    } else {
                        message.error('账号或者密码不对，请重新输入！')
                        this.props.form.resetFields(['password'])
                        this.props.history.push('/login')
                    }
                }).catch((error) => console.log(error))
            }
        })
    }
    setCookie = (name, value, day) => {
        const date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = name + '=' + value + ';expires=' + date;
    }
    getCookie = (name) => {
        const reg = RegExp(name + '=([^;]+)');
        const arr = document.cookie.match(reg);
        if (arr) {
            return arr[1];
        } else {
            return '';
        }
    }
    delCookie = (name) => {
        this.setCookie(name, null, -1);
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <div id='loginBox'>
                <Form onSubmit={this.handleSubmit} className='login-form'>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username'}]
                        })(
                            <Input
                                prefix={<Icon type='user' style={{color: 'rgba(0,0,0,0.25)'}}/>}
                                placeholder='Username'
                            />)
                        }
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'please input your password'}]
                        })(
                            <Input
                                type='password'
                                prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,0.25)'}}/>}
                                placeholder='Password'
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {valuePropName: 'checked', initialValue: true})(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a href="/" className='login-form-forgot'>Forget password</a>
                        <Button type='primary' htmlType='submit' className='login-form-button'>Log in</Button>
                        Or <a href="/">register now!</a>
                    </Form.Item>
                </Form>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginForm)))