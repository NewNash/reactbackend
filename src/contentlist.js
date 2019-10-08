import React from "react";
import {Table, Divider, Tag} from "antd";

export default class ContentList extends React.Component {
    render() {
        const columns1 = [
            {
                title: '#',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <span>
        {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
                color = 'volcano';
            }
            return (
                <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                </Tag>
            );
        })}
      </span>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical"/>
        <a>Delete</a>
      </span>
                ),
            },
        ];

        const data1 = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
        ];

        const columns = [
            {
                title:'#',
                dataIndex:'listNumber',
                key:'listNumber',
                render: a=>a
            },
            {
                title:'发布时间',
                dataIndex:'publishDate',
                key:'publishDate',
                render: a=>a
            },
            {
                title:'修改时间',
                dataIndex:'modifyDate',
                key:'modifyDate',
                render: a=>a
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
                render: a=>a
            },
            {
                title:'operate',
                dataIndex:'operate',
                key:'operate',
                render: a=>a
            },
        ]
        return (
            <div style={{width:'80%'}}>
                <Table columns={columns} dataSource={data1}/>
            </div>
        )
    }
}