import React from 'react';
import {connect} from 'react-redux'
import {withRouter, BrowserRouter as Router, Route, Link} from "react-router-dom";
// import {message} from "antd";
import {Menu, Icon} from 'antd';
import Editor from './editor'
import ContentList from "./contentlist";
import Category from "./category";

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
                        <Menu.Item key="1">
                            <Icon type="home"/>
                            首页
                            <Link to='/'></Link>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                              <Icon type="mail"/>
                             <span>内容管理</span>
                            </span>
                            }
                        >
                            <Menu.ItemGroup key="g1" title="文章管理">
                                <Menu.Item key="2"><Link to='/content'><Icon type="plus"/>发表文章</Link></Menu.Item>
                                {/*<Menu.Item key="3"><Link to='/edit-content'><Icon type="edit"/>编辑文章</Link></Menu.Item>*/}
                                <Menu.Item key="4"><Link to='/contentlist'><Icon type="read"/>文章列表</Link></Menu.Item>

                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title="目录管理">
                                <Menu.Item key="5"><Link to='/category'><Icon type="container"/>目录列表</Link></Menu.Item>
                                {/*<Menu.Item key="3">*/}
                                {/*    <Link to='/contentlist'>content list</Link>*/}
                                {/*</Menu.Item>*/}
                                {/*<Menu.Item key="4">*/}
                                {/*    <Link to='/category'>category</Link>*/}
                                {/*</Menu.Item>*/}
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
                    <Category />
                    <Route path='/content' component={Editor}/>
                    <Route path='/edit-content' component={Editor}/>
                    <Route path='/contentlist' component={ContentList}/>
                    <Route path='/category' component={Category}/>
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




