const navSlide = () => {
  const burger = document.querySelector(".burger"); //
  const nav = document.querySelector(".nav-links"); //
  const navLinks = document.querySelectorAll(".nav-links li");

  //Toggle Nav
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    //Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.6s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });
    //Burger Animation
    burger.classList.toggle("toggle");
  });
};

navSlide();

const open = document.getElementById("open");
const modal_container = document.getElementById("modal_container");

open.addEventListener("click", () => {
  modal_container.classList.add("show");

  const close = document.getElementById("close");
  close.addEventListener("click", () => {
    modal_container.classList.remove("show");
  });
});
