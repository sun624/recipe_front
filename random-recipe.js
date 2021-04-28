function fetchData() {
  //fetch("https://reqres.in/api/users")
  fetch("https://recipe-finder-group404.herokuapp.com/index.html")
    .then((response) => {
      if (!response.ok) {
        throw Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      createItemCard(data);
      console.log(data);
      // console.log(data.image);
      // const html = data.data.map((user) => {
      //   return `<div class="user"><p>Title: ${user.title}</p> <img src="${user.image}" /> </div>`;
      // });
      //console.log(html);
    });
}
fetchData();

function createItemCard(data) {
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

  chooseItems.innerHTML = `<div class="user"><p>Title: ${data.title}</p> <img src="${data.image}" /> </div>`;
  document.querySelector("#items_container").appendChild(chooseItems);
  // .insertAdjacentElement("afterbegin", html);
  //return chooseItems;
}
