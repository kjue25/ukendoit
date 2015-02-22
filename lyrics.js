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


$(function() {

	var lyrics = $('#lyrics');
	var words = lyrics.html().split(" "); //array of words

	
	// setInterval(function() {
	// 	globalCount = (globalCount + 1) % words.length;
	// 	highlight(words, globalCount);
	// }, 1000);
	console.log(words);

	var timestamps;
	var counter = 0;

	console.log('hello');

	$("#play").click(function() {
		setLyricsTimer(highlightNextWord, timestamps);
		//start timer
		//highlight word with each time
	});

	function setLyricsTimer(callback, count, times) {
		// var 
		var interval = timestamps[count] - timestamsp[count-1];
	}

	$(document).keypress(function(e) {
		globalCount = globalCount + 1;
		if (globalCount >= words.length) {
			return;
		}
		
		highlight(words, globalCount);
		saveTime(words[globalCount]);
		$('#times').html(timeString(globalTimes));
		// console.log(globalTimes);
		// var select = getNextWord();
		// select = new String(select).s plit(" ");
		// timestamps[counter] = new Date().getTime();
		// console.log(timestamps[counter]);
		// counter++;
	});
});