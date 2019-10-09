import React, { Component } from 'react';
import { Result, Button } from 'antd';
import MyBreadcrumb from '@/components/MyBreadcrumb';

export default class Page500 extends Component {
	render() {
		return (
			<div>
				<MyBreadcrumb arr={['其它', '500']} />
				<Result
					status="500"
					title="500"
					subTitle="Sorry, the server is wrong."
					extra={<Button type="primary">Back Home</Button>}
				/>
			</div>
		);
	}
}