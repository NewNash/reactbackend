import React from "react";
import {Form, Row, Col, Input, Button, Icon, DatePicker, Select} from "antd";
import axios from 'axios'
import {connect} from 'react-redux'
import './searchbox.css'
import moment from "moment";

class Search extends React.Component {
    // state = {
    //     expand: false,
    // };
    getFields() {
        // const count = this.state.expand ? 10 : 6;
        const {getFieldDecorator} = this.props.form;
        const children = [];
        for (let i = 0; i < 10; i++) {
            children.push(
                <Col span={8} key={i} style={{display: i < 6 ? 'block' : 'none'}}>
                    <Form.Item label={`Field ${i}`}>
                        {getFieldDecorator(`field-${i}`, {
                            rules: [
                                {
                                    required: true,
                                    message: 'Input something!',
                                },
                            ],
                        })(<Input placeholder="placeholder"/>)}
                    </Form.Item>
                </Col>,
            );
        }
        return children;
    }

    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            console.log('Received values of form: ', values);
            const date = moment(values.date).format('YYYY-MM-DD').split('-').map((item) => parseInt(item))
            const changeDate = moment(values.changeDate).format('YYYY-MM-DD').split('-').map((item) => parseInt(item))
            const resData = {
                title:values.title||'',
                date:values.date?date:[2038,12,1]
                // changeDate,
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

    render() {
        const {getFieldDecorator} = this.props.form;
        const {Option} = Select;
        return (
            <div>
                <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>

                    <Row gutter={24}>
                        {/*{this.getFields()}*/}
                        <Col span={6}>
                            <Form.Item label='标题'>
                                {getFieldDecorator('title')(
                                    <Input/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='时间'>
                                {getFieldDecorator('date')(
                                    <DatePicker/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='修改时间'>
                                {getFieldDecorator('changeDate')(
                                    <DatePicker/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='显示'>
                                {getFieldDecorator('show')(
                                    <Select>
                                        <Option value={1} >
                                            显示
                                        </Option>
                                        <Option value={0}>
                                            隐藏
                                        </Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='tag'>
                                {getFieldDecorator('tag')(
                                    <Select mode='tags'>

                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='目录'>
                                {getFieldDecorator('category')(
                                    <Select>
                                        <Option value='tag1'>
                                            显示
                                        </Option>
                                        <Option value='tag2'>
                                            隐藏
                                        </Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='二级目录'>
                                {getFieldDecorator('subCategory')(
                                    <Select>
                                        <Option value='tag1'>
                                            显示
                                        </Option>
                                        <Option value='tag2'>
                                            隐藏
                                        </Option>
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
                    {/*<Row>*/}
                    {/*    <Col span={24} style={{textAlign: 'right'}}>*/}
                    {/*        <Button type="primary" htmlType="submit">*/}
                    {/*            查找*/}
                    {/*        </Button>*/}
                    {/*        <Button style={{marginLeft: 8}} onClick={this.handleReset}>*/}
                    {/*            重置*/}
                    {/*        </Button>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </Form>
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

const SearchBox = Form.create()(connect(mapStateToProps, mapDispatchToProps)(Search))
export default SearchBox