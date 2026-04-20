const sections = document.querySelectorAll('section');
const reveal = () => {
  const trigger = window.innerHeight * 0.85;
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) {
      sec.classList.add('show');
    }
  });
};
window.addEventListener('scroll', reveal);
reveal();

const form = document.getElementById("contact-form");
const successMsg = document.getElementById("success-msg");
const button = form.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  button.innerText = "Sending...";
  button.disabled = true;

  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  try {
    const response = await fetch("https://portfolio-nf2p.onrender.com/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

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
      alert(result.error || "Something went wrong");
      button.innerText = "Send Message";
      button.disabled = false;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Could not reach the server. Please try again later.");
    button.innerText = "Send Message";
    button.disabled = false;
  }
});