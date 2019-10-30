import React from "react";
import {Form, Row, Col, Input, Button, Icon, DatePicker, Select} from "antd";
import axios from 'axios'
import {connect} from 'react-redux'
import './searchbox.css'
import moment from "moment";
import category from "./category";

class Search extends React.Component {
    state = {
        subCategory:[]
    };
    componentDidMount() {
        this.props.dispatch({type: 'getCategory'})
    }

    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            console.log('Received values of form: ', values);
            const date = values.date ? values.date.map(value => moment(value).format('YYYY-MM-DD').split('-').map(item => parseInt(item))) : 0
            const changeDate = values.changeDate ? values.changeDate.map(value => moment(value).format('YYYY-MM-DD').split('-').map(item => parseInt(item))) : 0
            const show = values.show ? values.show : 0
            const tags = values.tags ? values.tags : 0
            const category = values.category ? values.category : 0
            const subCategory = values.subCategory ? values.subCategory : 0
            const resData = {
                title: values.title || 0, date, changeDate, show, tags,category,subCategory
                // tag:values.tag,
                // show:!!values.show,
                // category:values.category,
                // subCategory:values.subCategory
            }
            console.log(resData)
            axios.post('https://stayalone.cn/searchcontents', resData).then((res) => {
                this.props.dispatch({type: 'search_result_content', text: res.data})
            })
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };
    categoryChange = (value)=>{
       const current_category = this.props.category.find((category)=>category.name === value)
        this.setState({
            subCategory:current_category.subCategory
        })
        this.props.form.resetFields(['subCategory'])
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {Option} = Select;
        const {RangePicker} = DatePicker;
        return (
            <div>
                <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>

                    <Row gutter={24}>
                        {/*{this.getFields()}*/}
                        <Col span={6}>
                            <Form.Item label='标题'>
                                {getFieldDecorator('title')(
                                    <Input
                                        allowClear={true}
                                        placeholder='请输入标题关键字进行查询'
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='发布时间'>
                                {getFieldDecorator('date')(
                                    <RangePicker/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='修改时间'>
                                {getFieldDecorator('changeDate')(
                                    <RangePicker/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='显示'>
                                {getFieldDecorator('show')(
                                    <Select
                                        placeholder='选择显示隐藏'
                                        allowClear={true}
                                    >
                                        <Option value={1}>
                                            显示
                                        </Option>
                                        <Option value={-1}>
                                            隐藏
                                        </Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='标签'>
                                {getFieldDecorator('tags')(
                                    <Select mode='tags'
                                            placeholder='多个标签之间是’或‘的关系'
                                    >

                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='一级目录'>
                                {getFieldDecorator('category')(
                                    <Select onChange={(value)=>this.categoryChange(value)} placeholder='请选择一级目录'>
                                        {this.props.category.map(category => {
                                            return (
                                                <Option value={category.name} key={category.name}>
                                                    {category.name}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='二级目录'>
                                {getFieldDecorator('subCategory')(
                                    <Select placeholder='选完一级目录再选二级目录'>
                                        {this.state.subCategory.map(category => {
                                            return (
                                                <Option value={category.name} key={category.name}>
                                                    {category.name}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6} style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit">
                                查找
                            </Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                                重置
                            </Button>
                        </Col>
                    </Row>
                </Form>
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

const SearchBox = Form.create()(connect(mapStateToProps, mapDispatchToProps)(Search))
export default SearchBox