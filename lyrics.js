var times;
$(function() {

	var lyrics = $('#lyrics');
	var words = lyrics.html().split(" "); //array of words

	function highlight(wordNum) {
		lyrics.html("");
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
	var count = 0;
	setInterval(function() {
		count = (count + 1) % words.length;
		highlight(count);
	}, 1000);
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
		var select = getNextWord();
		select = new String(select).split(" ");
		timestamps[counter] = new Date().getTime();
		console.log(timestamps[counter]);
		counter++;
	});
});