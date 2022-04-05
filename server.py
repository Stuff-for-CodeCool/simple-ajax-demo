from flask import Flask, render_template, jsonify, request

app = Flask(__name__)


@app.get("/")
def index():
    return render_template("index.html", message="it's working")


@app.get("/data")
def get_data():
    data = {
        "user": "me",
        "message": "hello!",
    }
    return jsonify(data)


@app.post("/data")
def post_data():
    user = request.json.get("user") if request.is_json else request.form.get("user")
    message = (
        request.json.get("message") if request.is_json else request.form.get("message")
    )

    data = {
        "user": user,
        "message": message,
    }

    return jsonify(data)


@app.put("/data")
def put_data():
    user = request.json.get("user") if request.is_json else request.form.get("user")
    message = (
        request.json.get("message") if request.is_json else request.form.get("message")
    )

    data = {
        "user": user,
        "message": message,
    }

    return jsonify(data)


@app.delete("/data")
def delete_data():
    return jsonify({"message": "deleted resource"})


if __name__ == "__main__":
    app.run(debug=True)
