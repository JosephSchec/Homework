export default async function (recipe) {
    const recipes = document.getElementById('recipes');
    const thisRecipe = document.createElement('div');
    thisRecipe.id = recipe.id;
    thisRecipe.className = 'recipe';
    recipes.appendChild(thisRecipe);
    //NAME
    const recName = document.createElement('h1');
    recName.innerText = recipe.name;
    thisRecipe.appendChild(recName)

    //INGRIEDIENTS
    const ingriedientList = document.createElement('h2')
    ingriedientList.innerText = 'Ingriedients'
    thisRecipe.appendChild(ingriedientList)
    let ingriedients = document.createElement('ul');
    const ingriedientArr = recipe.ingriedients.split(' ');
    ingriedientArr.forEach(ingriedient => {
        const inG = document.createElement('li');
        inG.innerText = ingriedient;
        inG.className = `${recName.textContent}listItem inG`;
        ingriedients.appendChild(inG);
    });
    thisRecipe.appendChild(ingriedients)

    //DIRECTIONS
    const directionsList = document.createElement('h2')
    directionsList.innerText = 'directions'
    thisRecipe.appendChild(directionsList)
    let directions = document.createElement('ul');
    const directionsArr = recipe.directions.split(' ');
    directionsArr.forEach(direction => {
        const dir = document.createElement('li');
        dir.className = `${recName.textContent}listItem dir`;
        dir.innerText = direction;
        directions.appendChild(dir);
    });
    thisRecipe.appendChild(directions)
    //EDIT 
    const editButton = document.createElement('button');
    editButton.textContent = 'edit';
    editButton.addEventListener('click', () => {
        editButton.textContent = 'save';
        recName.contentEditable = "true";
        const itemsArr = document.getElementsByClassName(`${recName.textContent}listItem`);
        for (let i = 0; i < itemsArr.length; i++) {
            itemsArr[i].contentEditable = "true"
        }

        editButton.addEventListener('click', async () => {
            editButton.textContent = 'edit';
            recName.contentEditable = "false";
            let ingriedientList = '';
            let directionList = '';

            for (let i = 0; i < itemsArr.length; i++) {
                if (itemsArr[i].classList.contains('inG') && !ingriedientList.includes(itemsArr[i].textContent)) {
                    ingriedientList += `${itemsArr[i].textContent} `
                }
                else if (itemsArr[i].classList.contains('dir') && !directionList.includes(itemsArr[i].textContent)) {
                    directionList += `${itemsArr[i].textContent} `
                }
                itemsArr[i].contentEditable = "false";
            }
            console.log(ingriedientList, directionList)
            const newRecipe = {
                name: recName.textContent,
                ingriedients: ingriedientList,
                directions: directionList
            }
            try {
                const r = await fetch(`/recipes/${recipe.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newRecipe)
                });
                if (!r.ok) {
                    throw new Error('couldnt update')
                }
                ingriedients = ingriedientList;
                directions = directionList;
            } catch (error) {
                console.log(error)
            }

        })

    });
    //DELETE
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', async () => {
        try {
            const r = await fetch(`/recipes/${recipe.id}`, {
                method: 'DELETE'
            });
            if (!r.ok) {
                throw new Error(`couldnt delete `);
            }
            thisRecipe.remove();
        } catch (err) { console.log(err) }
    })
    thisRecipe.appendChild(editButton);
    thisRecipe.appendChild(deleteButton);
}