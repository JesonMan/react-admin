import React, { Component } from 'react';
import { Upload, Icon, Modal, Card } from 'antd';
import MyBreadcrumb from '@/components/MyBreadcrumb';

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

export default class UploadDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			previewVisible: false,
			previewImage: '',
			fileList: [
				{
					uid: '-1',
					name: 'image.png',
					status: 'done',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
				},
				{
					uid: '-2',
					name: 'image.png',
					status: 'done',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
				},
				{
					uid: '-3',
					name: 'image.png',
					status: 'done',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
				},
				{
					uid: '-4',
					name: 'image.png',
					status: 'done',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
				},
				{
					uid: '-5',
					name: 'image.png',
					status: 'done',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
				},
			],
		};
	}

	handleCancel = () => this.setState({ previewVisible: false });

	handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
		});
	};

	handleChange = ({ fileList }) => this.setState({ fileList });

	render() {
		let { previewVisible, previewImage, fileList } = this.state;
		let uploadButton = (
			<div>
				<Icon type="plus" />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		return (
			<div className="clearfix">
				<MyBreadcrumb arr={['输入组件', '上传']} />
				<Card title="图片墙">
					<Upload
						action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
						listType="picture-card"
						fileList={fileList}
						onPreview={this.handlePreview}
						onChange={this.handleChange}
					>
						{fileList.length >= 8 ? null : uploadButton}
					</Upload>
					<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
						<img alt="example" style={{ width: '100%' }} src={previewImage} />
					</Modal>
				</Card>
			</div>
		);
	}
}