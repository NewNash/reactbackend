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
                    content: values.content.toHTML() // or values.content.toHTML()
                }
                console.log(submitData)
                this.props.dispatch({type: 'submit', text: submitData})
            }
        })

    }

    render() {
        const {getFieldDecorator} = this.props.form
        const excludeControls = ['emoji', 'undo', 'redo', 'headings', 'list-ul', 'list-ol']
        const myUploadFn = (param) => {
            const serverURL = 'http://upload-server'
            const xhr = new XMLHttpRequest
            const fd = new FormData()

            const successFn = (response) => {
                // 假设服务端直接返回文件上传后的地址
                // 上传成功后调用param.success并传入上传后的文件地址
                param.success({
                    url: xhr.responseText,
                    meta: {
                        id: 'xxx',
                        title: 'xxx',
                        alt: 'xxx',
                        loop: true, // 指定音视频是否循环播放
                        autoPlay: true, // 指定音视频是否自动播放
                        controls: true, // 指定音视频是否显示控制栏
                        poster: 'http://xxx/xx.png', // 指定视频播放器的封面
                    }
                })
            }

            const progressFn = (event) => {
                // 上传进度发生变化时调用param.progress
                param.progress(event.loaded / event.total * 100)
            }

            const errorFn = (response) => {
                // 上传发生错误时调用param.error
                param.error({
                    msg: 'unable to upload.'
                })
            }

            xhr.upload.addEventListener("progress", progressFn, false)
            xhr.addEventListener("load", successFn, false)
            xhr.addEventListener("error", errorFn, false)
            xhr.addEventListener("abort", errorFn, false)

            fd.append('file', param.file)
            xhr.open('POST', serverURL, true)
            xhr.send(fd)

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
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
                <div className="braft-output-content"
                     dangerouslySetInnerHTML={{__html: this.props.submitdata.content}}>

                </div>
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