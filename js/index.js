const compose = (...functions) => data =>
    functions.reduceRight((value, func) => func(value), data);


const $DESCRIPTION = document.getElementById('$description');
const $CALORIES = document.getElementById('$calories');
const $CARBS = document.getElementById('$carbs');
const $PROTEIN = document.getElementById('$protein');
const $ADD = document.getElementById('$add');

const $INPUTS = [$DESCRIPTION, $CALORIES, $CARBS, $PROTEIN];

let list = [
]

//const $DESCRIPTION = description.value

const isEmpty = input => input.value;

const inputsAreEmpty = () => isEmpty($DESCRIPTION) && isEmpty($CALORIES) && isEmpty($CARBS) && isEmpty($PROTEIN);

const keyDownInput = () => {
    $INPUTS.forEach((input) => {
        input.addEventListener('change', () => {
            input.classList.remove('is-invalid')})
    });
}

const addToList = () => {
    const newItem = {
        description: $DESCRIPTION.value,
        calories: +$CALORIES.value,
        carbs: +$CARBS.value,
        protein: +$PROTEIN.value
    }
    list.push(newItem);
    console.log(list);
}

const cleanInputs = () => {
    $INPUTS.forEach((input) => {
        input.value = '';
    })
}

const validateInputs = () => {
    $INPUTS.forEach((input) => {
        input.value ? '' : input.classList.add('is-invalid');        
    });    

    if (inputsAreEmpty()){
        addToList();
        cleanInputs();
    } else {
            console.log('Inputs are empty!');
    }
}

keyDownInput();

