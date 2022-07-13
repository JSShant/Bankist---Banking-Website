"use strict";
//Global Variables
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn__close--modal");
const btnsOpenModal = document.querySelectorAll(".btn__show--modal");
const scrollBtn = document.querySelector(".btn--scroll");
const features = document.querySelector("#features");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab--container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const landing = document.querySelector(".landing");
const allSections = document.querySelectorAll(".section");

//Functions
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const navOver = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach(function (e) {
      if (e !== link) e.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

//Modal Window
btnsOpenModal.forEach(function (btn) {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//Smooth Scrolling
scrollBtn.addEventListener("click", function (e) {
  const s1coords = features.getBoundingClientRect();
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  });
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//Tab Functionality
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  //Guard Clause
  if (!clicked) return;
  //Removing Active Classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  //Adding Active Classes
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//Transition opacity effects on navbar
nav.addEventListener("mouseover", (e) => navOver(e, 0.5));
nav.addEventListener("mouseout", (e) => navOver(e, 1));

//Sticky nav using IntersectionObserver
const navHeight = nav.getBoundingClientRect().height; //Added for different viewports
const landingPageObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
landingPageObserver.observe(landing);

//Revealing Sections

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
