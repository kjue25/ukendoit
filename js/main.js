$(document).ready ( function (){
  showChords();
  showSong();
});

/* TODO: calculate chords from song */
var chords = ["Am", "C", "D", "E", "F", "G"];

var song = JSON.parse('{"verses":[[[{"delay": "0", "txt": "Don\'t", "chord": "C"}, {"delay": "349", "txt": "you", "chord": "C"}, {"delay": "410", "txt": "worry", "chord": "C"}, {"delay": "652", "txt": "there,", "chord": "C"}, {"delay": "662", "txt": "my", "chord": "C"}, {"delay": "408", "txt": "honey", "chord": "C"}, {"delay": "921", "txt": "We", "chord": "F"}, {"delay": "266", "txt": "might", "chord": "F"}, {"delay": "446", "txt": "not", "chord": "F"}, {"delay": "672", "txt": "have", "chord": "F"}, {"delay": "412", "txt": "any", "chord": "F"}, {"delay": "687", "txt": "money", "chord": "F"}], [{"delay": "974", "txt": "But", "chord": "Am"}, {"delay": "331", "txt": "we\'ve", "chord": "Am"}, {"delay": "396", "txt": "got", "chord": "Am"}, {"delay": "399", "txt": "our", "chord": "Am"}, {"delay": "426", "txt": "love", "chord": "Am"}, {"delay": "898", "txt": "to", "chord": "Am"}, {"delay": "178", "txt": "pay", "chord": "Am"}, {"delay": "452", "txt": "the", "chord": "F"}, {"delay": "258", "txt": "bills", "chord": "F"}], [{"delay": "3595", "txt": "Maybe", "chord": "C"}, {"delay": "528", "txt": "I", "chord": "C"}, {"delay": "295", "txt": "think", "chord": "C"}, {"delay": "534", "txt": "you\'re", "chord": "C"}, {"delay": "449", "txt": "cute", "chord": "C"}, {"delay": "422", "txt": "and", "chord": "C"}, {"delay": "468", "txt": "funny", "chord": "C"}], [{"delay": "689", "txt": "Maybe", "chord": "F"}, {"delay": "621", "txt": "I", "chord": "F"}, {"delay": "394", "txt": "wanna", "chord": "F"}, {"delay": "758", "txt": "do", "chord": "F"}, {"delay": "654", "txt": "what", "chord": "F"}, {"delay": "418", "txt": "bunnies", "chord": "F"}], [{"delay": "704", "txt": "do", "chord": "Am"}, {"delay": "698", "txt": "with", "chord": "Am"}, {"delay": "227", "txt": "you,", "chord": "Am"}, {"delay": "643", "txt": "if", "chord": "Am"}, {"delay": "246", "txt": "you", "chord": "Am"}, {"delay": "396", "txt": "know", "chord": "Am"}, {"delay": "742", "txt": "what", "chord": "Am"}, {"delay": "238", "txt": "I", "chord": "Am"}, {"delay": "413", "txt": "mean", "chord": "F"}]], [[{"delay": "3326", "txt": "Oh,", "chord": null}, {"delay": "423", "txt": "let\'s", "chord": "C"}, {"delay": "423", "txt": "get", "chord": "C"}, {"delay": "465", "txt": "rich", "chord": "C"}, {"delay": "367", "txt": "and", "chord": "C"}, {"delay": "306", "txt": "buy", "chord": "E7"}, {"delay": "417", "txt": "our", "chord": "E7"}, {"delay": "413", "txt": "parents", "chord": "E7"}, {"delay": "869", "txt": "homes", "chord": "F"}, {"delay": "736", "txt": "in", "chord": "F"}, {"delay": "281", "txt": "the", "chord": "F"}, {"delay": "175", "txt": "south", "chord": "F"}, {"delay": "226", "txt": "of", "chord": "F"}, {"delay": "390", "txt": "France", "chord": "C"}], [{"delay": "1092", "txt": "Let\'s", "chord": "C"}, {"delay": "283", "txt": "get", "chord": "C"}, {"delay": "452", "txt": "rich", "chord": "C"}, {"delay": "635", "txt": "and", "chord": "C"}, {"delay": "272", "txt": "give", "chord": "C"}, {"delay": "619", "txt": "everybody", "chord": "E7"}, {"delay": "854", "txt": "nice", "chord": "E7"}, {"delay": "431", "txt": "sweaters", "chord": "E7"}, {"delay": "517", "txt": "and", "chord": "E7"}, {"delay": "282", "txt": "teach", "chord": "F"}, {"delay": "394", "txt": "them", "chord": "F"}, {"delay": "596", "txt": "how", "chord": "F"}, {"delay": "433", "txt": "to", "chord": "F"}, {"delay": "300", "txt": "dance", "chord": "G"}], [{"delay": "1072", "txt": "Let\'s", "chord": "G"}, {"delay": "313", "txt": "get", "chord": "G"}, {"delay": "376", "txt": "rich", "chord": "C"}, {"delay": "642", "txt": "and", "chord": "C"}, {"delay": "261", "txt": "build", "chord": "C"}, {"delay": "577", "txt": "a", "chord": "C"}, {"delay": "271", "txt": "house", "chord": "E7"}, {"delay": "614", "txt": "on", "chord": "E7"}, {"delay": "363", "txt": "a", "chord": "E7"}, {"delay": "200", "txt": "mountain", "chord": "E7"}, {"delay": "381", "txt": "making", "chord": "E7"}, {"delay": "537", "txt": "everybody", "chord": "F"}, {"delay": "690", "txt": "look", "chord": "F"}, {"delay": "305", "txt": "like", "chord": "F"}, {"delay": "410", "txt": "ants", "chord": "D7"}], [{"delay": "937", "txt": "From", "chord": "D7"}, {"delay": "248", "txt": "way", "chord": "D7"}, {"delay": "261", "txt": "up", "chord": "D7"}, {"delay": "375", "txt": "there,", "chord": "C"}, {"delay": "995", "txt": "you", "chord": "C"}, {"delay": "290", "txt": "and", "chord": "C"}, {"delay": "374", "txt": "I,", "chord": "F"}, {"delay": "1093", "txt": "you", "chord": "G"}, {"delay": "294", "txt": "and", "chord": "G"}, {"delay": "383", "txt": "I", "chord": "C"}]], [[{"delay": "1098", "txt": "Well,", "chord": null}, {"delay": "300", "txt": "you", "chord": "C"}, {"delay": "400", "txt": "might", "chord": "C"}, {"delay": "3549", "txt": "be", "chord": "C"}, {"delay": "199", "txt": "a", "chord": "C"}, {"delay": "459", "txt": "bit", "chord": "C"}, {"delay": "465", "txt": "confused", "chord": "C"}], [{"delay": "411", "txt": "And", "chord": "C"}, {"delay": "411", "txt": "you", "chord": "F"}, {"delay": "468", "txt": "might", "chord": "F"}, {"delay": "898", "txt": "be", "chord": "F"}, {"delay": "256", "txt": "a", "chord": "F"}, {"delay": "631", "txt": "little", "chord": "F"}, {"delay": "458", "txt": "bit", "chord": "F"}, {"delay": "487", "txt": "bruised", "chord": "F"}], [{"delay": "280", "txt": "But", "chord": "F"}, {"delay": "597", "txt": "baby", "chord": "Am"}, {"delay": "427", "txt": "how", "chord": "Am"}, {"delay": "419", "txt": "we", "chord": "Am"}, {"delay": "409", "txt": "spoon", "chord": "Am"}, {"delay": "781", "txt": "like", "chord": "Am"}, {"delay": "431", "txt": "no", "chord": "Am"}, {"delay": "451", "txt": "one", "chord": "Am"}, {"delay": "634", "txt": "else", "chord": "F"}], [{"delay": "513", "txt": "So", "chord": "F"}, {"delay": "291", "txt": "I", "chord": "C"}, {"delay": "413", "txt": "will", "chord": "C"}, {"delay": "3385", "txt": "help", "chord": "C"}, {"delay": "252", "txt": "you", "chord": "C"}, {"delay": "457", "txt": "read", "chord": "C"}, {"delay": "440", "txt": "those", "chord": "C"}, {"delay": "480", "txt": "books", "chord": "C"}], [{"delay": "437", "txt": "If", "chord": "C"}, {"delay": "434", "txt": "you", "chord": "F"}, {"delay": "419", "txt": "will", "chord": "F"}, {"delay": "1004", "txt": "soothe", "chord": "F"}, {"delay": "223", "txt": "my", "chord": "F"}, {"delay": "358", "txt": "worried", "chord": "F"}, {"delay": "330", "txt": "looks", "chord": "F"}], [{"delay": "619", "txt": "And", "chord": "F"}, {"delay": "422", "txt": "we", "chord": "Am"}, {"delay": "763", "txt": "will", "chord": "Am"}, {"delay": "845", "txt": "put", "chord": "Am"}, {"delay": "266", "txt": "the", "chord": "Am"}, {"delay": "457", "txt": "lonesome", "chord": "Am"}, {"delay": "291", "txt": "on", "chord": "Am"}, {"delay": "598", "txt": "the", "chord": "Am"}, {"delay": "265", "txt": "shelf", "chord": "F"}]], [[{"delay": "1084", "txt": "Oh,", "chord": null}, {"delay": "475", "txt": "let\'s", "chord": "C"}, {"delay": "269", "txt": "get", "chord": "C"}, {"delay": "3326", "txt": "rich", "chord": "C"}, {"delay": "423", "txt": "and", "chord": "C"}, {"delay": "423", "txt": "buy", "chord": "E7"}, {"delay": "465", "txt": "our", "chord": "E7"}, {"delay": "367", "txt": "parents", "chord": "E7"}, {"delay": "306", "txt": "homes", "chord": "F"}, {"delay": "417", "txt": "in", "chord": "F"}, {"delay": "413", "txt": "the", "chord": "F"}, {"delay": "869", "txt": "south", "chord": "F"}, {"delay": "736", "txt": "of", "chord": "F"}, {"delay": "281", "txt": "France", "chord": "C"}], [{"delay": "175", "txt": "Let\'s", "chord": "C"}, {"delay": "226", "txt": "get", "chord": "C"}, {"delay": "390", "txt": "rich", "chord": "C"}, {"delay": "1092", "txt": "and", "chord": "C"}, {"delay": "283", "txt": "give", "chord": "C"}, {"delay": "452", "txt": "everybody", "chord": "E7"}, {"delay": "635", "txt": "nice", "chord": "E7"}, {"delay": "272", "txt": "sweaters", "chord": "E7"}, {"delay": "619", "txt": "and", "chord": "E7"}, {"delay": "854", "txt": "teach", "chord": "F"}, {"delay": "431", "txt": "them", "chord": "F"}, {"delay": "517", "txt": "how", "chord": "F"}, {"delay": "282", "txt": "to", "chord": "F"}, {"delay": "394", "txt": "dance", "chord": "G"}], [{"delay": "596", "txt": "Let\'s", "chord": "G"}, {"delay": "433", "txt": "get", "chord": "G"}, {"delay": "300", "txt": "rich", "chord": "C"}, {"delay": "1072", "txt": "and", "chord": "C"}, {"delay": "313", "txt": "build", "chord": "C"}, {"delay": "376", "txt": "a", "chord": "C"}, {"delay": "642", "txt": "house", "chord": "E7"}, {"delay": "261", "txt": "on", "chord": "E7"}, {"delay": "577", "txt": "a", "chord": "E7"}, {"delay": "271", "txt": "mountain", "chord": "E7"}, {"delay": "614", "txt": "making", "chord": "E7"}, {"delay": "363", "txt": "everybody", "chord": "F"}, {"delay": "200", "txt": "look", "chord": "F"}, {"delay": "381", "txt": "like", "chord": "F"}, {"delay": "537", "txt": "ants", "chord": "D7"}], [{"delay": "690", "txt": "From", "chord": "D7"}, {"delay": "305", "txt": "way", "chord": "D7"}, {"delay": "410", "txt": "up", "chord": "D7"}, {"delay": "937", "txt": "there,", "chord": "C"}, {"delay": "248", "txt": "you", "chord": "C"}, {"delay": "261", "txt": "and", "chord": "C"}, {"delay": "375", "txt": "I,", "chord": "F"}, {"delay": "995", "txt": "you", "chord": "G"}, {"delay": "290", "txt": "and", "chord": "G"}, {"delay": "374", "txt": "I", "chord": "C"}]], [[{"delay": "1093", "txt": "Oh,", "chord": null}, {"delay": "294", "txt": "let\'s", "chord": "C"}, {"delay": "383", "txt": "get", "chord": "C"}, {"delay": "1098", "txt": "rich", "chord": "C"}, {"delay": "300", "txt": "and", "chord": "C"}, {"delay": "400", "txt": "buy", "chord": "E7"}, {"delay": "3326", "txt": "our", "chord": "E7"}, {"delay": "423", "txt": "parents", "chord": "E7"}, {"delay": "423", "txt": "homes", "chord": "F"}, {"delay": "465", "txt": "in", "chord": "F"}, {"delay": "367", "txt": "the", "chord": "F"}, {"delay": "306", "txt": "south", "chord": "F"}, {"delay": "417", "txt": "of", "chord": "F"}, {"delay": "413", "txt": "France", "chord": "C"}], [{"delay": "869", "txt": "Let\'s", "chord": "C"}, {"delay": "736", "txt": "get", "chord": "C"}, {"delay": "281", "txt": "rich", "chord": "C"}, {"delay": "175", "txt": "and", "chord": "C"}, {"delay": "226", "txt": "give", "chord": "C"}, {"delay": "390", "txt": "everybody", "chord": "E7"}, {"delay": "1092", "txt": "nice", "chord": "E7"}, {"delay": "283", "txt": "sweaters", "chord": "E7"}, {"delay": "452", "txt": "and", "chord": "E7"}, {"delay": "635", "txt": "teach", "chord": "F"}, {"delay": "272", "txt": "them", "chord": "F"}, {"delay": "619", "txt": "how", "chord": "F"}, {"delay": "854", "txt": "to", "chord": "F"}, {"delay": "431", "txt": "dance", "chord": "G"}], [{"delay": "517", "txt": "Let\'s", "chord": "G"}, {"delay": "282", "txt": "get", "chord": "G"}, {"delay": "394", "txt": "rich", "chord": "C"}, {"delay": "596", "txt": "and", "chord": "C"}, {"delay": "433", "txt": "build", "chord": "C"}, {"delay": "300", "txt": "a", "chord": "C"}, {"delay": "1072", "txt": "house", "chord": "E7"}, {"delay": "313", "txt": "on", "chord": "E7"}, {"delay": "376", "txt": "a", "chord": "E7"}, {"delay": "642", "txt": "mountain", "chord": "E7"}, {"delay": "261", "txt": "making", "chord": "E7"}, {"delay": "577", "txt": "everybody", "chord": "F"}, {"delay": "271", "txt": "look", "chord": "F"}, {"delay": "614", "txt": "like", "chord": "F"}, {"delay": "363", "txt": "ants", "chord": "D7"}], [{"delay": "200", "txt": "From", "chord": "D7"}, {"delay": "381", "txt": "way", "chord": "D7"}, {"delay": "537", "txt": "up", "chord": "D7"}, {"delay": "690", "txt": "there,", "chord": "C"}, {"delay": "305", "txt": "you", "chord": "C"}, {"delay": "410", "txt": "and", "chord": "C"}, {"delay": "937", "txt": "I,", "chord": "F"}, {"delay": "248", "txt": "you", "chord": "G"}, {"delay": "261", "txt": "and", "chord": "G"}, {"delay": "375", "txt": "I", "chord": "C"}]]]}');



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
	$("#curr-chord").html("<img src=\"img/big" + chord + ".png\">");
}

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
    curr_delay += parseInt(words[n].delay);
  $(line_elem).html("");
  for (var w in words)
    $(line_elem).append(getWordHTML(words[w], n == w));
}

