from flask import Flask, request
import smtplib

app = Flask(__name__)

# 🔴 CHANGE THIS
YOUR_EMAIL = "ssdhikshitha@gmail.com"
APP_PASSWORD = "ller wszq tmqs mdej"

@app.route("/")
def home():
    return "Backend is running"

@app.route("/send", methods=["POST"])
def send():
    name = request.form["name"]
    email = request.form["email"]
    message = request.form["message"]

    full_msg = f"""
New Message from Portfolio:

Name: {name}
Email: {email}
Message: {message}
"""

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(YOUR_EMAIL, APP_PASSWORD)
        server.sendmail(YOUR_EMAIL, YOUR_EMAIL, full_msg)
        server.quit()

        return "Message sent successfully!"

    except Exception as e:
        return f"Error sending email: {str(e)}"

if __name__ == "__main__":
    print("Server starting...")
    app.run(debug=True)