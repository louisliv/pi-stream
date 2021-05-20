from flask import Flask, request, jsonify
import pyxinput, time


joypad = pyxinput.vController()
app = Flask(__name__)

BUTTONS = {
    1: "BtnA",
    2: "BtnB",
    3: "BtnX",
    4: "BtnY"
}

@app.route("/btn-click", methods = ['POST'])
def btn_click():
    data = request.json.get("button", 1)
    btn = BUTTONS.get(data, "BtnA")
    
    time.sleep(0.1)
    joypad.set_value(btn, 1)
    time.sleep(0.3)
    joypad.set_value(btn, 0)

    return jsonify("Btn Accepted")

if __name__ == "__main__":
    app.run(debug=True)