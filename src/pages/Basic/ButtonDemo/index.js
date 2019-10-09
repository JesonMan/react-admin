import React, { Component } from 'react';
import { Button, Row, Col, Card, Icon, Radio } from 'antd';
import MyBreadcrumb from '@/components/MyBreadcrumb';
import style from './index.scss';

export default class ButtonDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			size: 'large'
		};
	}

	handleSizeChange = (e) => {
		this.setState({ size: e.target.value });
	};

	render() {
		let { size } = this.state;
		return (
			<div className={style.buttonWrap}>
				<MyBreadcrumb arr={['基本组件', '按钮']} />
				<Row gutter={16}>
					<Col span={12}>
						<Card title="按钮类型">
							<Button type="primary">Primary</Button>
							<Button>Default</Button>
							<Button type="dashed">Dashed</Button>
							<Button type="danger">Danger</Button>
							<Button type="link">Link</Button>
						</Card>
						<Card title="按钮尺寸">
							<Radio.Group value={size} onChange={this.handleSizeChange}>
								<Radio.Button value="large">Large</Radio.Button>
								<Radio.Button value="default">Default</Radio.Button>
								<Radio.Button value="small">Small</Radio.Button>
							</Radio.Group>
							<br />
							<br />
							<Button type="primary" size={size}>Primary</Button>
							<Button size={size}>Normal</Button>
							<Button type="dashed" size={size}>Dashed</Button>
							<Button type="danger" size={size}>Danger</Button>
							<Button type="link" size={size}>Link</Button>
							<br />
							<br />
							<Button type="primary" icon="download" size={size} />
							<Button type="primary" shape="circle" icon="download" size={size} />
							<Button type="primary" shape="round" icon="download" size={size} />
							<Button type="primary" shape="round" icon="download" size={size}>Download</Button>
							<Button type="primary" icon="download" size={size}>Download</Button>
							<br />
							<br />
							<Button.Group size={size}>
								<Button type="primary">
									<Icon type="left" />
									Backward
								</Button>
								<Button type="primary">
									Forward
									<Icon type="right" />
								</Button>
							</Button.Group>
						</Card>
						<Card title="加载中状态">
							<Button type="primary" loading>
								Loading
							</Button>
							<Button type="primary" size="small" loading>
								Loading
							</Button>
							<br />
							<br />
							<Button type="primary" loading />
							<Button type="primary" shape="circle" loading />
							<Button type="danger" shape="round" loading />
						</Card>
					</Col>
					<Col span={12}>
						<Card title="图标按钮">
							<Button type="primary" shape="circle" icon="search" />
							<Button type="primary" shape="circle">A</Button>
							<Button type="primary" icon="search">Search</Button>
							<Button shape="circle" icon="search" />
							<Button icon="search">Search</Button>
							<Button type="dashed" shape="circle" icon="search" />
							<Button type="dashed" icon="search">
								Search
							</Button>
						</Card>
						<Card title="不可用状态">
							<Button type="primary">Primary</Button>
							<Button type="primary" disabled>
								Primary(disabled)
							</Button>
							<br />
							<br />
							<Button>Default</Button>
							<Button disabled>Default(disabled)</Button>
							<br />
							<br />
							<Button type="dashed">Dashed</Button>
							<Button type="dashed" disabled>
								Dashed(disabled)
							</Button>
							<br />
							<br />
							<Button type="link">Link</Button>
							<Button type="link" disabled>
								Link(disabled)
							</Button>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}