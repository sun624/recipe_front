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
const close = document.getElementById("submit");

open.addEventListener("click", () => {
  modal_container.classList.add("show");
});
close.addEventListener("click", () => {
  modal_container.classList.remove("show");
});

document.querySelector("#signin").addEventListener("click", onSignInClicked);
 var auth2 = undefined;
 function onSignInClicked() {
   // using global variable
   auth2.signIn().then(
     function (result) {
       console.log("sign in successful");
       document.querySelector("#signin").innerText = "Sign out";
     },
     function (err) {
       console.log("this is an error");
     }
   );
 }

 
function onLibraryLoaded() {
  gapi.load("auth2", function () {
    auth2 = gapi.auth2.init({
      client_id:
        "870711841901-kviglku4c7l9p0b1j5a0065k53931n61.apps.googleusercontent.com",
      scope: "profile",
    });

    // when page first loads, user is not signed in
    console.log("user is signed in: ", isUserSignedIn());

    // Method 2: sign in handler hooked up by the library
    console.log("click handler");
    // auth2.attachClickHandler(document.getElementById('button2'), {}, function(googleUser) {
    //   console.log('click handler callback')
    //   document.querySelector('#name').innerText = JSON.stringify(googleUser)
  });
}
