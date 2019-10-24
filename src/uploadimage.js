import React from "react";
import {Upload, Icon, Modal} from 'antd';
import {connect} from 'react-redux'
// import './uploadimg.css'

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//     });
// }

class UploadImg extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: this.props.imgurl ? [{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: this.props.imgurl
        }] : []
    };

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = file => {
        // console.log(file)
        // if (!file.url && !file.preview) {
        //     file.preview = await getBase64(file.originFileObj);
        // }
        this.setState({
            previewImage: file.url||file.response.data,
            previewVisible: true,
        });
    };
    handleChange = (info) => {
        let fileList = info.fileList
        this.setState({fileList: [...fileList]});
        if (info.file.status === 'done') {
            this.props.dispatch({type: 'coverImgUrl', text: info.file.response.data})
        }

    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">封面图片</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    name='mycoverimg'
                    action="https://stayalone.cn/uploadimg"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}

                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="titleImage" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

export default connect()(UploadImg)