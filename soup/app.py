from flask import Flask, request
from flask import render_template
import scraper
import codecs
import requests

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('home.html')

@app.route('/annotate/<url>', methods=['GET'])
def show_post(url):
    #print 'url {}'.format(request.form['url'])
    print 'url {}'.format(url)
    f = codecs.open('beatles.html', 'r+', 'utf8')
    print scraper.json_from_content(f.read())
    f.close()
    return render_template('annotate.html')

@app.route('/scrape/<url>', methods=['GET'])
def scrape(url):
    f = codecs.open('somewhere.html', 'r+', 'utf8')
    #content = requests.get('https://ukutabs.com/i/israel-kamakawiwoole/somewhere-over-the-rainbow-what-a-wonderful-world/')
    #f.write(content.text)
    #f.seek(0)
    #f = codecs.open('beatles.html', 'r+', 'utf8')
    #content = requests.get('https://ukutabs.com/t/the-beatles/let-it-be/')
    #f.write(content.text)
    #f.seek(0)
    #json_from_content(f.read())
    #f.close()
    ret = scraper.json_from_content(f.read())
    f.close()
    return ret

if __name__ == '__main__':
    app.run(debug=True)
