import React from 'react';
import { Icon, Badge, Dropdown, Menu, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAuthenticated } from '@/utils/session';
import { logout } from '@/redux/actions/userStore';
import img from './images/avatar.jpg';
import style from './index.scss';

class HeaderBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 100,
			visible: false,
			avatar: img
		};
	}

	toggle = () => {
		this.props.onToggle();
	}

	logout = () => {
		this.props.logout();
		this.props.history.push({ pathname: '/login' });
	}

	render() {
		let { count, visible, avatar } = this.state;
		let { collapsed } = this.props;
		let menu = (
			<Menu className={style.menu}>
				<Menu.ItemGroup title="用户中心" className={style.menuGroup}>
					<Menu.Item>个人信息</Menu.Item>
					<Menu.Item><span onClick={this.logout}>退出登录</span></Menu.Item>
				</Menu.ItemGroup>
				<Menu.ItemGroup title="设置中心" className={style.menuGroup}>
					<Menu.Item>个人设置</Menu.Item>
					<Menu.Item>系统设置</Menu.Item>
				</Menu.ItemGroup>
			</Menu>
		);
		return (
			<div id="headerbar">
				<Icon
					type={collapsed ? 'menu-unfold' : 'menu-fold'}
					onClick={this.toggle}
				/>
				<div style={{ lineHeight: '64px', float: 'right' }}>
					<ul style={{ display: 'flex' }}>
						<li style={{ width: '60px', cursor: 'pointer' }} onClick={() => this.setState({ count: 0 })}>
							<Badge count={count} overflowCount={99} style={{ marginRight: -17 }}>
								<Icon type="notification" />
							</Badge>
						</li>
						<li style={{ width: 'auto', cursor: 'pointer', whiteSpace: 'nowrap' }}>
							<Dropdown overlay={menu}>
								<div>
									<img width="35" height="35" style={{ borderRadius: '100%', verticalAlign: 'middle' }} onClick={() => this.setState({ visible: true })} src={avatar} alt="" />
									<span style={{ marginLeft: '10px' }}>{isAuthenticated()}</span>
								</div>
							</Dropdown>
						</li>
					</ul>
				</div>
				<Modal
					footer={null}
					closable={false}
					visible={visible}
					onCancel={() => this.setState({ visible: false })}
				>
					<img src={avatar} alt="" width="100%" />
				</Modal>
			</div>
		);
	}
}

let mapDispatchToProps = (dispatch) => ({
	logout() {
		dispatch(logout());
	}
});

export default withRouter(connect(null, mapDispatchToProps)(HeaderBar));