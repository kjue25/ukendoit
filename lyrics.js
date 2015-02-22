function highlight(words, wordNum) {
	$('#lyrics').html("");
	var el = $('<span></span>');
	var text = '';
	for (var i=0; i < wordNum; i++){
		text += words[i] + " ";
	}
	console.log("text", text);
	el.html(text);
	$('#lyrics').append(el);

	$('#lyrics').append($('<span style="color:red">'+words[wordNum]+'</span>'));

	el = $('<span></span>');
	text = '';
	for (var i=wordNum+1; i < words.length; i++) {
		text += " " + words[i];

	}
	el.html(text);
	$('#lyrics').append(el);
}

var globalTimes = [];
var globalCount = -1;

function saveTime(word) {
	globalTimes.push({word: word , time: (new Date()).getTime()});
};

function timeString(times) {
	var startTime = times[0].time;
	var ret = '';
	for (var i = 0; i < times.length; i++) {
		var t = times[i].time - startTime;
		ret += times[i].word + ': ' + t + '\n';
	}
	return ret;
}

//need to set time being passed into setInterval
function demoHighlight(words, times, count) {
	 setTimeout(function() {
	 	count = (count + 1) % words.length;
	 	highlight(words, count);
	 	demoHighlight(words, times, count);
	 }, times[count].time);
}

//make array 2D to account for line breaks

$(function() {

	var lyrics = $('#lyrics');
	var words = lyrics.html().split(" "); //array of words

	console.log(words);

	var timestamps;
	var counter = 0;

	console.log('hello');

	$("#play").click(function() {
		demoHighlight(words, globalTimes);
	});

	$(document).keypress(function(e) {
		globalCount = globalCount + 1;
		if (globalCount >= words.length) {
			return;
		}
		
		highlight(words, globalCount);
		saveTime(words[globalCount]);
		$('#times').html(timeString(globalTimes));
	});
});