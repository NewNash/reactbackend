import React from "react";
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {  Route, Link} from "react-router-dom";
import Editor from "./editor";
const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

export default class MyLayout extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    render() {
        return (
               <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" style={{color:'#fff',fontSize:'24px',textAlign:'center'}}>
                        <Link to='/'>LOGO</Link>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="pie-chart"/>
                            <Link to='/content'><span>content</span></Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop"/>
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                  <Icon type="user"/>
                  <span>User</span>
                </span>
                            }
                        >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                  <Icon type="team"/>
                  <span>Team</span>
                </span>
                            }
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file"/>
                            <span>File</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0,textAlign:'center'}}><h1>这是标题</h1></Header>
                    <Content style={{margin: '0 16px',padding:'10px'}}>
                        <Route path='/content' component={Editor}/>
                        {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                        {/*    <Breadcrumb.Item>User</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                        {/*</Breadcrumb>*/}
                        {/*<div style={{padding: 24, background: '#fff', minHeight: 360}}>Bill is a cat.</div>*/}
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}
