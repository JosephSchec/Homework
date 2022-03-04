import recipe from "./recipe.js";

export default function () {

    const form = document.createElement('form');
    form.id = 'form'
    const name = createInput('name', form);
    const ingriedients = createInput('ingriedients', form);
    const directions = createInput('directions', form);

    const addButton = document.createElement('button');
    addButton.textContent = 'add';
    document.body.appendChild(addButton);
    addButton.style.display='block';
    addButton.addEventListener('click', async () => {
        const newRec = {
            name: name.value,
            ingriedients: ingriedients.value,
            directions: directions.value
        }
        try {
            const r = await fetch(`/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRec)
            })
            if (!r.ok) {
                throw new Error('Cant add right now')
            }
            const rec=await r.json();
            recipe(rec);
            document.getElementById('form').style.display = 'none';
            addButton.style.display='none';
        } catch (error) {
            console.log(error)
        }
    });
}
function createInput(value, form) {

    const valueInput = document.createElement('input');
    valueInput.id = value;
    const valueLabel = document.createElement('label');
    valueLabel.textContent = value;
    form.appendChild(valueLabel)
    form.appendChild(valueInput);
    document.body.appendChild(form)

    return valueInput;
}
