import React, { Component } from 'react';
import { Card, Table, Divider, Tag } from 'antd';
import MyBreadcrumb from '@/components/MyBreadcrumb';

let columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a>{text}</a>,
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Tags',
		key: 'tags',
		dataIndex: 'tags',
		render: (tags) => (
			<span>
				{tags.map((tag) => {
					let color = tag.length > 5 ? 'geekblue' : 'green';
					if (tag === 'loser') {
						color = 'volcano';
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</span>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: (text, record) => (
			<span>
				<a>
					Invite
					{' '}
					{record.name}
				</a>
				<Divider type="vertical" />
				<a>Delete</a>
			</span>
		),
	},
];

let data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
];

export default class TableDemo extends Component {
	render() {
		return (
			<div>
				<MyBreadcrumb arr={['显示组件', '表格']} />
				<Card title="基本用法">
					<Table bordered columns={columns} dataSource={data} />
				</Card>
			</div>
		);
	}
}