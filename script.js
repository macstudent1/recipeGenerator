document.addEventListener("DOMContentLoaded", function () {
    const ingredientInput = document.getElementById("ingredient");
    const searchButton = document.getElementById("search");
    const resultsDiv = document.getElementById("results");

    searchButton.addEventListener("click", function () {
        const ingredient = ingredientInput.value.trim();
        if (ingredient) {
            resultsDiv.innerHTML = "Searching for recipes...";
            searchRecipes(ingredient);
        }
    });

    function searchRecipes(ingredient) {
        // Replace 'YOUR_API_KEY' with your Spoonacular API key
        const apiKey = '6aa1f30436d745f4a722aac50e84c259';
        const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&apiKey=${apiKey}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                displayRecipes(data);
            })
            .catch((error) => {
                resultsDiv.innerHTML = "Error: Unable to fetch recipes.";
            });
    }

    function displayRecipes(recipes) {
        if (recipes.length === 0) {
            resultsDiv.innerHTML = "No recipes found.";
        } else {
            resultsDiv.innerHTML = "<h2>Recipes:</h2>";
            const ul = document.createElement("ul");
            recipes.forEach((recipe) => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="${recipe.sourceUrl}" target="_blank">${recipe.title}</a>`;
                ul.appendChild(li);
            });
            resultsDiv.appendChild(ul);
        }
    }
});
