from flask import Flask,jsonify,request,render_template

from core import RandomKey
import config

app = Flask(__name__, static_folder=config.STATIC_FOLDER, static_url_path=config.STATIC_URL)


@app.route(config.URL_PREFIX + '/', methods=["GET"])
def index():
    return render_template("index.html")


@app.route(config.URL_PREFIX + '/get_random_key', methods=['GET', 'POST'])
def get_random_key():
    length = request.args.get("length", 8)
    has_lowercase = request.args.get("has_lowercase", True)
    has_capital = request.args.get("has_capital", True)
    has_digit = request.args.get("has_digit", True)
    has_symbol = request.args.get("has_symbol", True)

    data = RandomKey(length=length, has_lowercase=has_lowercase, has_capital=has_capital, has_digit=has_digit,
              has_symbol=has_symbol).generate()

    return jsonify(data)


if __name__ == '__main__':
    app.run(host=config.WEB_HOST, port=config.WEB_PORT)

