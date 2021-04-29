const SERVER = "https://recipe-finder-group404.herokuapp.com/index.html";

function fetchData() {
  //fetch("https://reqres.in/api/users")
  fetch(SERVER)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < 4; i++) {
        createItemCard(data[i], i + 1);
      }
    });
}
fetchData();

function createItemCard(data, i) {
  let chooseItems = document.createElement("div");
  chooseItems.innerHTML = `<div class="user"><h4>${data.title}</h4> <img width="250px" src="${data.image}"/> </div>`;
  document.querySelector(`#items_container${i}`).appendChild(chooseItems);
}
// fetch(SERVER)
//   .then((res) => res.json())
//   .then((data) => displayDest(data));

// function displayDest(data) {
//   let desDiv = "";
//   for (ele of data) {
//     desDiv += createCard(ele);
//   }
//   document.querySelector(".menu_container").innerHTML = desDiv;
// }

// function createCard(ele) {
//   let singleCard = `
//         <div class="card" id=${ele.uid} style="width: 15rem; margin: 20px;">
//             <img class="card-img-top" src=${ele.image}>
//             <div class="card-body">
//                 <h5 class="card-title">${ele.title}</h5>
//                 <div class="button_container">
//                     <button class="btn btn-warning">Edit</button>
//                     <button class="btn btn-danger">Remove</button>
//                 </div>
//             </div>
//         </div>`;

//   return singleCard;
// }

// document
//   .getElementById(".search-text") ///////////////
//   .addEventListener("click", createDestination);

// function createDestination(event) {
//   event.preventDefault();

//   const userData = {
//     title: document.getElementById("search-id").value,
//   };

//   renderPage(userData, "POST");
//   resetForm();
// }

// document.querySelector(".menu_container").addEventListener("search", () => {
//   return userData;
// });

// function renderPage(info, method) {
//   fetch(SERVER, {
//     method: method,
//     //MUST match the data type body is sending
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(info),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       displayDest(data);
//       //console.log(data);
//     });
// }

// function resetForm() {
//   document.getElementById("search-id").value = "";
// }
