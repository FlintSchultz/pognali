const navBtns = document.querySelectorAll('.nav-btn');

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.addEventListener("DOMContentLoaded", function () {
  // Анимация How it works
    const steps = document.querySelectorAll(".step");
  const wrapper = document.querySelector(".sticky-wrapper");
  const vh = window.innerHeight;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const start = wrapper.offsetTop;

    steps.forEach((step, i) => {
      const triggerPoint = start + i * vh * 1.0;
      if (scrollTop + vh * 0.6 > triggerPoint) {
        step.classList.add("visible");
      }
    });
  });

  const hero = document.getElementById("hero");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hero.classList.add("scrolled");
          } else {
            hero.classList.remove("scrolled");
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(hero);
});


// Слайдер
const swiper = new Swiper('.mySwiper', {
  centeredSlides: true,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    }
  }
});

// Навигация по якорям
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Удаляем .active у всех кнопок
    navBtns.forEach(b => b.classList.remove('active'));
    // Добавляем .active текущей
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).scrollIntoView({ behavior:'smooth' });
  });
});


// Обновление активной кнопки по прокрутке
const sections = [...navBtns].map(btn => document.getElementById(btn.dataset.target));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navBtns.forEach(btn => {
          btn.classList.toggle('active', btn.dataset.target === id);
        });
      }
    });
  },
  {
    threshold: 0.15 // блок считается видимым, если больше половины видно
  }
);

// Наблюдаем за каждым разделом
sections.forEach(section => observer.observe(section));
