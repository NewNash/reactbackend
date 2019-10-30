import React from "react";
import {Upload, Icon, Modal} from 'antd';
import './uploadimg.css'
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: '-2',
        name: 'image.png',
        status: 'done',
            url:'https://www.xs9999.com.hk/images/home/banner/gb2312/chj_1909c.jpg?v=1011'
        }]
    };

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    // handleChange = ({fileList}) => {
    //     this.setState({fileList})
    // };
    handleChange = (a,b,c)=>{
        console.log(a,b,c)
    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div >
                <Icon type="plus"/>
                <div className="ant-upload-text">封面图片</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    name='myfile'
                    action="https://stayalone.cn/uploadimg"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 2 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="titleImage" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}


export default class Category extends React.Component {

    render() {
        return (
            <div className='myupload'>
                <PicturesWall/>
            </div>
        )
    }
}
