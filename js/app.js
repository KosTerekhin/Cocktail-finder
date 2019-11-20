const cocktail = new COCKTAIL();
const ui = new UI();
const storage = new STORAGE();

function getCocktails(e){
    e.preventDefault();

    let searchValue = document.querySelector('#search').value;
    
    // Checking that field have something entered
    if((searchValue == '') || (searchValue == 0)){
        // validation failed
        ui.showError('type what you are serching for or select category')    
    } 
    else {
        // FETCHING DATA 
        let serverResponse;
        const type = document.querySelector('#type').value;
       
        switch(type){
            case 'name':
                serverResponse = cocktail.getDataByCocktail(searchValue);
            break;

            case 'ingredient':
                serverResponse = cocktail.getDataByIngredient(searchValue);
            break;

            case 'category':
                serverResponse = cocktail.getDataByCategory(searchValue);
            break;
        };

        serverResponse.then(cocktails => {
            // check if we got the result
            
            if(cocktails.drinks === null){
                document.querySelector('#search').value = '';
                ui.showError('this cocktail does not exist')
            } 
            else {
                // Add data to the DOM
                if(type === 'name'){
                    ui.createNameDOM(cocktails.drinks);
                }
                else { 
                    ui.createIngredientDOM(cocktails.drinks); 
                };
                document.querySelector('#search').value = '';
            };
        });  
    };
};


// PROJECT START
document.addEventListener('DOMContentLoaded', ()=> {

    storage.updateStorage();
    const searchFrom = document.querySelector('#search-form');
    
    // Check that button exist on the HTML file
    if(searchFrom) {
        searchFrom.addEventListener('submit', getCocktails);   
    }
    // get-recepies button functionality
    const resultsBlock = document.querySelector('#results');
    if(resultsBlock){
        // fetch categories
        cocktail.getCategories();

        resultsBlock.addEventListener('click', e => {
            // modal
            if(e.target.classList.contains('get-recipe')){
                cocktail.modalRecipies(e.target.getAttribute('data-id'));
            };
            // add to FAV button
            if(e.target.classList.contains('btn-outline-info')){
                if(e.target.classList.contains('is-favorite')){
                e.target.classList.remove('is-favorite');
                e.target.textContent = '+';
                storage.removeFromStorage(e.target.getAttribute('data-id'));
                }
                else {
                e.target.classList.add('is-favorite');
                e.target.textContent = '-';
                storage.setData(e.target.getAttribute('data-id')); 
                }
            };
        })
    }
    // FAVORITES page
    const FAVS = document.querySelector('#favorites');
    if(FAVS){
        ui.displayFAVS();
        FAVS.addEventListener('click', e => {
            // FAVS RECIPE MODAL
            if(e.target.classList.contains('get-recipe')){
                cocktail.modalRecipies(e.target.getAttribute('data-id'));
            };

            // REMOVE BTN
            if(e.target.classList.contains('remove-recipe')){
                storage.removeData(e.target.getAttribute('data-id'))
            };
        });   
    }; 
});



