import React from "react";
import {Table, Divider, Tag} from "antd";
import {connect} from 'react-redux'
import moment from "moment";
 class ContentList extends React.Component {
    componentDidMount() {
        this.props.dispatch({type:'contentlist'})
    }
    render() {
        const columns = [
            {
                title:'发布时间',
                dataIndex:'date',
                key:'publishDate',
                render: a=>moment(a.$date).format('YYYY-MM-DD h:mm:ss')
            },
            {
                title:'修改时间',
                dataIndex:'changeDate',
                key:'modifyDate',
                render: a=>moment(a.$date).format('YYYY-MM-DD h:mm:ss')
            },
            {
                title:'Title',
                dataIndex:'title',
                key:'title',
                render: a=>a
            },
            {
                title:'Category',
                dataIndex:'category',
                key:'category',
                render: a=>a
            },
            {
                title:'subCategory',
                dataIndex:'subCategory',
                key:'subCategory',
                render: a=>a
            },
            {
                title:'tag',
                dataIndex:'tag',
                key:'tag',
                render: tags=>(
                    <span>
                        {tags.map(tag=> (<Tag>{tag}</Tag>))}
                    </span>
                )
            },
            {
                title:'operate',
                // dataIndex:'operate',
                key:'operate',
                render: a=>a
            },
        ]
        return (
            <div style={{width:'80%'}}>
                <Table columns={columns} rowKey={record=>record._id.$oid} bordered
                       dataSource={this.props.contentlist.data?this.props.contentlist.data:[]}/>
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

export default connect(mapStateToProps,mapDispatchToProps)(ContentList)