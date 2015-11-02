import './index.scss';

import $ from 'expose?jQuery!jquery';
import Bacon from 'baconjs';
import Firebase from 'firebase';

// https://web-development-2015.firebaseio.com/

var fbRoot = new Firebase('//web-development-2015.firebaseio.com');
var fbDrawings = fbRoot.child('drawings');
var fbDrawingsStream = Bacon.fromEventTarget(fbDrawings, 'child_added').map('.val');

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

$('document').ready(() => {


	var color = getRandomColor();

	console.log(color);



	/* the canvas */
	var canvas = $('canvas');

	/* convenience function */
	var toCoords = (e) => [e.clientX - canvas.offset().left, e.clientY - canvas.offset().top];

	/* capture drawings from the mouse */
	var mouseDowns = canvas     .asEventStream('mousedown').doAction('.preventDefault');
	var mouseMoves = $(document).asEventStream('mousemove').doAction('.preventDefault');
	var mouseUps   = $(document).asEventStream('mouseup')  .doAction('.preventDefault');
	var mouseDrawings = mouseDowns.flatMap(() => mouseMoves.map(toCoords).slidingWindow(2, 2).takeUntil(mouseUps));

	/* capture drawings from the touchscreen */
	var touchDowns = canvas     .asEventStream('touchstart').doAction('.preventDefault');
	var touchMoves = $(document).asEventStream('touchmove') .doAction('.preventDefault');
	var touchUps   = $(document).asEventStream('touchend')  .doAction('.preventDefault');
	var touchDrawings = touchDowns.flatMap(() => touchMoves.map('.originalEvent.touches.0').map(toCoords).slidingWindow(2, 2).takeUntil(touchUps));

	/* publish mouse drawings to FireBase */
	mouseDrawings.merge(touchDrawings).onValue((segment) => {
		fbDrawings.push({
			color: color,
			segments: [segment]
		});
	});

	/* display FireBase drawings on the canvas */
	var context = canvas[0].getContext('2d');
	fbDrawingsStream.onValue(({ segments: [[[x1, y1], [x2, y2]]], color: kleurtje }) => {
		context.beginPath();
		context.lineWidth = 2;
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.strokeStyle = kleurtje;
		context.stroke();
	});

});
