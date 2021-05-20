from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/btn-click", methods = ['POST'])
def btn_click():
    data = request.json
    print(data)
    return jsonify("Btn Accepted")

if __name__ == "__main__":
    app.run(debug=True)