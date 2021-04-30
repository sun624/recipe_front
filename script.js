$(document).ready(() => {
  $(".find-meal").on("click", () => {
    //empty meals cards section
    $(".meals").empty();
    const mealName = $("input").val();
    //display meal cards
    getMeal(mealName).catch(() => {
      const error = "We Cannot Find Your Food ! Please Try Again";
      alert(error);
    });
    //reset search box
    $("input").val("");
  });

  async function getMeal(name) {
    count = 0;

    //Instead of going to our server to query, here we directly query through API to quickly present results
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    const data = await response.json();
    const { meals } = data;
    //console.log(meals);
    //render meals cards
    for (let i = 0; i < meals.length; i++) {
      displayCard(meals[i], i, false);
    }
    // add listener on add button
    const btns = $(".addBtn");
    for (btn of btns) {
      $(btn).on("click", addRecp);
    }
  }

  // display each individual meal card
  function displayCard(item, count, isFav) {
    //extract ingredients into array
    const ingredient = [
      item.strIngredient1,
      item.strIngredient2,
      item.strIngredient3,
      item.strIngredient4,
      item.strIngredient5,
      item.strIngredient6,
      item.strIngredient7,
      item.strIngredient8,
      item.strIngredient9,
      item.strIngredient10,
      item.strIngredient11,
      item.strIngredient12,
      item.strIngredient13,
      item.strIngredient14,
      item.strIngredient15,
      item.strIngredient16,
      item.strIngredient17,
      item.strIngredient18,
      item.strIngredient19,
      item.strIngredient20,
    ];

    //extract measures into array
    const measure = [
      item.strMeasure1,
      item.strMeasure2,
      item.strMeasure3,
      item.strMeasure4,
      item.strMeasure5,
      item.strMeasure6,
      item.strMeasure7,
      item.strMeasure8,
      item.strMeasure9,
      item.strMeasure10,
      item.strMeasure11,
      item.strMeasure12,
      item.strMeasure13,
      item.strMeasure14,
      item.strMeasure15,
      item.strMeasure16,
      item.strMeasure17,
      item.strMeasure18,
      item.strMeasure19,
      item.strMeasure20,
    ];

    //meal card construction using modal
    const card =
      `<div id="${item.idMeal}" class="card text-dark m-2 p-2" style="max-width: 18rem;" data-bs-toggle="modal" data-bs-target="#exampleModal-${count}">
                          <img src="${item.strMealThumb}" class="card-img-top w-100" alt="...">
                          <div class="card-body" style="display:flex; flex-direction:row;justify-content:space-between">
                            <h5 class="card-title">${item.strMeal}</h5>
                            <p class="card-text">(${item.strArea})</p>
                            ` +
      btnSelector(item.idMeal, isFav) +
      `
                        </div>
                        </div>
                        <!-- Modal -->
                        <div class="modal fade text-dark" id="exampleModal-${count}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">${item.strMeal} <small class="card-text fw-light">(${item.strArea})</small>  </h5>
                                
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                <img src="${item.strMealThumb}" class="card-img-top h-50" alt="...">
                                <p class="my-3 fw-bold">${item.strCategory}</p>
                                <p class="my-3">
                                <h5 class="p-0 m-0 text-decoration-underline">Instructions :</h5> <br>
                                ${item.strInstructions}</p>
                                
                                <h5 class="p-0 m-0 text-decoration-underline">Ingredient :</h5> <br>
                                <ul class="list-group">` +
      ingredientsInfo(ingredient, measure) +
      `</ul>     
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-dark rounded-pill" data-bs-dismiss="modal">Close</button>
                                ` +
      btnSelector(item.idMeal, isFav) +
      `
                                </div>
                            </div>
                          </div>
                        </div>
                    `;

    function ingredientsInfo(ingredient, measure) {
      const result = [];

      // go through each ingredient and measure and add to modal
      for (let i = 0; i < ingredient.length; i++) {
        if (
          ingredient[i] != "" &&
          ingredient[i] != null &&
          measure[i] != "" &&
          measure[i] != null
        )
          result.push(`<li class="list-group-item d-flex justify-content-between align-items-center">
                                    ${ingredient[i]}
                                        <span class="badge bg-dark rounded-pill">${measure[i]}</span>
                                </li>`);
      }
      return result.join("");
    }

    // append individual card into meal section
    $(".meals").append(card);
  }

  //Depend on if the card is in your favorites, return add button or delete button
  function btnSelector(id, isFav) {
    if (!isFav) {
      return `<button type="button" data-bs-dismiss="modal" class="btn btn-danger rounded-pill px-3 addBtn" id=${id}>Add</button>`;
    } else {
      return `<button type="button" data-bs-dismiss="modal" class="btn btn-warning rounded-pill px-3 delBtn" id=${id}>Delete</button>`;
    }
  }

  //<your favourites> button listener
  $(".favorate").on("click", () => {
    $(".meals").empty();

    //construct current url as a query string with parameters
    let url = new URL("https://recipe-finder-group404.herokuapp.com");
    url.search = new URLSearchParams({ email: showCurrentUserInfo().email });

    // go to server and ask for user specific favourite meals
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          displayCard(data[i].recipe, i, true);
        }

        // add listeners on to delete button, because these card show up in the favourites, so, it does not have add button
        const btns = $(".delBtn");
        for (btn of btns) {
          $(btn).on("click", delRecp);
        }
      });
  });

  function delRecp(e) {
    //construct data info sent to server
    const data = {
      email: showCurrentUserInfo().email,
      mealId: e.target.id,
    };

    fetch("https://recipe-finder-group404.herokuapp.com/", {
      method: "DELETE",
      //MUST match the data type body is sending
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        //card with the same id as the button will be removed
        $(`#${e.target.id}`).remove();
      });
  }

  function addRecp(e) {
    //if user is not signed in, prompt user to sign in first to use add button
    if (!isUserSignedIn()) {
      alert("please sign in to add");
    } else {
      //send data to server
      const data = {
        email: showCurrentUserInfo().email,
        mealId: e.target.id,
      };

      fetch("https://recipe-finder-group404.herokuapp.com/", {
        method: "POST",
        //MUST match the data type body is sending
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Added Successfully");
        });
    }
  }
});