//global for scaling the speed of scrolling
var scale = 1;

/* sets up timeouts for each line
 * line: array of words
 * el: line element 
 * d: total timeout delay
 */
function playLine(line, el, d) {
  var delay = d;
  /* highlights each word */
  for (var w in line) {
    delay += parseInt(line[w].delay);
    if (curr_delay <= delay)
      timeouts.push (setTimeout(highlightWord, ((delay - curr_delay))/scale, el, line, w));
  }
  return delay;
}

/* scrolls to line_elem */
function scrollToLine (line_elem) {
  $(".lyrics").scrollTo(line_elem, {offsetTop:'500'});
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
        timeouts.push (setTimeout(highlightWord, ((delay - curr_delay)+ parseInt(verse[l][0].delay))/scale, $(prev_el), prev_line, -1));
      }
    }
    delay = playLine(verse[l], el, delay);
    prev_line = verse[l];
    prev_el = el;
  }
  return delay;
}

/* sets up all timeouts for song
 */
function playSong() {
  if (timeouts.length > 0) return;
  var delay = 0;
  for (var v in song.verses)
    delay = playVerse(song.verses[v], v, delay);
}

/* removes all timeouts for song */
function stopSong() {
  for (var t in timeouts)
    window.clearTimeout(timeouts[t]);
  console.log(curr_delay);
  timeouts = [];
}

/*scales delay for the song */
function rescaleSong(newScale) {
  stopSong();
  scale = newScale/100;
  console.log(scale);
  curr_delay = curr_delay*scale;
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
  for (var v in song.verses) {
    var verse = song.verses[v];
    for (var l in verse) {
      var el = $("<li class=\"line line" + l + " verse" + v + "\"></li>");
      var line = verse[l];
      var last_chord = null;
      for (var w in line) {
        var word = line[w];
        if (last_chord != null && word.chord == last_chord) {
          word.chord = "";
        }
        $(el).append(getWordHTML(line[w],false));
        if (word.chord != "") last_chord = word.chord;
      }
      $(lyrics).append(el);
    }
    $(lyrics).append("<br>");
  }
}

