import 'braft-editor/dist/index.css'
import 'braft-editor/dist/output.css'
import 'braft-extensions/dist/code-highlighter.css'
import 'braft-extensions/dist/color-picker.css'
import {connect} from 'react-redux'
import React from 'react'
import {Form, Input, Button} from 'antd'
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
    handleSubmit = (event) => {

        event.preventDefault()

        this.props.form.validateFields((error, values) => {
            if (!error) {
                const submitData = {
                    title: values.title,
                    RawContent:values.content.toRAW(),
                    HtmlContent:values.content.toHTML(),
                }
                console.log(submitData)
                this.props.dispatch({type: 'submit', text: submitData})
            }
        })

    }
    render() {
        const {getFieldDecorator} = this.props.form
        const excludeControls = ['emoji', 'undo', 'redo', 'headings', 'list-ul', 'list-ol','font-size','font-family','line-height','letter-spacing','bold','italic']
        const myUploadFn = (param) => {
            console.log(param)
            const data = new FormData()
            data.append('myfile', param.file)

            axios.post('http://127.0.0.1:3001/upload', data, {
                    headers: {"Content-Type": "multipart/form-data"}})
                .then((res) => {
                    param.success({url:res.data})
            })
        }
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true,
                                message: '请输入标题',
                            }],
                        })(
                            <Input size="large" placeholder="请输入标题"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('content', {
                            validateTrigger: 'onBlur',
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
                                style={{border: '1px solid #eee', borderRadius: '3px'}}
                                media={{uploadFn: myUploadFn}}
                                excludeControls={excludeControls}
                            />
                        )}
                    </Form.Item>
                    {/*<Form.Item>*/}
                    {/*   {getFieldDecorator('tags')(*/}
                    {/*        <TagsInput  value={this.state.tags} onChange={::this.handleChange}*/}
                    {/*        />*/}
                    {/*   )}*/}
                    {/*</Form.Item>*/}
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
                <div className="braft-output-content"
                     dangerouslySetInnerHTML={{__html: this.props.submitdata.HtmlContent}}>
                </div>
                {/*<TagsInput value={this.state.tags} onChange={::this.handleChange} />*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    submitdata: state.submitdata
})
const mapDispatchToProps = (dispatch) => ({
    dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Formdemo))