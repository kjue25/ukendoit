from flask import Flask, request
from flask import render_template
import scraper
import codecs

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
    f = codecs.open('riptide.html', 'r+', 'utf8')
    ret = scraper.json_from_content(f.read())
    f.close()
    return ret

if __name__ == '__main__':
    app.run(debug=True)
