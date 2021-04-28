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
   // const html = data.data.map((user) => {
  //   return `<div class="user"><p>Title: ${user.title}</p> <img src="${user.image}" /> </div>`;
  // });
  //console.log(html);
}
fetchData();


function createItemCard(data, i) {
  let chooseItems = document.createElement("div");
  // chooseItems.setAttribute("class", "card");
  // chooseItems.style.width = "15rem";
  // chooseItems.style.height = "fit-content";
  // chooseItems.style.margin = "20px;";
  // console.log(chooseItems);
  // var img = document.createElement("img");
  // img.setAttribute("class", "card-img-top");
  // img.setAttribute("alt", title);
  // img.setAttribute("src", image);

  // chooseItems.appendChild(img);

  // var cardBody = document.createElement("div");
  // cardBody.setAttribute("class", "card-body");

  // var cardTitle = document.createElement("h5");
  // cardTitle.setAttribute("class", "card-title");
  // cardTitle.innerText = title;
  // cardBody.appendChild(cardTitle);
  // chooseItems.appendChild(cardBody);

  chooseItems.innerHTML = `<div class="user"><h4>${data.title}</h4> <img width="250px" src="${data.image}"/> </div>`;
  document.querySelector(`#items_container${i}`).appendChild(chooseItems);
  // .insertAdjacentElement("afterbegin", html);
  //return chooseItems;
}
