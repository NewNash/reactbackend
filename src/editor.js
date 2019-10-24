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
import UploadImage from "./uploadimage";
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css'
import './uploadimg.css'
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
    constructor(){
        super()
        this.state={tags:[]}
    }
    handleTagsInputChange(tags){
        this.setState({tags:tags})
    }
    componentDidMount() {
        this.props.dispatch({type: 'getCategory'})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.form.validateFields((error, values) => {
            console.log(values)
            if (!error) {
                const submitData = {
                    imgSrc:this.props.coverImgUrl,
                    title: values.title,
                    content: values.content.toRAW(),
                    HtmlContent: values.content.toHTML(),
                    currentCategory: values.category,
                    category: values.category[0],
                    subCategory:values.category[1],
                    tag:values.tags
                }
                console.log(submitData)
                this.props.dispatch({type: 'submit', text: submitData})
            }
        })
    }

    render() {
        const ifEditContent = this.props.location.pathname==='/admin/edit-content'
        const init_content = this.props.location.state?this.props.location.state.text:{}
        const {getFieldDecorator} = this.props.form
        const excludeControls = ['emoji', 'undo', 'redo', 'headings', 'list-ul', 'list-ol', 'font-size',
            'font-family', 'line-height', 'letter-spacing', 'bold', 'italic']
        const myUploadFn = (param) => {
            const data = new FormData()
            data.append('mycontentimg', param.file)
            axios.post('https://stayalone.cn/uploadimg', data, {
                headers: {"Content-Type": "multipart/form-data"}
            })
                .then((res) => {
                    param.success({url: res.data.data})
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
                {/*<UploadImage/>*/}
                <Form onSubmit={this.handleSubmit}>
                    <UploadImage
                        imgurl={ifEditContent?init_content.imgSrc:''}
                    />
                    <Form.Item
                    >
                        {getFieldDecorator('title', {
                            initialValue: ifEditContent?init_content.title:'',
                            rules: [{
                                required: true,
                                message: '请输入标题',
                            }],
                        })(
                            <Input placeholder='请输入标题'
                                   style={{width:'40%'}}
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                    >
                        {getFieldDecorator('category', {
                            initialValue: ifEditContent?[init_content.category, init_content.subCategory]:[]
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
                            initialValue: ifEditContent?BraftEditor.createEditorState(init_content.content):'',
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
                                className='myBraftEditor'
                                media={{uploadFn: myUploadFn}}
                                excludeControls={excludeControls}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('tags',{
                            initialValue:ifEditContent?init_content.tag:[]
                        })(
                            <TagsInput style={{lineHeight:2}}
                               onchange={(e)=>this.handleTagsInputChange(e)}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
                {/*<div className="braft-output-content"*/}
                {/*     dangerouslySetInnerHTML={{__html: this.props.submitdata.HtmlContent}}>*/}
                {/*</div>*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    submitdata: state.submitdata,
    content: state.content,
    category: state.category,
    currentSubcategory: state.currentSubcategory,
    coverImgUrl:state.coverImgUrl
})
const mapDispatchToProps = (dispatch) => ({
    dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Formdemo))