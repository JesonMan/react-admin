import React, { Component } from 'react';
import { Card } from 'antd';
import MyBreadcrumb from '@/components/MyBreadcrumb';

export default class About extends Component {
	render() {
		return (
			<div>
				<MyBreadcrumb arr={['关于']} />
				<Card title="关于">
					这个人很懒，什么也没留下～
				</Card>
			</div>
		);
	}
}