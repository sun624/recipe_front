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
      displayItems(data);
      console.log(data);
      // console.log(data.image);
      // const html = data.data.map((user) => {
      //   return `<div class="user"><p>Title: ${user.title}</p> <img src="${user.image}" /> </div>`;
      // });
      // console.log(html);
    });
  // .catch((error) => {
  //   console.log(error);
  // });
}
fetchData();

function displayItems(data) {
  let chooseItems = document.createElement("div");
  chooseItems.innerHTML = `<div class="user"><p>Title: ${data.title}</p> <img src="${data.image}" /> </div>`;
  document.querySelector("#items_container").appendChild(chooseItems);
  // .insertAdjacentElement("afterbegin", html);
}
