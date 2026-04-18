
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




const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

reveals.forEach(el => observer.observe(el));

const cards = document.querySelectorAll(".flip-card");

cards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flip-mobile");
  });
});


document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value
  };

  try {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert("Message sent successfully!");
      e.target.reset();
    } else {
      alert("Failed to send message");
    }
  } catch (error) {
    alert("Error sending message");
  }
});