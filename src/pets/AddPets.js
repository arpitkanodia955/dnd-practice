import React from "react";
import {Form, Modal, Upload, message, Button, Input } from 'antd';

class AddPets extends React.Component {

    state = { image: [],index: 7 };

    onSubmit = (values) => {
        const { lastIndex } = this.props
        console.log('values',lastIndex)
        const { index,image} = this.state
        let data = {
            id: lastIndex + 1,
            name: values.name,
            thumb: image && image.file ? image.file.thumbUrl : '',
            done: false,
            day_index:''
        }
        console.log('data',data)
        this.props.appendData(data)
        this.props.onCancel()

    }

    uploadPhoto = ({ file, fileList }) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 4;
        if (!isJpgOrPng) {
          message.error('You can only upload JPG , JPEG  & PNG file!');
          return false
        } else if (!isLt2M) {
          message.error('Image must smaller than 4MB!');
          return false
        } else {
          this.setState({ image: fileList });
        }
      }

    dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess('ok');
        }, 0);
    };

    render(){
        const { image } = this.state
        const { visible } = this.props
        const uploadButton = (
            <div>
              <div className='ant-upload-text'>Upload</div>
            </div>
          );
        return(
            <div>
                <Modal 
                    title="Add pets" 
                    visible={visible} 
                    onCancel={this.props.onCancel}
                    footer={false}
                >
                    <Form onFinish={this.onSubmit}>
                        <Form.Item label="Name" name={'name'}>
                            <Input placeholder="Enter the name" />
                        </Form.Item>
                        <Form.Item label="Upload Photo" name={'thumb'}>
                        <Upload
                            name='avatar'
                            listType='picture-card'
                            className='avatar-uploader'
                            showUploadList={true}
                            fileList={image}
                            customRequest={this.dummyRequest}
                            onChange={this.uploadPhoto}
                        >
                            {image.length >=1 ? null : uploadButton}
                        </Upload>
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType={'submit'}>Submit</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default AddPets