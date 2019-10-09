import React, { Component } from 'react';
import { Menu, Row, Col, Card, Icon, Dropdown, Button } from 'antd';
import MyBreadcrumb from '@/components/MyBreadcrumb';

export default class DropdownDemo extends Component {
	render() {
		let menu1 = (
			<Menu>
				<Menu.Item>
					<a target="_blank" rel="noopener noreferrer" href="#">
						1st menu item
					</a>
				</Menu.Item>
				<Menu.Item>
					<a target="_blank" rel="noopener noreferrer" href="#">
						2nd menu item
					</a>
				</Menu.Item>
				<Menu.Item>
					<a target="_blank" rel="noopener noreferrer" href="#">
						3rd menu item
					</a>
				</Menu.Item>
			</Menu>
		);
		let { SubMenu } = Menu;
		let menu2 = (
			<Menu>
				<Menu.Item>1st menu item</Menu.Item>
				<Menu.Item>2nd menu item</Menu.Item>
				<SubMenu title="sub menu">
					<Menu.Item>3rd menu item</Menu.Item>
					<Menu.Item>4th menu item</Menu.Item>
				</SubMenu>
				<SubMenu title="disabled sub menu" disabled>
					<Menu.Item>5d menu item</Menu.Item>
					<Menu.Item>6th menu item</Menu.Item>
				</SubMenu>
			</Menu>
		);

		return (
			<div>
				<MyBreadcrumb arr={['导航组件', '下拉菜单']} />
				<Row gutter={16}>
					<Col span={12}>
						<Card title="基本">
							<Dropdown overlay={menu1}>
								<a className="ant-dropdown-link" href="#" style={{ marginRight: '40px' }}>
									Hover me
									{' '}
									<Icon type="down" />
								</a>
							</Dropdown>
							<Dropdown overlay={menu2}>
								<a className="ant-dropdown-link" href="#">
									Cascading menu
									{' '}
									<Icon type="down" />
								</a>
							</Dropdown>
						</Card>
						<Card title="带下拉框的按钮">
							<Dropdown overlay={menu1}>
								<Button>
									Button
									{' '}
									<Icon type="down" />
								</Button>
							</Dropdown>
						</Card>
					</Col>
					<Col span={12}>
						<Card title="弹出位置">
							<Dropdown overlay={menu1} placement="bottomLeft">
								<Button style={{ marginRight: '10px' }}>bottomLeft</Button>
							</Dropdown>
							<Dropdown overlay={menu1} placement="bottomCenter">
								<Button style={{ marginRight: '10px' }}>bottomCenter</Button>
							</Dropdown>
							<Dropdown overlay={menu1} placement="bottomRight">
								<Button>bottomRight</Button>
							</Dropdown>
							<br />
							<br />
							<Dropdown overlay={menu1} placement="topLeft">
								<Button style={{ marginRight: '10px' }}>topLeft</Button>
							</Dropdown>
							<Dropdown overlay={menu1} placement="topCenter">
								<Button style={{ marginRight: '10px' }}>topCenter</Button>
							</Dropdown>
							<Dropdown overlay={menu1} placement="topRight">
								<Button>topRight</Button>
							</Dropdown>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}