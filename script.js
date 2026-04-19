const form = document.getElementById("contact-form");
const successMsg = document.getElementById("success-message");
const button = form.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  button.innerText = "Sending...";
  button.disabled = true;

  const formData = new FormData(form);

  try {
   const response = await fetch("https://dhikshitha.onrender.com/send-message", {
  method: "POST",
  body: formData
});

    // 🔥 SAFE JSON PARSE
    let result = {};
    try {
      result = await response.json();
    } catch {
      console.warn("Response is not JSON");
    }

    if (response.ok) {
      form.style.display = "none";
      successMsg.style.display = "block";
      form.reset();
    } else {
      alert(result.error || "Something went wrong ");
      button.innerText = "Send Message";
      button.disabled = false;
    }

  } catch (error) {
    console.error("Fetch error:", error);
    alert("Server not reachable ");

    button.innerText = "Send Message";
    button.disabled = false;
  }
});