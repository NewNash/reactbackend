import React from "react";
import {connect} from 'react-redux'
import {Table, Button, Icon, Modal, Input, Switch, Popconfirm, message} from 'antd';
import axios from 'axios'

class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            submodalVisible:false,
            categoryname: '',
            subcategoryname:'',
            categoryShow: true,
            currentcategory:''
        }
    }

    componentDidMount() {
        this.props.dispatch({type: 'getCategory'})
    }

    showModal = () => {
        this.setState({
            modalVisible: true,
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
            if (res.data === 'ok') {
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
    subshowModal = (record) => {
        this.setState({
            submodalVisible: true,
            currentcategory:record.name
        })
    }
    submodalCancle = () => {
        this.setState({
            submodalVisible: false
        })
    }
    submodalOk = (e) => {
        axios.post('https://stayalone.cn/addsubcategory',{
            categoryname:this.state.currentcategory,
            subcategoryname:this.state.subcategoryname,
            show:true
        }).then((res)=>{
             if (res.data === 'ok') {
                message.success('添加成功')
            }
            this.setState({
                submodalVisible: false,
            })
            window.location.reload()
        })
        // console.log(this.state.subcategoryname)
        // console.log(this.state.currentcategory)
    }
    subhandleblur = (e) => {
        console.log(e.target.value)
        this.setState({
            subcategoryname: e.target.value
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
                title: '操作', key: 'operation', align: 'center', render: (record) => {
                    const handledelete = () => {
                        axios.post('https://stayalone.cn/delcategory', {
                            categoryname: record.name
                        }).then((res) => {
                            if (res.data === 'ok') {
                                message.success('删除成功')
                            }
                            window.location.reload()
                        })
                    }
                    const switchOnchange = (ifshow) => {
                        axios.post('https://stayalone.cn/modifycategory', {
                            categoryname: record.name,
                            show: ifshow
                        }).then((res) => {
                            if (res.data === 'ok') {
                                message.success('修改成功')
                            }
                            window.location.reload()
                        })
                    }

                    return (
                        <div>
                            <a href='#'>
                                <Icon type="plus" style={{marginRight: '10px'}} title='添加二级目录' onClick={()=>this.subshowModal(record)}/>
                            </a>
                            <a style={{marginRight: '10px'}}>
                                <Switch checkedChildren="显示" unCheckedChildren="隐藏" onChange={switchOnchange}
                                        defaultChecked={record.show}/>
                            </a>
                            <Popconfirm
                                title="确定删除这个目录吗？"
                                onConfirm={handledelete}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a>
                                    <Icon type="delete" title='删除目录'/>
                                </a>
                            </Popconfirm>

                        </div>
                    )
                }
            },
        ];
        const data = this.props.category
        const expandedRowRender = (record) => {
            const handledelete = (text) => {
                axios.post('https://stayalone.cn/delsubcategory',{
                    categoryname:record.name,
                    subcategoryname:text.name
                }).then((res)=>{
                    if(res.data==='ok'){
                        message.success('删除成功')
                        window.location.reload()
                    }
                })
            }
            const switchOnchange=(ifshow,text)=>{
                axios.post('https://stayalone.cn/modifysubcategory',{
                    category_id:record._id.$oid,
                    subcategory_id:text._id.$oid,
                    show:ifshow
                }).then(res=>console.log(res))
            }
            const columns = [
                {
                    title: '序号', key: 'sort', render: (text, record, index) => {
                        return index + 1
                    }
                },
                {title: '二级目录', dataIndex: 'name', key: 'name'},
                {
                    title: '操作', key: 'operation', render: (text) => (
                        <div>
                            <a style={{marginRight: '10px'}}>
                                <Switch checkedChildren="显示" unCheckedChildren="隐藏" onChange={(ifshow)=>switchOnchange(ifshow,text)}
                                        defaultChecked={text.show}/>
                            </a>

                            <Popconfirm
                                title="确定删除这个目录吗？"
                                onConfirm={() => handledelete(text)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a>
                                    <Icon type="delete" title='删除目录' />
                                </a>
                            </Popconfirm>
                        </div>
                    )
                },
            ]
            return (
                <Table
                    columns={columns}
                    dataSource={record.subCategory}
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
                    destroyOnClose={true}
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
                <Modal
                                destroyOnClose={true}
                                visible={this.state.submodalVisible}
                                onCancel={this.submodalCancle}
                                onOk={this.submodalOk}
                                okText='提交'
                                cancelText='取消'
                                // footer={null}
                            >
                                <Input placeholder='二级目录名称'
                                       onBlur={(e) => this.subhandleblur(e)}
                                       style={{width: '40%', marginRight: '20px'}}/>
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