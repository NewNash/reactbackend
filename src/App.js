import React from 'react';
import {connect} from 'react-redux'
import {withRouter, BrowserRouter as Router, Route, Link} from "react-router-dom";
// import {message} from "antd";
import {Menu, Icon} from 'antd';
import Editor from './editor'

const {SubMenu} = Menu;

class App extends React.Component {
    componentDidMount() {
        if (this.props.iflogin) {

        }
        // else{
        //     message.error('please login first')
        //     this.props.history.push('/login')
        // }
    }

    render() {
        return (
            <Router>
                <div style={{display: 'flex'}}>
                    <Menu
                        // onClick={this.handleClick}
                        style={{width: 256}}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                              <Icon type="mail"/>
                             <span>内容管理</span>
                            </span>
                            }
                        >
                            <Menu.ItemGroup key="g1" title="Item 1">
                                <Menu.Item key="1"><Link to='/content'>create article</Link></Menu.Item>
                                <Menu.Item key="2"><Link to='/edit-content'>edit article</Link></Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title="Item 2">
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
              <Icon type="appstore"/>
              <span>Navigation Two</span>
            </span>
                            }
                        >
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu
                            key="sub4"
                            title={
                                <span>
              <Icon type="setting"/>
              <span>Navigation Three</span>
            </span>
                            }
                        >
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                    <Route path='/content' component={Editor}/>
                    <Route path='/edit-content' component={Editor}/>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => ({
    iflogin: state.iflogin
})
const mapDispatchToProps = (dispatch) => ({
    dispatch
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))




