class UI {
	showError(text) {
		// disable submit if no data
		const btn = document.querySelector('.btn-success');
		btn.disabled = true;
		// add error DIV
		const errorDiv = document.createElement('div');
		errorDiv.innerHTML = `
        <div class = "alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">x</button>
            ${text}
        </div>
        `;

		const reference = document.querySelector('.jumbotron h1');
		const parent = reference.parentElement;
		parent.insertBefore(errorDiv, reference);
		// active button again + remove error DIV
		const closeBTN = document.querySelector('.close');
		closeBTN.addEventListener('click', () => {
			btn.disabled = false;
			errorDiv.remove();
		});
		setTimeout(() => {
			btn.disabled = false;
			errorDiv.remove();
		}, 3000);
	}

	updateButtons() {
		const storageData = storage.getData();
		const buttons = [ ...document.querySelectorAll('.btn-outline-info') ];
		storageData.forEach((storageItem) => {
			buttons.forEach((button) => {
				if (storageItem.idDrink == button.getAttribute('data-id')) {
					button.classList.add('is-favorite');
					button.textContent = '-';
				}
			});
		});
	}

	displayIngredients(cocktail) {
		let obj = Object.getOwnPropertyNames(cocktail);
		let LIST = ``;

		for (let i = 0; i < obj.length; i++) {
			if (obj[i].includes('strIngredient')) {
				if (cocktail[obj[i]] !== '') {
					let j = obj[i].replace('strIngredient', 'strMeasure');
					if (cocktail[j] !== null) {
						if (cocktail[j].length <= 2) {
							LIST += `
                            <li class="list-group-item">${cocktail[obj[i]]} - By taste</li>
                            `;
						} else {
							LIST += `
                            <li class="list-group-item">${cocktail[obj[i]]} - ${cocktail[j]}</li>
                            `;
						}
					} 
				}
			}
		}
		return LIST;
	}

	createNameDOM(dataArray) {
		const resultsDiv = document.querySelector('#results');
		const wrapper = document.querySelector('.results-wrapper');
		wrapper.style.display = 'block';
		let HTML = ``;

		dataArray.forEach((cocktail) => {
			HTML += `<div class="col-md-6">
                    <div class="card my-3">
                        <button type="button" data-id="${cocktail.idDrink}" class="favorite-btn btn btn-outline-info">
                        +
                        </button>
                        <img class="card-img-top" src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">

                        <div class="card-body">
                            <h2 class="card-title text-center">${cocktail.strDrink}</h2>
                            <p class="card-text font-weight-bold">Instructions: </p>
                            <p class="card-text">
                                    ${cocktail.strInstructions}
                            </p>
                            <p class="card-text">
                                <ul class="list-group">
                                        <li class="list-group-item alert alert-danger">Ingredients</li>
                                        ${this.displayIngredients(cocktail)}
                                </ul>
                            </p>
                            <p class="card-text font-weight-bold">Extra Information:</p>
                            <p class="card-text">
                                <span class="badge badge-pill badge-success">
                                        ${cocktail.strAlcoholic}
                                </span>
                                <span class="badge badge-pill badge-warning">
                                        Category: ${cocktail.strCategory}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                `;
		});
		resultsDiv.innerHTML = HTML;
		this.updateButtons();
	}

	createIngredientDOM(dataArray) {
		const resultsDiv = document.querySelector('#results');
		const wrapper = document.querySelector('.results-wrapper');
		wrapper.style.display = 'block';
		let HTML = ``;

		dataArray.forEach((drink) => {
			HTML += `
                 <div class="col-md-4">
                      <div class="card my-3">
                           <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                           +
                           </button>
                           <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                           <div class="card-body">
                                <h2 class="card-title text-center">${drink.strDrink}</h2>
                                <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
                           </div>
                      </div>
                 </div>
            `;
		});
		resultsDiv.innerHTML = HTML;
		this.updateButtons();
	}

	createCategoryDOM(dataArray) {
		const resultsDiv = document.querySelector('#results');
		const wrapper = document.querySelector('.results-wrapper');
		wrapper.style.display = 'block';
		let HTML = ``;

		dataArray.forEach((drink) => {
			HTML += `
                 
            `;
		});
		resultsDiv.innerHTML = HTML;
	}

	displayModal(drink) {
		const modal = document.querySelector('.modal-content');
		modal.innerHTML = `
        <div class="modal-header">
                    <h2 class="modal-title">${drink.strDrink}</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                        <h3 class="alert alert-success">Preparation:</h3>
                        <div class="description-text mb-4">${drink.strInstructions}</div>

                        <h3  class="alert alert-success">Ingredients:</h3>
                        <div class="ingredient-list">
                                <ul class="list-group">${this.displayIngredients(drink)}</ul>
                        </div>
                    <div class="ingredients mt-3">

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        `;
	}

	addCategories(listArray) {
		let options = `<option value="0" selected="selected">Select a drink...</option>`;
		let search = document.querySelector('#search');
		listArray.forEach((list, index) => {
			options += `
            <option value="${list.strCategory.split(' ').join('_')}">${list.strCategory}</option>
            `;
		});
		search.innerHTML = options;
	}

	displayFAVS() {
		const favoritesDOM = document.querySelector('#favorites tbody');
		let favsList = storage.getData();
		favoritesDOM.innerHTML = ``;
		let HTML = ``;
		favsList.forEach((list) => {
			HTML += `<tr>
                    <td>
                        <img src="${list.strDrinkThumb}" alt="${list.strDrink}" width=100>
                        </td>
                        <td>${list.strDrink}</td>
                        <td>
                                <a href="#" data-toggle="modal" data-target="#recipe" data-id="${list.idDrink}" class="btn btn-success get-recipe" >
                                    View
                                </a>
                        </td>
                        <td>
                                <a href="#" data-id="${list.idDrink}" class="btn btn-danger remove-recipe" >
                                    Remove
                                </a>
                    </td>
                </tr>
                `;
		});
		favoritesDOM.innerHTML = HTML;
	}
}
