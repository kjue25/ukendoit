var song;
$(document).ready ( function (){
    var hash = window.location.hash.substr(1);
    if (hash.length == 0) {
        hash = 'youandi.json';
    }
    $.get('/json/' + hash, function(data) {
            console.log('data', data);
        song = data;
        showSong();
        $("div#arrow").css({top: $(".lyrics").offset().top + $(".lyrics").height()/2-20}); 
        $("div#arrow").css({left: $("body").width()* 0.35});
        scrollToLine(".line0.verse0");
    });
  // position line arrow!
  //console.log(chords);
  //showChords();
});
var chords = [];
/* TODO: calculate chords from song 
var chords = ["Am", "C", "D", "E", "F", "G"];*/



var curr_delay = 0;
var timeouts = [];
function getWordHTML(word, highlighted) {
    var chord = word.chord;
    if (!word.hasOwnProperty('chord') || chord == null) chord = "";
    var html = "<div class=\"word\"><span class=\"chord\">"+chord+"</span><br>" + word.txt + "</div>";
    if (highlighted)
        return "<span class=\"highlight\">" + html + "</span> ";
    return html;
}

/* show chord! */
function showChord(chord) {
        $(".chords li").removeClass("active");
        $(".chords " + "." + chord).addClass("active");
	$("#curr-chord-pic").html("<img src=\"img/big" + chord + ".png\">");
	if (chord != null)
		$("#curr-chord").html(chord);
}

//global for scaling the speed of scrolling
var scale = 1;

/* highlights a word in a particular line
 * line_elem: <li> element that contains line with highlighted word
 * words: list of words on line
 * n: which word to highlight? if -1, highlight none of them
 */
function highlightWord(line_elem, words, n) {
  if (n != -1 && words[n].hasOwnProperty('chord') && words[n].chord != "") {
    showChord(words[n].chord);
  }
  if (n != -1)
    curr_delay += parseInt(words[n].delay);///scale;
  $(line_elem).html("");
  for (var w in words)
    $(line_elem).append(getWordHTML(words[w], n == w));
}


/* sets up timeouts for each line
 * line: array of words
 * el: line element 
 * d: total timeout delay
 */
function playLine(line, el, d) {
  var delay = d;
  /* highlights each word */
  for (var w in line) {
    delay += parseInt(line[w].delay)///scale;
    if (curr_delay <= delay)
      timeouts.push (setTimeout(highlightWord, (delay - curr_delay)/scale, el, line, w));
  }
  return delay;
}

/* scrolls to line_elem */
function scrollToLine (line_elem) {
  $(".lyrics").scrollTo(line_elem, {offsetTop:"" + ($(".lyrics").height()/2 + 60), duration:"200"});
}

var prev_el = null;
var prev_line = null;
/* verse: array of lines
 * v: verse index
 * d: total timeout delay
 */
function playVerse(verse, v, d) {
  var delay = d;
  for (var l in verse) {
    var el = $(".line" + l + ".verse" + v);
    if (curr_delay <= delay) {
      timeouts.push(setTimeout(scrollToLine, (delay - curr_delay)/scale, ".line" + l + ".verse" + v));
      if (prev_el != null) {
        timeouts.push (setTimeout(highlightWord, (delay - curr_delay + parseInt(verse[l][0].delay))/scale, $(prev_el), prev_line, -1));
      }
    }
    delay = playLine(verse[l], el, delay);
    prev_line = verse[l];
    prev_el = el;
  }
  return delay;
}

function playOrPauseSong() {
	console.log(timeouts.length);
  if (timeouts.length > 0) stopSong();
  else playSong();
}

/* sets up all timeouts for song
 */
function playSong() {
  if (timeouts.length > 0) return;
  var delay = 0;
  for (var v in song.verses)
    delay = playVerse(song.verses[v], v, delay);
  setTimeout(function () {
	  stopSong();
  }, (delay - curr_delay + 500)/scale);
  $(".playpause").html('<i class="fa fa-pause"></i>');
}

/* removes all timeouts for song */
function stopSong() {
	$("span").removeClass("highlight");
  for (var t in timeouts)
    window.clearTimeout(timeouts[t]);
  timeouts = [];
  $(".playpause").html('<i class="fa fa-play"></i>');
}

function restartSong() {
stopSong();
curr_delay = 0;
scrollToLine(".line0.verse0");

}

/*scales delay for the song */
function rescaleSong(newScale) {
  var wasPlaying = false
  if (timeouts.length > 0) wasPlaying = true 
  stopSong();
  newDelay = newScale/100;
  //curr_delay = (curr_delay*scale)/(newDelay);
  scale = newDelay;
  console.log(scale);
  if (wasPlaying)
    playSong();
}

/* functions called onload: shows chords and shows song */
function showChords () {
  for (var c in chords) {
    var e = $("#chord-list");
    var chord = chords[c];
    $(e).append("<li class=\"" + chord + "\"><img src=\"img/" + chord + ".png\"></li>");
  }
}

function showSong() {
  var lyrics = $('#lyrics');
      var last_chord = null;
  for (var v in song.verses) {
    var verse = song.verses[v];
    for (var l in verse) {
      var el = $("<li class=\"line line" + l + " verse" + v + "\"></li>");
      var line = verse[l];
      for (var w in line) {
        var word = line[w];
        if (last_chord != null && word.chord == last_chord) {
          word.chord = "";
        }
        $(el).append(getWordHTML(line[w],false));
        if (word.chord != "" && word.chord != null && chords.indexOf(word.chord) == -1)
          chords.push(word.chord);
        if (word.chord != "") {
          last_chord = word.chord;
	}
      }
      $(lyrics).append(el);
    }
    $(lyrics).append("<br>");
  }
}

function changeLine(forward) {
	var playing = timeouts.length > 0;
  if (playing) stopSong();
	var totaldelay = 0;
	var delays = [];
	var lines = [];
	for (var v in song.verses) {
		var verse = song.verses[v];
    		for (var l in verse) {
			var line = verse[l];
			lines.push( ".line" + l + ".verse" + v);
			delays.push(totaldelay);
			for (var w in line) {
				var word = line[w];
				totaldelay += parseInt(word.delay);
			}
		}
	}
	var ind = delays.length - 1;
	for (var d in delays) {	
		if (curr_delay < delays[d]) {
			ind = d-1;
			break;
		}
	}
	if (forward && ind != delays.length - 1) {
		curr_delay = delays[ind+1]+1;
		scrollToLine(lines[ind+1]);
	}
	if (!forward && ind != 0) {
		curr_delay = delays[ind-1]+1;
		scrollToLine(lines[ind-1]);
	}
	if(playing)
  	playSong();
}

