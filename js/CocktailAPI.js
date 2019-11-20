class COCKTAIL {

    // fetching categories
    async getCategories(){
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
        const categoriesList = await fetch(URL);
        const categoriesListJSON = await categoriesList.json();

        ui.addCategories(categoriesListJSON.drinks);
    }

    // fetch data by cock name
    async getDataByCocktail(cocktail){
        
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;
        const cocktailInfo = await fetch(URL);
        const cocktailJSON = await cocktailInfo.json();
        return cocktailJSON;
    }
    // fetch data by ingredient
    async getDataByIngredient(ingredient){
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
        const ingredientInfo = await fetch(URL);
        const ingredientJSON = await ingredientInfo.json();

        return ingredientJSON;
    }
    // fetch data for MODAL in category page
    async modalRecipies(id){
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const modalInfo = await fetch(URL);
        const modalJSON = await modalInfo.json();

        ui.displayModal(modalJSON.drinks[0]);
    }
    // fetch data by category
    async getDataByCategory(category){        
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
        const categoryInfo = await fetch(URL);
        const categoryJSON = await categoryInfo.json();

        return categoryJSON;
    }

    async favouritesArray(id){
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const favouritesInfo = await fetch(URL);
        const favouritesJSON = await favouritesInfo.json();

        return favouritesJSON.drinks[0];
    }
}