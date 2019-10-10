import React from 'react';
import { Layout, BackTop } from 'antd';
import SiderNav from '@/components/SiderNav';
import HeaderBar from '@/components/HeaderBar';
import MenuRoutes from '@/router/menus';

const { Sider, Header, Content, Footer } = Layout;


class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false
		};
	}

	toggle = () => {
		this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
	}

	render() {
		// 设置Sider的minHeight可以使左右自适应对齐
		return (
			<div id="page">
				<Layout>
					<Sider
						collapsible
						trigger={null}
						collapsed={this.state.collapsed}
					>
						<SiderNav collapsed={this.state.collapsed} />
					</Sider>
					<Layout>
						<Header style={{ background: '#fff', padding: '0 16px' }}>
							<HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle} />
						</Header>
						<Content>
							<div style={{ padding: '16px', position: 'relative' }}>
								<MenuRoutes />
							</div>
						</Content>
						<Footer style={{ textAlign: 'center', paddingTop: '0' }}>
							React-Admin ©2019 Created by Jeson
							{' '}
							<a target="_blank" rel="noopener noreferrer" href="https://github.com/JesonMan/react-admin">github地址</a>
						</Footer>
					</Layout>
				</Layout>
				<BackTop visibilityHeight={200} style={{ right: 50 }} />
			</div>
		);
	}
}
export default Index;