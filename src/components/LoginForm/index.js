import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { randomNum } from '@/utils/utils';
import PromptBox from '@/components/PromptBox';
import { login } from '@/redux/actions/userStore';
import style from './index.scss';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			focusItem: -1, // 保存当前聚焦的input
			code: '' // 验证码
		};
		this.canvas = React.createRef();
	}

	componentDidMount() {
		this.createCode();
	}

	// 生成验证码
	createCode = () => {
		let ctx = this.canvas.current.getContext('2d');
		let chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		let code = '';
		ctx.clearRect(0, 0, 80, 39);
		for (let i = 0; i < 4; i++) {
			let char = chars[randomNum(0, 57)];
			code += char;
			ctx.font = `${randomNum(20, 25)}px SimHei`; // 设置字体随机大小
			ctx.fillStyle = '#D3D7F7';
			ctx.textBaseline = 'middle';
			ctx.shadowOffsetX = randomNum(-3, 3);
			ctx.shadowOffsetY = randomNum(-3, 3);
			ctx.shadowBlur = randomNum(-3, 3);
			ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
			let x = 80 / 5 * (i + 1);
			let y = 39 / 2;
			let deg = randomNum(-25, 25);
			/** 设置旋转角度和坐标原点* */
			ctx.translate(x, y);
			ctx.rotate(deg * Math.PI / 180);
			ctx.fillText(char, 0, 0);
			/** 恢复旋转角度和坐标原点* */
			ctx.rotate(-deg * Math.PI / 180);
			ctx.translate(-x, -y);
		}
		this.setState({
			code
		});
	}

	loginSubmit = (e) => {
		e.preventDefault();
		this.setState({
			focusItem: -1
		});
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// 表单登录时，若验证码长度小于4则不会验证，所以我们这里要手动验证一次，线上的未修复
				if (this.state.code.toUpperCase() !== values.verification.toUpperCase()) {
					this.props.form.setFields({
						verification: {
							value: values.verification,
							errors: [new Error('验证码错误')]
						}
					});
					return;
				}

				// 检测用户名是否存在
				let result = this.props.users.find((item) => item.username === values.username);
				if (!result) {
					this.props.form.setFields({
						username: {
							value: values.username,
							errors: [new Error('用户名不存在')]
						}
					});
					return;
				}
				// 检测密码是否错误
				if (result.password !== values.password) {
					this.props.form.setFields({
						password: {
							value: values.password,
							errors: [new Error('密码错误')]
						}
					});
					return;
				}


				this.props.login(values.username);

				let { from } = this.props.location.state || { from: { pathname: '/' } };
				this.props.history.push(from);
			}
		});
	}

	register = () => {
		this.props.switchShowBox('register');
		setTimeout(() => this.props.form.resetFields(), 500);
	}

	render() {
		let { getFieldDecorator, getFieldError } = this.props.form;
		let { focusItem } = this.state;
		let usernameError = getFieldError('username');
		let passwordError = getFieldError('password');
		let verificationError = getFieldError('verification');
		return (
			<div className={`${this.props.className} ${style.loginFormWrap}`}>
				<h3 className={style.title}>管理员登录</h3>
				<Form onSubmit={this.loginSubmit}>
					<Form.Item
						help={
							usernameError
							&& <PromptBox info={usernameError} width={usernameError} />
						}
					>
						{
							getFieldDecorator('username', {
								rules: [{ required: true, message: '请输入用户名' }]
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
							passwordError
							&& <PromptBox info={passwordError} width={passwordError} />
						}
					>
						{
							getFieldDecorator('password', {
								rules: [{ required: true, message: '请输入密码' }]
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

					<Row>
						<Col span={15}>
							<Form.Item
								help={
									verificationError
								&& <PromptBox style={{ 'margin-left': '99px' }} info={verificationError} width={verificationError} />
								}
							>
								{
									getFieldDecorator('verification', {
										validateFirst: true,
										rules: [{ required: true, message: '请输入验证码' }]
									})(
										<Input
											onFocus={() => this.setState({ focusItem: 2 })}
											onBlur={() => this.setState({ focusItem: -1 })}
											maxLength={4}
											placeholder="验证码"
											addonBefore={(
												<span
													className={focusItem === 2 ? `iconfont icon-securityCode-b ${style.focus}` : 'iconfont icon-securityCode-b'}
												/>
											)}
										/>
									)
								}
							</Form.Item>
						</Col>
						<Col span={9}>
							<canvas style={{ position: 'relative', 'z-index': '100' }} onClick={this.createCode} width="80" height="39" ref={this.canvas} />
						</Col>
					</Row>
					<div className={style.bottom}>
						<input className={style.loginBtn} type="submit" value="登录" />
						<span onClick={this.register} className={style.registerBtn}>注册</span>
					</div>
				</Form>
				<div className={style.footer}>
					<div>欢迎登陆后台管理系统</div>
				</div>
			</div>
		);
	}
}

let mapStateToProps = (state) => ({
	users: state.userStore.users
});

let mapDispatchToProps = (dispatch) => ({
	login(username) {
		dispatch(login(username));
	}
});

export default Form.create()(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm)));