document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const btn = document.getElementById("music-btn");

  btn.addEventListener("click", () => {
    if (music.paused) {
      music.play().catch(() => {});
      btn.textContent = "⏸ Выключить музыку";
    } else {
      music.pause();
      btn.textContent = "▶ Включить музыку";
    }
  });

  // Карусели
  const carousels = document.querySelectorAll(".carousel");
  const state = {};
  carousels.forEach(c => {
    const id = c.id;
    const slides = c.querySelectorAll(".slide");
    state[id] = 0;
    slides.forEach(s => s.classList.remove("active"));
    slides[0].classList.add("active");

    setInterval(() => {
      slides[state[id]].classList.remove("active");
      state[id] = (state[id] + 1) % slides.length;
      slides[state[id]].classList.add("active");
    }, 5000);
  });
});

// Счётчик времени
function updateCountdown() {
  const startDate = new Date("2023-10-01T00:00:00");
  const now = new Date();
  let diff = now - startDate;

  const days = Math.floor(diff / (1000*60*60*24));
  diff -= days*1000*60*60*24;
  const hours = Math.floor(diff / (1000*60*60));
  diff -= hours*1000*60*60;
  const minutes = Math.floor(diff / (1000*60));
  diff -= minutes*1000*60;
  const seconds = Math.floor(diff / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Галерея (lightbox)
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");

document.querySelectorAll(".gallery-item img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
  });
});
closeBtn.addEventListener("click", () => lightbox.style.display = "none");
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) lightbox.style.display = "none";
});

// Падающие сердечки
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  const size = Math.random() * 20 + 10;
  heart.style.width = size + "px";
  heart.style.height = size + "px";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
  heart.style.opacity = Math.random() * 0.5 + 0.5;

  document.getElementById("hearts-container").appendChild(heart);
  setTimeout(() => heart.remove(), parseFloat(heart.style.animationDuration) * 1000);
}
setInterval(createHeart, 136);
