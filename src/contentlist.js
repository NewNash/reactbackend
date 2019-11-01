import React from "react";
import {Table, Divider, Tag, Icon, Popconfirm, message,Switch} from "antd";
import {connect} from 'react-redux'
import moment from "moment";
import {Link} from "react-router-dom";
import axios from 'axios'
import SearchBox from "./searchbox";
class ContentList extends React.Component {
    componentDidMount() {
        // this.props.dispatch({type: 'contentlist'})
    }

    render() {
        const columns = [
            {
                title: '发布时间',
                align:'center',
                dataIndex: 'date',
                key: 'publishDate',
                render: a => moment(a.$date).format('YYYY-MM-DD HH:mm:ss')
            },
            {
                title: '修改时间',
                align:'center',
                dataIndex: 'changeDate',
                key: 'modifyDate',
                render: a => moment(a.$date).format('YYYY-MM-DD HH:mm:ss')
            },
            {
                title: '标题',
                align:'center',
                dataIndex: 'title',
                key: 'title',
                render: a => a
            },
            {
                title: '目录',
                align:'center',
                dataIndex: 'category',
                key: 'category',
                render: a => a
            },
            {
                title: '二级目录',
                align:'center',
                dataIndex: 'subCategory',
                key: 'subCategory',
                render: a => a
            },
            {
                title: 'tag',
                align:'center',
                dataIndex: 'tag',
                key: 'tag',
                render: tags => (
                    <span>
                        {tags.map(tag => (<Tag key={tag} color='#2db7f5' style={{fontSize:'14px'}}>{tag}</Tag>))}
                    </span>
                )
            },
            {
                title: '操作',
                align:'center',
                // dataIndex:'operate',
                key: 'operate',
                render: (record, b) => {
                    const delconfirm = () => {
                        axios.post('https://stayalone.cn/delarticle',{_id:record._id.$oid}).then((res)=>{
                            if(res.data==='ok'){
                                message.success('文章删除成功')
                                window.location.reload()
                            }
                        })
                    }
                    const switchChange=(ifshow)=>{
                        // console.log(record)
                        axios.post('https://stayalone.cn/showarticle',{
                            _id:record._id.$oid,
                            show:ifshow,
                        }).then((res)=>{
                             if(res.data==='ok'){
                                message.success('修改成功')
                                window.location.reload()
                            }
                        })
                    }
                    return (
                        <span>
                            <Switch checkedChildren="显示" unCheckedChildren="隐藏" size='small' defaultChecked={record.show} onChange={switchChange}/>
                            <Divider type='vertical'/>
                            <Link to={{pathname: '/admin/modify-article', state: {text: record}}}>
                                <Icon type="edit" title='编辑文章'/>
                            </Link>
                            <Divider type='vertical'/>
                            <Popconfirm title='确定要删除此文章吗'
                                        onConfirm={delconfirm}
                                        okText="Yes"
                                        cancelText="No">
                                <Icon type="delete" title='删除文章' style={{color: 'red'}} />
                            </Popconfirm>
                        </span>
                    )
                }
            },
        ]
        const pagination = {
            total:this.props.contentlist.count
        }
        return (
            <div style={{width: '80%'}}>
                <SearchBox/>
                <Table columns={columns}
                       rowKey={record => record._id.$oid}
                       bordered
                       pagination={pagination}
                       dataSource={this.props.contentlist.data ? this.props.contentlist.data : []}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    contentlist: state.contentlist,
})
const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentList)