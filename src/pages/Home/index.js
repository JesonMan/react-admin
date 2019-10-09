import React, { Component } from 'react';
import { Row, Col, Card, Progress } from 'antd';
import echarts from 'echarts';
import MyEcharts from '@/components/MyEcharts';
import MyBreadcrumb from '@/components/MyBreadcrumb';
import cartImg from './images/cart.png';
import chatImg from './images/chat.png';
import heartImg from './images/heart.png';
import mailImg from './images/mail.png';

const { Meta } = Card;

export default class Home extends Component {
	constructor(props) {
		super(props);
		function randomData() {
			now = new Date(+now + oneDay);
			value = value + Math.random() * 21 - 10;
			return {
				name: now.toString(),
				value: [
					[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
					Math.round(value)
				]
			};
		}

		let data = [];
		let now = +new Date(1997, 9, 3);
		let oneDay = 24 * 3600 * 1000;
		let value = Math.random() * 1000;
		for (let i = 0; i < 1000; i++) {
			data.push(randomData());
		}

		setInterval(() => {
			for (let i = 0; i < 5; i++) {
				data.shift();
				data.push(randomData());
			}
			this.state.lineOption.series[0].data = data;
			this.setState((preState) => {
				return {
					lineOption: preState.lineOption
				};
			});
		}, 1000);

		this.state = {
			lineOption: {
				tooltip: {
					trigger: 'axis',
					formatter(params) {
						params = params[0];
						let date = new Date(params.name);
						return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} : ${params.value[1]}`;
					},
					axisPointer: {
						animation: false
					}
				},
				grid: {
					containLabel: true,
					top: 10,
					left: 0,
					right: 20,
					bottom: 0
				},
				xAxis: {
					type: 'time',
					splitLine: {
						show: false
					}
				},
				yAxis: {
					type: 'value',
					boundaryGap: [0, '100%'],
					splitLine: {
						show: false
					}
				},
				series: [{
					name: '模拟数据',
					type: 'line',
					showSymbol: false,
					hoverAnimation: false,
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgb(255, 70, 131)'
						}, {
							offset: 1,
							color: 'rgba(255, 70, 131, 0.1)'
						}])
					},
					data
				}]
			},
			pillarOption: {
				xAxis: {
					data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
					offset: 12,
				},
				tooltip: {
					show: true
				},
				grid: {
					containLabel: true,
					top: 10,
					left: 0,
					right: 20,
					bottom: 15
				},
				yAxis: {},
				series: [{
					type: 'bar',
					barWidth: 17,
					emphasis: {
						itemStyle: {
							color: '#52adff'
						}
					},
					itemStyle: {
						normal: {
							color: '#52adff',
							barBorderRadius: [0, 0, 0, 0],
						}
					},
					data: [220, 182, 191, 234, 290, 330, 310]
				}, {
					name: 'a',
					tooltip: {
						show: false
					},
					type: 'bar',
					barWidth: 17,
					emphasis: {
						itemStyle: {
							color: '#2e9bff'
						}
					},
					itemStyle: {
						normal: {
							color: '#2e9bff',
							barBorderRadius: [0, 0, 0, 0]
						}
					},
					data: [220, 182, 191, 234, 290, 330, 310],
					barGap: 0,
					legendHoverLink: false,
				}, {
					name: 'b',
					tooltip: {
						show: false
					},
					type: 'pictorialBar',

					itemStyle: {
						normal: {
							color: '#73bbff'
						}
					},
					symbol: 'image://data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAA/ElEQVQ4ja2VOw7CMBBEHyEV4iAUdIC4BxId3xbOk5qAoEIcBNFSUHAGKkQJaKUYmfgTJ8pISbHr3Zkd20ljdPoQiDaQ3B+8gTXwCimLjYgdXeAIdLJsHxgDN+tqDZERMbEAzlpzMsILMDNWlyAQS7bABmgZ2eK8lyBYoWNCL4G3wAElaOojkJF3RSN7YK1XBE4FFfDnQFTRkiL8BNv2oC5I71heKdADrjU2lws4lP2IcoHUWFoeB2CgBOsWybdlmT3PCo1V/USvt+1BqisIhNMBGwG+Agv2PkEuAn3kucMylZe747Q05JjK7cwrDJ4w9H+gGiZAE1gFHQTgC/m7OlXDmboLAAAAAElFTkSuQmCC',
					symbolRotate: 0,
					symbolSize: ['34', '24'],
					symbolOffset: ['0', '14'],
					symbolPosition: 'start',
					data: [220, 182, 191, 234, 290, 330, 310],
					z: 3
				}, {
					name: 'b',
					tooltip: {
						show: false
					},
					type: 'pictorialBar',
					itemStyle: {
						normal: {
							color: '#73bbff'
						}
					},
					symbol: 'image://data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAABIElEQVQ4jaWVMWoCQRSGv0iKFIm3MLVFYshFbGxMEwTTeQxrBTuFVMkRPMBWhhQpAh5CEBEJhMgjb2T0ze7Mrh8sLPNm5h++nZm9GMz/SKQOjLVrD9ikDLs0LWGawBvQ0GoLaAOfwd4eNdNieQYyb3L0PdNaIUUBN8ArMAGuTPW/baJ9rk1VyQsQJQugYyoW6fOhYwyhgJCSGLnK/ICYkhhBZS6gjJIYHZ2r6QKqKIlx65RJwAr4iQyowq/MKwHvwF3KoSnBl845dd9gCTx6V8E5TIEH4JuTXbQD+noFrCsEyN30pM/WNYbOQRVlouReV39EKABP2chULEdKUgNQZS8FykRJ91RJmQBHSJlTMosNTv0fOGVDvQZkM+Su+gCwB/qVO5cbNt4bAAAAAElFTkSuQmCC',
					symbolRotate: 0,
					symbolSize: ['34', '24'],
					symbolOffset: ['0', '-12'],
					symbolPosition: 'end',
					data: [220, 182, 191, 234, 290, 330, 310],
					z: 3
				}]
			},
			pieOption: {
				title: {
					text: '某站点用户访问来源',
					subtext: '纯属虚构',
					x: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
				},
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: [
							{ value: 335, name: '直接访问' },
							{ value: 310, name: '邮件营销' },
							{ value: 234, name: '联盟广告' },
							{ value: 135, name: '视频广告' },
							{ value: 1548, name: '搜索引擎' }
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			}
		};

		setInterval(() => {
			let randomData = [];
			for (let i = 0; i < 7; i++) {
				randomData.push(window.parseInt(Math.random() * 350) + 100);
			}
			this.state.pillarOption.series.forEach((item) => {
				item.data = randomData;
			});

			this.setState((preState) => {
				return {
					pillarOption: preState.pillarOption
				};
			});
		}, 5000);
	}

	CountUp() {
		let imgSrc = ['mail', 'chat', 'cart', 'heart'];
		let imgs = [mailImg, chatImg, cartImg, heartImg];
		let imgName = ['Mails', 'Dialogue', 'Carts', 'Collection'];
		let count = ['1379', '768', '192', '413'];
		let cu = imgSrc.map((item, index) => {
			return (
				<Col md={6} key={item}>
					<Card
						style={{ cursor: 'pointer' }}
					>
						<Meta
							style={{ fontSize: 22 }}
							avatar={<img src={imgs[index]} style={{ verticalAlign: 'middle', marginRight: '10px', marginLeft: '10px' }} alt="" />}
							title={imgName[index]}
							description={count[index]}
						/>
					</Card>
				</Col>
			);
		});
		return cu;
	}

	render() {
		let { lineOption, pillarOption, pieOption } = this.state;
		return (
			<div>
				<MyBreadcrumb />
				<Row gutter={16}>
					{this.CountUp()}
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Card title="折线图">
							<MyEcharts option={lineOption} height="250px" />
						</Card>
					</Col>
					<Col span={12}>
						<Card title="柱状图">
							<MyEcharts option={pillarOption} height="250px" />
						</Card>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Card title="饼图">
							<MyEcharts option={pieOption} height="250px" />
						</Card>
					</Col>
					<Col span={12}>
						<Card title="进度图" style={{ height: '346px' }}>
							<Progress
								strokeColor={{
									'0%': '#108ee9',
									'100%': '#87d068',
								}}
								percent={68}
								status="active"
							/>
							<Progress
								strokeColor={{
									from: '#108ee9',
									to: '#87d068',
								}}
								style={{ marginTop: '20px' }}
								percent={100}
							/>
							<Row gutter={16} style={{ marginTop: '40px' }}>
								<Col span={6}>
									<Progress
										type="circle"
										strokeColor={{
											'0%': '#108ee9',
											'100%': '#87d068',
										}}
										percent={90}
									/>
								</Col>
								<Col span={6}>
									<Progress
										type="circle"
										strokeColor={{
											'0%': '#108ee9',
											'100%': '#87d068',
										}}
										percent={100}
									/>
								</Col>
								<Col span={6}><Progress type="circle" percent={75} /></Col>
								<Col span={6}><Progress type="circle" percent={70} status="exception" /></Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}