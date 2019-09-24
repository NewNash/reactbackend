import React from "react";
import {Form, Icon, Input, Button, Checkbox} from "antd";
import {connect} from 'react-redux'
import './login.css'
import axios from 'axios'

class LoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err,value)=>{
            if(!err){
                this.props.dispatch({type:'login',text:value})
                // axios.post('https://neveralone.cn/admin',{
                //     username:value.username,
                //     password:value.password})
                //     .then((res)=>{
                //     console.log(res)
                // })
                // console.log(value)
            }
        })
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
                        {getFieldDecorator('password',{
                            rules:[{required:true,message:'please input your password'}]
                        })(
                            <Input
                                type='password'
                                prefix={<Icon type='lock'style={{color: 'rgba(0,0,0,0.25)'}}/>}
                                placeholder='Password'
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember',{valuePropName:'checked',initialValue:true})(
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

const mapStateToProps=(state)=>{
    return ({

    })
}
const mapDispatchToProps=(dispatch)=>({
    dispatch
})


const Wrapper = connect(mapStateToProps,mapDispatchToProps)(Form.create()(LoginForm))
export default Wrapper