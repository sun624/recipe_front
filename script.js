$(document).ready(() => {
  $(".find-meal").on("click", () => {
    $(".meals").empty();
    const mealName = $("input").val();
    getMeal(mealName).catch(() => {
      const error = "We Cannot Find Your Food ! Please Try Again";
      alert(error);
    }); //
    $("input").val("");
  });

  async function getMeal(name) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    const data = await response.json();
    const { meals } = data;
    console.log(meals);
    for (let i = 0; i < meals.length; i++) {
      displayCard(meals[i], i, false);
    }
    const btns = $(".addBtn");
    for (btn of btns) {
      $(btn).on("click", addRecp);
    }
  }

  function displayCard(item, count, isFav) {
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

    const card =
      `<div id="${item.idMeal}" class="card text-dark m-2 p-2" style="max-width: 18rem;" >
                          <img src="${item.strMealThumb}" class="card-img-top w-100" alt="..." data-bs-toggle="modal" data-bs-target="#exampleModal-${count}">
                          <div class="card-body" style="display:flex; flex-direction:coloumn;justify-content:center">
                          
                            <h5 class="card-title">${item.strMeal}</h5>
                            <p class="card-text">(${item.strArea})</p>
                            <div class="addBtn-container">
                            ` +
      btnSelector(item.idMeal, isFav) +
      `
                        
      </div>
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

    $(".meals").append(card);
  }

  function btnSelector(id, isFav) {
    if (!isFav) {
      return `<button type="button" data-bs-dismiss="modal" class="btn btn-danger rounded-pill px-3 addBtn" id=${id}>Add</button>`;
    } else {
      return `<button type="button" data-bs-dismiss="modal" class="btn btn-warning rounded-pill px-3 delBtn" id=${id}>Delete</button>`;
    }
  }

  $(".favorate").on("click", () => {
    $(".meals").empty();
    let url = new URL("https://recipe-finder-group404.herokuapp.com");
    url.search = new URLSearchParams({ email: showCurrentUserInfo().email });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          displayCard(data[i].recipe, i, true);
        }
        const btns = $(".delBtn");
        for (btn of btns) {
          $(btn).on("click", delRecp);
        }
      });
  });

  function delRecp(e) {
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
        $(`#${e.target.id}`).remove();
      });
  }

  function addRecp(e) {
    // console.log(e);
    // console.log("user sign in status" + isUserSignedIn());
    if (!isUserSignedIn()) {
      alert("please sign in to add");
    } else {
      //alert("user is signed in ");
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
