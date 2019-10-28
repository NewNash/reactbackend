import React from "react";
import {Table, Divider, Tag, Icon, Popconfirm, message} from "antd";
import {connect} from 'react-redux'
import moment from "moment";
import {Link} from "react-router-dom";
import axios from 'axios'

class ContentList extends React.Component {
    componentDidMount() {
        this.props.dispatch({type: 'contentlist'})
    }

    render() {
        const columns = [
            {
                title: '发布时间',
                dataIndex: 'date',
                key: 'publishDate',
                render: a => moment(a.$date).format('YYYY-MM-DD h:mm:ss')
            },
            {
                title: '修改时间',
                dataIndex: 'changeDate',
                key: 'modifyDate',
                render: a => moment(a.$date).format('YYYY-MM-DD h:mm:ss')
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                render: a => a
            },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
                render: a => a
            },
            {
                title: 'subCategory',
                dataIndex: 'subCategory',
                key: 'subCategory',
                render: a => a
            },
            {
                title: 'tag',
                dataIndex: 'tag',
                key: 'tag',
                render: tags => (
                    <span>
                        {tags.map(tag => (<Tag key={tag}>{tag}</Tag>))}
                    </span>
                )
            },
            {
                title: 'operate',
                // dataIndex:'operate',
                key: 'operate',
                render: (a, b) => {
                    const delconfirm = () => {
                        axios.post('https://stayalone.cn/delarticle',{_id:a._id.$oid}).then((res)=>{
                            if(res.data==='ok'){
                                message.success('文章删除成功')
                                window.location.reload()
                            }
                        })
                    }
                    return (
                        <span>
                            <Link to={{pathname: '/admin/modify-article', state: {text: a}}}>
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
        return (
            <div style={{width: '80%'}}>
                <Table columns={columns} rowKey={record => record._id.$oid} bordered
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