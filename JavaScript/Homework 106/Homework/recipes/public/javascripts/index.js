import recipe from "./recipe.js";
import form from "./form.js";
(async function () {
    try {
        const r = await fetch('/recipes');
        if (!r.ok) {
            throw new Error('No Recipes Loaded')
        }
        const recipes = await r.json();

        recipes.forEach(async element => {
            recipe(await element)
        });
    } catch (error) {
        console.log(error)
    }

    document.getElementById('addRecipe').addEventListener('click', async () => {
      form();
    });

}());