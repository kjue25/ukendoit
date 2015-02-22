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

function getPauseTimes(times) {
    var ret = [];

    ret.push({time: 0, word: times[0].word});
	for (var i = 1; i < times.length; i++) {
        ret.push({time: times[i].time - times[i - 1].time, word: times[i].word});
	}
    return ret;
}

function timeString(times) {
    times = getPauseTimes(times);
	var ret = '';
	for (var i = 0; i < times.length; i++) {
		ret += times[i].word + ': ' + times[i].time + '\n';
	}
	return ret;
}

//need to set time being passed into setInterval
function demoHighlight(words, times, count) {
    if (count >= times.length) {
        return;
    }
    console.log('timeout', times[count].time, 'count', count);
	 setTimeout(function() {
	 	highlight(words, count);
        count = count + 1;
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
        demoHighlight(words, getPauseTimes(globalTimes), 0);
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
