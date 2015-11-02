import './index-1.scss';


import $ from 'expose?jQuery!jquery';
import Bacon from 'baconjs';


$(document).ready(() => {

	////////// Hello World

	var message = $('#hello');

	var button = $('#hello-button');

	button.on('click', () => {
		message.text('Hello Universe!');
	});


	////////// Counter (with Bacon.js)

	var allOperations = Bacon.mergeAll(
			$('#minus-1').asEventStream('click').map(-1),
			$('#plus-1').asEventStream('click').map(+1),
			$('#plus-5').asEventStream('click').map(+5),
			$('#plus-10').asEventStream('click').map(+10)
	);

	var counter = allOperations.scan(0, (counter, value) => counter + value);

	//counter.onValue((counter) => {
	//	$('#counter').text(counter);
	//});

	counter.assign($('#counter'), 'text');

});
