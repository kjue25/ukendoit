from bs4 import BeautifulSoup
import requests
import re
import codecs
import json

def json_from_content(content):
    matches = re.search('<pre class="qoate-code">(.*)</pre>', content, re.DOTALL)
    inside = matches.groups()[0]
    inside += '</span>'
    lines = re.findall('<span>(.*?)</span>', inside, re.DOTALL)
    currentChords = None
    nowChord = None
    verses = [[]]
    for line in lines:
        if '<strong>' in line:
            continue
        chords = re.findall(r"([ ]*)<a.*?>(.*?)<", line)
        if len(chords) == 0 and len(line.strip()) > 0:
            if currentChords:
                verses[-1].append(infuse_chords(regex_parts_to_string(currentChords), line))
            else:
                verses[-1].append(parts_to_objs([(line, None)]))
            currentChords = None
        elif len(chords) > 0:
            currentChords = chords
        else:
            # New verse
            verses.append([])

    formatted = {'verses': verses}
    j = json.dumps(formatted)
    return j
    #return j.replace("'", "\\'")

def get_chords(span):
    print span

def parts_to_objs(parts):
    ret = []
    for part in parts:
        words = part[0].split(' ')
        for word in words:
            ret.append({'txt': word, 'delay': 1, 'chord': part[1]})

    return ret

def regex_parts_to_string(tups):
    ret = ''
    for tup in tups:
        ret += tup[0] + tup[1]
    #print 'regex return', ret
    return ret

def infuse_chords(chordsLine, wordLine):
        print 'INPUT', chordsLine, wordLine
	chords = [chord for chord in chordsLine.split(" ") if chord != ""]
	chordIndices = []
	for chord in chords:
		index = chordsLine.find(chord) # here
                chordsLine = chordsLine[:index] + " " + chordsLine[index+1:]
		chordIndices.append((index, chord))
	for (index, chord) in chordIndices[::-1]:
		wordLine = wordLine[:index] + "(" + chord + ")" + wordLine[index:]
        #print 'wordLine', wordLine
        return string_to_word_objs(wordLine)

def string_to_word_objs(chordsWordLine):
        #print 'INPUT', chordsWordLine
	words = chordsWordLine.split(" ")
	current_chord = None
	word_objs = []
	for word in words:
            if "(" in word:
                current_chord = word[word.find("(")+1:word.find(")")]
                text = word[:word.find("(")] + word[word.find(")")+1:]
                word_objs.append({"txt": text, "chord": current_chord, "delay": 1})
            else:
                word_objs.append({"txt": word, "chord": current_chord, "delay": 1})
        #print 'OUTPUT', word_objs
	return word_objs



if __name__ == '__main__':
    #f = codecs.open('taylor.html', 'r+', 'utf8')
    #content = requests.get('https://ukutabs.com/t/taylor-swift/shake-it-off-10/')
    #f.write(content.text)
    #f.seek(0)
    #f = codecs.open('beatles.html', 'r+', 'utf8')
    #content = requests.get('https://ukutabs.com/t/the-beatles/let-it-be/')
    #f.write(content.text)
    #f.seek(0)
    #json_from_content(f.read())
    #f.close()
    chor = "      a       e7       "
    line = "this is a neat beat"
    print infuse_chords(chor, line)

