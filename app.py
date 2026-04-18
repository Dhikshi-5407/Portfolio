from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib

app = FastAPI()

# allow all websites (IMPORTANT for portfolio)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    name: str
    email: str
    message: str

YOUR_EMAIL = "yourmail@gmail.com"
APP_PASSWORD = "your_app_password"

@app.post("/send")
def send(msg: Message):

    full_msg = f"""
New Portfolio Message:

Name: {msg.name}
Email: {msg.email}
Message: {msg.message}
"""

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(YOUR_EMAIL, APP_PASSWORD)
    server.sendmail(YOUR_EMAIL, YOUR_EMAIL, full_msg)
    server.quit()

    return {"success": True}