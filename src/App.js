import React from 'react';
import {connect} from 'react-redux'
import {withRouter, BrowserRouter as Router, Route, Link} from "react-router-dom";
// import {message} from "antd";
import {Menu, Icon} from 'antd';
import Editor from './editor'
import ContentList from "./contentlist";
import Category from "./category";
import PicManage from "./picmanage";
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
                            <Link to='/admin'/>
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
                                <Menu.Item key="2"><Link to='/admin/content'><Icon type="plus"/>发表文章</Link></Menu.Item>
                                {/*<Menu.Item key="3"><Link to='/edit-content'><Icon type="edit"/>编辑文章</Link></Menu.Item>*/}
                                <Menu.Item key="4"><Link to='/admin/contentlist'><Icon type="read"/>文章列表</Link></Menu.Item>

                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title="目录管理">
                                <Menu.Item key="5"><Link to='/admin/category'><Icon type="container"/>目录列表</Link></Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="p2" title="图片管理">
                                <Menu.Item key="6"><Link to='/admin/picmanage'><Icon type="picture"/>图片列表</Link></Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>

                    </Menu>
                    <Route path='/admin/content' component={Editor}/>
                    <Route path='/admin/edit-content' component={Editor}/>
                    <Route path='/admin/contentlist' component={ContentList}/>
                    <Route path='/admin/category' component={Category}/>
                    <Route path='/admin/picmanage' component={PicManage}/>
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




