import React from 'react';
import style from './index.scss';

export default () => (
	<svg className={style.load} viewBox="10 10 80 80">
		<circle className={style.loading} cx="50" cy="50" r="30" />
	</svg>
);