import React from 'react';
import { Form, Input, message } from 'antd';
import { connect } from 'react-redux';
import PromptBox from '@/components/PromptBox';
import { register } from '@/redux/actions/userStore';
import style from './index.scss';

class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			focusItem: -1 // 保存当前聚焦的input
		};
	}

	registerSubmit = (e) => {
		e.preventDefault();
		this.setState({
			focusItem: -1
		});
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// 检测用户名是否存在
				let result = this.props.users.find((item) => item.username === values.registerUsername);
				if (result) {
					this.props.form.setFields({
						registerUsername: {
							value: values.registerUsername,
							errors: [new Error('用户名已存在')]
						}
					});
					return;
				}
				this.props.register(values.registerUsername, values.registerPassword);
				message.success('注册成功');
			}
		});
	}

	gobackLogin = () => {
		this.props.switchShowBox('login');
		setTimeout(() => this.props.form.resetFields(), 500);
	}

	render() {
		let { getFieldDecorator, getFieldError, getFieldValue } = this.props.form;
		let { focusItem } = this.state;
		let registerUsernameError = getFieldError('registerUsername');
		let registerPasswordError = getFieldError('registerPassword');
		let confirmPasswordError = getFieldError('confirmPassword');
		return (
			<div className={`${this.props.className} ${style.registerFormWrap}`}>
				<h3 className={style.title}>管理员注册</h3>
				<Form onSubmit={this.registerSubmit}>
					<Form.Item
						help={
							registerUsernameError
							&& <PromptBox info={registerUsernameError} width={registerUsernameError} />
						}
					>
						{
							getFieldDecorator('registerUsername', {
								validateFirst: true,
								rules: [
									{ required: true, message: '用户名不能为空' },
									{ pattern: '^[^ ]+$', message: '不能输入空格' },
								]
							})(
								<Input
									onFocus={() => this.setState({ focusItem: 0 })}
									onBlur={() => this.setState({ focusItem: -1 })}
									maxLength={16}
									placeholder="用户名"
									addonBefore={<span className={focusItem === 0 ? `iconfont icon-User ${style.focus}` : 'iconfont icon-User'} />}
								/>
							)
						}
					</Form.Item>
					<Form.Item
						help={
							registerPasswordError
							&& <PromptBox info={registerPasswordError} width={registerPasswordError} />
						}
					>
						{
							getFieldDecorator('registerPassword', {
								validateFirst: true,
								rules: [
									{ required: true, message: '密码不能为空' },
									{ pattern: '^[^ ]+$', message: '密码不能有空格' }
								]
							})(
								<Input
									onFocus={() => this.setState({ focusItem: 1 })}
									onBlur={() => this.setState({ focusItem: -1 })}
									type="password"
									maxLength={16}
									placeholder="密码"
									addonBefore={<span className={focusItem === 1 ? `iconfont icon-suo1 ${style.focus}` : 'iconfont icon-suo1'} />}
								/>
							)
						}
					</Form.Item>
					<Form.Item
						help={
							confirmPasswordError
							&& <PromptBox info={confirmPasswordError} width={confirmPasswordError} />
						}
					>
						{
							getFieldDecorator('confirmPassword', {
								validateFirst: true,
								rules: [
									{ required: true, message: '请确认密码' },
									{
										validator: (rule, value, callback) => {
											if (value && value !== getFieldValue('registerPassword')) {
												callback('两次输入不一致！');
											}
											callback();
										}
									},
								]
							})(
								<Input
									onFocus={() => this.setState({ focusItem: 2 })}
									onBlur={() => this.setState({ focusItem: -1 })}
									type="password"
									maxLength={16}
									placeholder="确认密码"
									addonBefore={<span className={focusItem === 2 ? `iconfont icon-suo1 ${style.focus}` : 'iconfont icon-suo1'} style={focusItem === 2 ? styles.focus : {}} />}
								/>
							)
						}
					</Form.Item>
					<div className={style.bottom}>
						<input className={style.loginBtn} type="submit" value="注册" />
						<span onClick={this.gobackLogin} className={style.registerBtn}>返回登录</span>
					</div>
				</Form>
				<div className={style.footer}>
					<div>欢迎登陆后台管理系统</div>
				</div>
			</div>
		);
	}
}

let styles = {
	focus: {
		width: '20px',
		opacity: 1
	},
};

let mapStateToProps = (state) => ({
	users: state.userStore.users
});

let mapDispatchToProps = (dispatch) => ({
	register(username, password) {
		dispatch(register(username, password));
	}
});

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));