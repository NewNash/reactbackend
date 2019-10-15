import React from "react";
import {connect} from 'react-redux'
import {Table, Button, Icon, Modal, Input, Switch, Popconfirm,message} from 'antd';
import axios from 'axios'

class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            categoryname: '',
            categoryShow: true,
        }

    }

    componentDidMount() {
        this.props.dispatch({type: 'getCategory'})
    }

    showModal = () => {
        this.setState({
            modalVisible: true
        })
    }
    modalCancle = () => {
        this.setState({
            modalVisible: false
        })
    }
    modalOk = () => {
        axios.post('https://stayalone.cn/addcategory', {
            categoryname: this.state.categoryname,
            show: this.state.categoryShow
        }).then((res) => {
            if (res.data==='ok') {
                message.success('添加成功')
            }
            this.setState({
                modalVisible: false,
            })
            window.location.reload()
        })
        // this.props.dispatch({type:'addCategory',text:{categoryname: this.state.categoryname,show:this.state.categoryShow}})
    }
    handleblur = (e) => {
        this.setState({
            categoryname: e.target.value
        })
    }
    switchOnchange = (checked) => {
        this.setState({
            categoryShow: checked,
        })
    }

    render() {
        const columns = [
            {title: '一级目录', dataIndex: 'name', key: 'name'},
            {title: '是否显示', dataIndex: 'show', key: 'show', render: (text) => text ? '显示' : '隐藏'},
            {
                title: '操作', key: 'operation', render: (a) => {
                    const handledelete = (a) => {
                        axios.post('https://stayalone.cn/delcategory', {
                            categoryname: a.name
                        }).then((res)=>{
                            if(res.data==='ok'){
                                message.success('删除成功')
                            }
                            window.location.reload()
                        })
                    }
                    return (
                        <div>
                            <a>
                                <Icon type="plus" style={{marginRight: '10px'}}/>
                            </a>
                            <a>
                                <Icon type="eye" style={{marginRight: '10px'}}/>
                            </a>
                            {/*<a onClick={() => handledelete(a)}>*/}
                            {/*    <Icon type="delete"/>*/}
                            {/*</a>*/}
                            <Popconfirm
                                title="确定删除这个目录吗？"
                                onConfirm={() => handledelete(a)}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Icon type="delete"/>
                            </Popconfirm>
                        </div>
                    )
                }
            },
        ];
        const data = this.props.category
        const expandedRowRender = (a, b, c, d) => {
            const columns = [
                {
                    title: '序号', key: 'sort', render: (text, record, index) => {
                        return index + 1
                    }
                },
                {title: '二级目录', dataIndex: 'name', key: 'name'},
                {
                    title: '操作', key: 'operation', render: () => (
                        <div>
                            <a>
                                <Icon type="eye" style={{marginRight: '10px'}}/>
                            </a>
                            <a>
                                <Icon type="delete"/>
                            </a>
                        </div>
                    )
                },
            ]
            return (
                <Table
                    columns={columns}
                    dataSource={a.subCategory}
                    pagination={false}
                    rowKey={record => record._id.$oid}
                    indentSize={20}
                />
            )
        }
        return (
            <div style={{padding: '20px'}}>
                <Button type='primary' onClick={this.showModal}>
                    添加一级目录
                </Button>
                <Table
                    style={{marginTop: '15px'}}
                    rowKey={record => record._id.$oid}
                    bordered
                    pagination={false}
                    expandedRowRender={expandedRowRender}
                    columns={columns}
                    dataSource={data}
                />
                <Modal
                    visible={this.state.modalVisible}
                    onCancel={this.modalCancle}
                    onOk={this.modalOk}
                    okText='提交'
                    cancelText='取消'
                    // footer={null}
                >
                    <Input placeholder='目录名称'
                           onBlur={(e) => this.handleblur(e)}
                           style={{width: '40%', marginRight: '20px'}}/>
                    <Switch checkedChildren="显示" unCheckedChildren="隐藏" onChange={this.switchOnchange} defaultChecked/>
                    {/*<p>*/}
                    {/*    <Button style={{marginRight:'15px'}}>取消</Button>*/}
                    {/*    <Button type='primary'>提交</Button>*/}
                    {/*</p>*/}

                </Modal>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    category: state.category,
})
const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)