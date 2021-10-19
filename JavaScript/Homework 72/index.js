(function () {
    "use strict";
    changePage();

    const selected = $('#recipes');
    const chosen = $('#chosen');
    const img = $('#img');
    const list = $('#list');

    async function changePage() {
        try {
            const items = await fetch('recipe.json');
            if (!items.ok) {
                throw new Error('page not found');
            }
            const myRecipes = await items.json();

            console.log('object');
            list.empty();
            chosen.text(selected.val());
            const rec = myRecipes.filter(recipe => recipe.name === selected.val())[0];
            img.attr('src', rec.url);
            rec.ingredients.forEach(element => {
                list.append(`<li>${element}</li>`);
            });
        } catch (error) {
            console.error(error);
        }
    }
    selected.change(() => { changePage(); });



}());