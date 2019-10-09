import React, { Component } from 'react';
import { Card, Collapse } from 'antd';
import MyBreadcrumb from '@/components/MyBreadcrumb';

const { Panel } = Collapse;

let text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default class CollapseDemo extends Component {
	render() {
		return (
			<div>
				<MyBreadcrumb arr={['显示组件', '折叠面板']} />
				<Card title="基本用法">
					<Collapse defaultActiveKey={['1']} accordion>
						<Panel header="This is panel header 1" key="1">
							<p>{text}</p>
						</Panel>
						<Panel header="This is panel header 2" key="2">
							<p>{text}</p>
						</Panel>
						<Panel header="This is panel header 3" key="3">
							<p>{text}</p>
						</Panel>
					</Collapse>
				</Card>
			</div>
		);
	}
}