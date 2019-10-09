import React, { Component } from 'react';
import { Result, Button } from 'antd';
import MyBreadcrumb from '@/components/MyBreadcrumb';

export default class Page404 extends Component {
	render() {
		return (
			<div>
				<MyBreadcrumb arr={['其它', '404']} />
				<Result
					status="404"
					title="404"
					subTitle="Sorry, the page you visited does not exist."
					extra={<Button type="primary">Back Home</Button>}
				/>
			</div>
		);
	}
}