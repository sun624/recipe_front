$(document).ready(() => {
  $(".find-meal").on("click", () => {
    $(".meals").empty();
    const mealName = $("input").val();
    getMeal(mealName).catch(() => {
      const error = "We Cannot Find Your Food ! Please Try Again";
      alert(error);
    }); //
  });

  async function getMeal(name) {
    let count = 0;
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    const data = await response.json();
    const { meals } = data;
    console.log(meals);
    for (meal of meals) {
      myFunction(meal);
    }

    function myFunction(item) {
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
        `<div class="card text-dark m-2 p-2" style="max-width: 18rem;" data-bs-toggle="modal" data-bs-target="#exampleModal-${count}">
                          <img src="${item.strMealThumb}" class="card-img-top w-100" alt="...">
                          <div class="card-body">
                            <h5 class="card-title">${item.strMeal}</h5>
                            <p class="card-text">(${item.strArea})</p>
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
                                <button type="button" class="btn btn-danger rounded-pill px-3" id="addBtn" onclick="addRecp()">Add</button>
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
      count++;
    }
  }

  function addRecp() {
    if (!isUserSignedIn()) {
      alert("please sign in to add");
    } else {
      //send data to server
    }
  }

});
