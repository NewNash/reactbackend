import 'braft-editor/dist/index.css'
import 'braft-editor/dist/output.css'
import 'braft-extensions/dist/code-highlighter.css'
import 'braft-extensions/dist/color-picker.css'
import {connect} from 'react-redux'
import React from 'react'
import {Form, Input, Button, Cascader} from 'antd'
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import ColorPicker from 'braft-extensions/dist/color-picker'
import Markdown from 'braft-extensions/dist/markdown'
import 'prismjs/components/prism-python'
import axios from 'axios'

BraftEditor.use([
    CodeHighlighter({
        syntaxs: [
            {
                name: 'JavaScript',
                syntax: 'javascript'
            }, {
                name: 'HTML',
                syntax: 'html'
            }, {
                name: 'CSS',
                syntax: 'css'
            }, {
                name: 'Python',
                syntax: 'python',
            }
        ]
    }),
    ColorPicker(),
    Markdown()
])

class Formdemo extends React.Component {

    componentDidMount() {
        // console.log(this.props.location.state)
        if(this.props.location.state){
            this.props.dispatch({type: 'getContent'})
        }
        this.props.dispatch({type: 'getCategory'})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.form.validateFields((error, values) => {
            if (!error) {
                const submitData = {
                    title: values.title,
                    RawContent: values.content.toRAW(),
                    HtmlContent: values.content.toHTML(),
                    currentCategory: values.category
                }
                console.log(submitData)
                this.props.dispatch({type: 'submit', text: submitData})
            }
        })
    }

    render() {
        const ifEditContent = this.props.location.state
        const {getFieldDecorator} = this.props.form
        const excludeControls = ['emoji', 'undo', 'redo', 'headings', 'list-ul', 'list-ol', 'font-size',
            'font-family', 'line-height', 'letter-spacing', 'bold', 'italic']
        const myUploadFn = (param) => {
            console.log(param)
            const data = new FormData()
            data.append('myfile', param.file)

            axios.post('http://127.0.0.1:3001/upload', data, {
                headers: {"Content-Type": "multipart/form-data"}
            })
                .then((res) => {
                    param.success({url: res.data})
                })
        }
        const categoryOptions = (categorys) => {
            let array = []
            if (Array.isArray(categorys)) {
                categorys.forEach((category) => {
                    let subArray = []
                    if (Array.isArray(category.subCategory)) {
                        category.subCategory.forEach((subCategory) => {
                            subArray.push({
                                value: subCategory.name,
                                label: subCategory.name,
                            })
                        })
                    }
                    array.push({
                        value: category.name,
                        label: category.name,
                        children: subArray
                    })
                })
            }
            return array
        }
        return (
            <div style={{width:'80%',padding:'20px',backgroundColor:'#fff'}}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                    >
                        {getFieldDecorator('title', {
                            initialValue: ifEditContent?this.props.content.title:'',
                            rules: [{
                                required: true,
                                message: '请输入标题',
                            }],
                        })(
                            <Input placeholder='请输入标题'/>
                        )}
                    </Form.Item>
                    <Form.Item

                    >
                        {getFieldDecorator('category', {
                            initialValue: ifEditContent?[this.props.content.category, this.props.content.subCategory]:[]
                        })(
                            <Cascader
                                options={this.props.category[0] ? categoryOptions(this.props.category) : []}
                                expandTrigger="hover"
                                style={{width:300}}
                                placeholder="请选择目录"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                    >
                        {getFieldDecorator('content', {
                            validateTrigger: 'onBlur',
                            initialValue: ifEditContent?BraftEditor.createEditorState(this.props.content.content):'',
                            rules: [{
                                required: true,
                                validator: (_, value, callback) => {
                                    if (value.isEmpty()) {
                                        callback('请输入正文内容')
                                    } else {
                                        callback()
                                    }
                                }
                            }],
                        })(
                            <BraftEditor
                                // value={this.props.content.content}

                                style={{border: '1px solid #eee', borderRadius: '3px',height:'450px',overflow:'hidden'}}
                                media={{uploadFn: myUploadFn}}
                                excludeControls={excludeControls}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
                <div className="braft-output-content"
                     dangerouslySetInnerHTML={{__html: this.props.submitdata.HtmlContent}}>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    submitdata: state.submitdata,
    content: state.content,
    category: state.category,
    currentSubcategory: state.currentSubcategory
})
const mapDispatchToProps = (dispatch) => ({
    dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Formdemo))