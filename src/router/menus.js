import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '@/components/PrivateRoute';
import Loading from '@/components/Loading';

function myLoadable(fn) {
	return Loadable({
		loader: fn,
		loading: Loading,
	});
}

let Home = myLoadable(() => import('@/pages/Home'));
let ButtonDemo = myLoadable(() => import('@/pages/Basic/ButtonDemo'));
let IconDemo = myLoadable(() => import('@/pages/Basic/IconDemo'));
let DropdownDemo = myLoadable(() => import('@/pages/Navigation/DropdownDemo'));
let MenuDemo = myLoadable(() => import('@/pages/Navigation/MenuDemo'));
let StepsDemo = myLoadable(() => import('@/pages/Navigation/StepsDemo'));
let BasicForm = myLoadable(() => import('@/pages/Entry/Form/BasicForm'));
let UploadDemo = myLoadable(() => import('@/pages/Entry/UploadDemo'));
let TableDemo = myLoadable(() => import('@/pages/Display/TableDemo'));
let CarouselDemo = myLoadable(() => import('@/pages/Display/CarouselDemo'));
let CollapseDemo = myLoadable(() => import('@/pages/Display/CollapseDemo'));
let Page403 = myLoadable(() => import('@/pages/Other/Page403'));
let Page404 = myLoadable(() => import('@/pages/Other/Page404'));
let Page500 = myLoadable(() => import('@/pages/Other/Page500'));
let About = myLoadable(() => import('@/pages/About'));

export const menus = [
	{
		title: '首页',
		icon: 'home',
		key: '/home',
		component: Home
	},
	{
		title: '基本组件',
		icon: 'laptop',
		key: '/home/basic',
		subs: [
			{ key: '/home/basic/button', title: '按钮', component: ButtonDemo },
			{ key: '/home/basic/icon', title: '图标', component: IconDemo },
		]
	},
	{
		title: '导航组件',
		icon: 'bars',
		key: '/home/navigation',
		subs: [
			{ key: '/home/navigation/dropdown', title: '下拉菜单', component: DropdownDemo },
			{ key: '/home/navigation/menu', title: '导航菜单', component: MenuDemo },
			{ key: '/home/navigation/steps', title: '步骤条', component: StepsDemo },
		]
	},
	{
		title: '输入组件',
		icon: 'edit',
		key: '/home/entry',
		subs: [
			{
				key: '/home/entry/form',
				title: '表单',
				subs: [
					{ key: '/home/entry/form/basic-form', title: '基础表单', component: BasicForm }
				]
			},
			{ key: '/home/entry/upload', title: '上传', component: UploadDemo },
		]
	},
	{
		title: '显示组件',
		icon: 'desktop',
		key: '/home/display',
		subs: [
			{ key: '/home/display/table', title: '表格', component: TableDemo },
			{ key: '/home/display/carousel', title: '轮播图', component: CarouselDemo },
			{ key: '/home/display/collapse', title: '折叠面板', component: CollapseDemo }
		]
	},
	{
		title: '其它',
		icon: 'bulb',
		key: '/home/other',
		subs: [
			{ key: '/home/other/403', title: '403', component: Page403 },
			{ key: '/home/other/404', title: '404', component: Page404 },
			{ key: '/home/other/500', title: '500', component: Page500 },
		]
	},
	{
		title: '关于',
		icon: 'info-circle-o',
		key: '/about',
		component: About
	}
];

const MenuRoutes = () => {
	return (
		<Switch>
			{generateRoutes(menus)}
			<Redirect exact from="/" to="/home" />
		</Switch>
	);
};

function generateRoutes(data, result = []) {
	data.forEach((item) => {
		if (item.component) {
			result.push(<PrivateRoute exact path={item.key} component={item.component} />);
		}
		if (item.subs) {
			generateRoutes(item.subs, result);
		}
	});
	return result;
}

export default MenuRoutes;