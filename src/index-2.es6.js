import './index-2.scss';

import $ from 'expose?jQuery!jquery';
import Bacon from 'baconjs';


$('document').ready(() => {

	var canvas = $('canvas');
	var context = canvas[0].getContext('2d');

	var mouseDowns = canvas.asEventStream('mousedown').doAction('.preventDefault');
	var mouseMoves = $(document).asEventStream('mousemove');
	var mouseUps = $(document).asEventStream('mouseup');

	var toCoords = (e) => [e.clientX - canvas.offset().left, e.clientY - canvas.offset().top];

	var drawings = mouseDowns.flatMap(() => mouseMoves.map(toCoords).slidingWindow(2, 2).takeUntil(mouseUps));

	drawings.onValue(([ [x1, y1], [x2, y2] ]) => {
		context.beginPath();
		context.lineWidth = 2;
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();
	});

});
