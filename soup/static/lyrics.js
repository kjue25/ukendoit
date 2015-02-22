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
var globalStartTime = -1;

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
//
var setupKeypress = function(data) {
	var lyrics = $('#lyrics');
	var words = lyrics.html().split(" "); //array of words

	console.log(words);

	var timestamps;

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
        if (globalStartTime < 0) {
            setDelay(data, globalCount, 0);
        } else {
            setDelay(data, globalCount, (new Date()).getTime() - globalStartTime);
        }
        globalStartTime = (new Date()).getTime();
        //$('#times').html(timeString(globalTimes));
        $('#times').html(JSON.stringify(data).replace(/'/g, ""));
    });
};

var setSong = function (data) {
    console.log(data);
    var s = '';
    for (var i = 0; i < data.verses.length; i++) {
        for (var j = 0; j < data.verses[i].length; j++) {
            for (var k = 0; k < data.verses[i][j].length; k++) {
                console.log(data.verses[i][j][k].txt);
                s += data.verses[i][j][k].txt + ' ';
            }
            s += '\n';
        }
        s += '\n';
    }
    $('#lyrics').html(s);
    setupKeypress(data);
};

var setDelay = function(data, index, delay) {
    var count = 0;
    for (var i = 0; i < data.verses.length; i++) {
        for (var j = 0; j < data.verses[i].length; j++) {
            for (var k = 0; k < data.verses[i][j].length; k++) {
                if (count === index) {
                    console.log('edit', data, i, j, k);
                    data.verses[i][j][k].delay = delay;
                    return;
                }
                count += 1;
            }
        }
    }

};

var setupForm = function() {
    $('form').submit(function(e) {
        console.log('submit');
        $.get('/scrape/blah', function(data) {
            //console.log('back', data);
            setSong(JSON.parse(data));
        });
        e.preventDefault();
    });
};

$(function() {


    setupForm();
});
