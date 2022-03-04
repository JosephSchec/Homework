import recipe from "./recipe.js";

export default function () {

    const name = createInput('name');
    const ingriedients = createInput('ingriedients');
    const directions = createInput('directions');

    const addButton = document.createElement('button');
    addButton.textContent = 'add';
    document.body.appendChild(addButton);
    addButton.addEventListener('click', async () => {
        const newRec = {
            name: name.value,
            ingriedients: ingriedients.value,
            directions: directions.value
        }
        try {
            const r = await fetch('/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRec)
            })
            if (!r.ok) {
                throw new Error('Cant add right now')
            }
            recipe(newRec);
            document.getElementById('form').style.display = 'hidden';
        } catch (error) {
            console.log(error)
        }
    });
}
function createInput(value) {
    const body = document.body;
    const form = document.createElement('form');
    form.id = 'form'
    const valueInput = document.createElement('input');
    valueInput.id = value;
    const valueLabel = document.createElement('label');
    valueLabel.textContent = value;
    form.appendChild(valueLabel)
    form.appendChild(valueInput);
    body.appendChild(form)

    return valueInput;
}
