async function fetchData() {
  //fetch("https://reqres.in/api/users")
  // const res = await fetch(
  //   "https://recipe-finder-group404.herokuapp.com/index.html"
  // );
  const res = await fetch("https://reqres.in/api/users");
  const data = await res.json();
  return data.data[0];
  // console.log(data.image);
  // const html = data.data.map((user) => {
  //   return `<div class="user"><p>Title: ${user.title}</p> <img src="${user.image}" /> </div>`;
  // });
  //console.log(html);
}

randomRecipes();

async function randomRecipes() {
  for (let i = 1; i < 5; i++) {
    createItemCard(await fetchData(), i);
  }
}

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

  chooseItems.innerHTML = `<div class="user"><h4>${data.email}</h4> <img width="300px" src="${data.avatar}"/> </div>`;
  document.querySelector(`#items_container${i}`).appendChild(chooseItems);
  // .insertAdjacentElement("afterbegin", html);
  //return chooseItems;
}
