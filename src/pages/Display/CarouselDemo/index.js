import React, { Component } from 'react';
import { Card, Carousel } from 'antd';
import MyBreadcrumb from '@/components/MyBreadcrumb';

export default class CarouselDemo extends Component {
	render() {
		return (
			<div>
				<MyBreadcrumb arr={['显示组件', '轮播图']} />
				<Card title="基本用法">
					<Carousel autoplay>
						<div>
							<h3>1</h3>
						</div>
						<div>
							<h3>2</h3>
						</div>
						<div>
							<h3>3</h3>
						</div>
						<div>
							<h3>4</h3>
						</div>
					</Carousel>
				</Card>
			</div>
		);
	}
}