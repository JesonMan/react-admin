import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { menus } from '@/router/menus';
import logo from './images/logo.svg';

let styles = {
	h1: {
		display: 'inline-block',
		verticalAlign: 'middle',
		color: '#1890ff',
		marginLeft: '10px',
		marginBottom: '22px'
	}
};

class SiderNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openKeys: [],
			selectedKeys: []
		};
	}

	componentDidMount() {
		// 刷新页面或直接通过url访问页面时自动处理菜单
		let pathname = this.props.location.pathname;
		// 获取当前所在的目录层级
		let rank = pathname.split('/');
		switch (rank.length) {
			case 2: // 一级目录
				this.setState({
					selectedKeys: [pathname]
				});
				break;
			case 4: // 二级目录
				this.setState({
					selectedKeys: [pathname],
					openKeys: [rank.slice(0, 3).join('/')]
				});
				break;
			case 5: // 三级目录，要展开两个subMenu
				this.setState({
					selectedKeys: [pathname],
					openKeys: [rank.slice(0, 3).join('/'), rank.slice(0, 4).join('/')]
				});
				break;
			default:
				this.setState({
					selectedKeys: [pathname],
					openKeys: []
				});
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		// 当点击面包屑导航时，侧边栏要同步响应
		let pathname = nextProps.location.pathname;
		if (this.props.location.pathname !== pathname) {
			this.setState({
				selectedKeys: [pathname]
			});
		}
	}

	onOpenChange = (openKeys) => {
		// 此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
		if (openKeys.length === 0 || openKeys.length === 1) {
			this.setState({
				openKeys
			});
			return;
		}

		// 最新展开的菜单
		let latestOpenKey = openKeys[openKeys.length - 1];
		// 判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
		if (latestOpenKey.includes(openKeys[0])) {
			this.setState({
				openKeys
			});
		} else {
			this.setState({
				openKeys: [latestOpenKey]
			});
		}
	}

	renderMenuItem = ({ key, icon, title }) => {
		return (
			<Menu.Item key={key}>
				<Link to={key}>
					{icon && <Icon type={icon} />}
					<span>{title}</span>
				</Link>
			</Menu.Item>
		);
	}

	renderSubMenu = ({ key, icon, title, subs }) => {
		return (
			<Menu.SubMenu
				key={key}
				title={(
					<span>
						{icon && <Icon type={icon} />}
						<span>{title}</span>
					</span>
				)}
			>
				{
					subs.map((item) => {
						return item.subs && item.subs.length > 0
							? this.renderSubMenu(item) : this.renderMenuItem(item);
					})
				}
			</Menu.SubMenu>
		);
	}

	render() {
		let { openKeys, selectedKeys } = this.state;
		let defaultProps = this.props.collapsed ? {} : { openKeys };
		return (
			<div style={{ height: '100vh', overflowY: 'scroll' }}>
				<div style={{ height: '32px', margin: '16px', textAlign: 'center', whiteSpace: 'nowrap' }}>
					<img width="36" alt="logo" src={logo} />
					{!this.props.collapsed && <h1 style={styles.h1}>后台管理系统</h1>}
				</div>
				<Menu
					{...defaultProps}
					onOpenChange={this.onOpenChange}
					onClick={({ key }) => this.setState({ selectedKeys: [key] })}
					selectedKeys={selectedKeys}
					theme="dark"
					mode="inline"
				>
					{
						menus.map((item) => {
							return item.subs && item.subs.length > 0
								? this.renderSubMenu(item) : this.renderMenuItem(item);
						})
					}
				</Menu>
			</div>
		);
	}
}

export default withRouter(SiderNav);