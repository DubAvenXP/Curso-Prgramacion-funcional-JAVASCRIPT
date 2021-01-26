const compose = (...functions) => data =>
    functions.reduceRight((value, func) => func(value), data);


const $DESCRIPTION = document.getElementById('$description');
const $CALORIES = document.getElementById('$calories');
const $CARBS = document.getElementById('$carbs');
const $PROTEIN = document.getElementById('$protein');
const $ADD = document.getElementById('$add');

const $INPUTS = [$DESCRIPTION, $CALORIES, $CARBS, $PROTEIN];

//const $DESCRIPTION = description.value

(function keydownEvent(){
    $INPUTS.forEach((input) => {
        input.addEventListener('change', () => {
            input.classList.remove('is-invalid')})
    });
})();

const isEmpty = input => input.value;

const inputsAreEmpty = () => isEmpty($DESCRIPTION) && isEmpty($CALORIES) && isEmpty($CARBS) && isEmpty($PROTEIN);

const validateInputs = () => {
    $INPUTS.forEach((input) => {
        input.value ? '' : input.classList.add('is-invalid');
        if (inputsAreEmpty()){
            console.log('Inputs are ok!');
        } else {
                console.log('Inputs are empty!');
            }
    });
    
}

