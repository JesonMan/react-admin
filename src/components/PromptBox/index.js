import React from 'react';
import { calculateWidth } from '@/utils/utils';

class Promptbox extends React.Component {
	componentDidMount() {
		this.addContent();
	}

	addContent() {
		let ctx = this.canvas.getContext('2d');
		let width = calculateWidth(this.props.width[0]);
		ctx.strokeStyle = '#fff';
		ctx.shadowOffsetX = -2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 2;
		ctx.shadowColor = 'rgba(0,0,0,.3)';
		ctx.beginPath();
		ctx.moveTo(0, 20);
		ctx.lineTo(8, 16);
		ctx.lineTo(8, 1);
		ctx.lineTo(width - 1, 1);
		ctx.lineTo(width - 1, 39);
		ctx.lineTo(8, 39);
		ctx.lineTo(8, 23);
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = '#D3D7F7';
		ctx.textBaseline = 'middle';
		ctx.font = '14px sans-serif';
		ctx.beginPath();
		ctx.fillText(this.props.info, 20, 20);
	}

	render() {
		return (
			<div style={this.props.style}>
				<canvas key={this.props.info} height="41" width={calculateWidth(this.props.width[0])} ref={(el) => this.canvas = el} />
			</div>
		);
	}
}
export default Promptbox;