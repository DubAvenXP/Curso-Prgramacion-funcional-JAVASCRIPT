const compose = (...functions) => data =>
    functions.reduceRight((value, func) => func(value), data);

// const addAtributesToStr =  (obj = {}) => {
//     const keys = Object.keys(obj);
//     const attributes = [];

//     for (let i = 0; i < keys.length; i++) {
//         let attribute = keys[i];
//         attributes.push(` ${attribute}="${obj[attribute]}"`);
//     }
//     return attributes.join('');
// }

const addAtributesToStr = (obj = {}) =>
    Object.keys(obj)
    .map((attribute) =>  ` ${attribute}="${obj[attribute]}"`)
    .join('');


const tagAttributes = obj => (content = '') => 
`<${obj.tag}${obj.attributes ?  addAtributesToStr(obj.attributes) : ''}>${content}</${obj.tag}>`

// const p = tagAttributes({
//     tag: 'p',
//     attributes: {
//         class: 'post',
//         color: 'red'
//     }
// });

// const tag = t => {
//     let addContent = '';
//     if (typeof t === 'string') {
//         addContent = tagAttributes({tag: t});

//     } else {
//         addContent = tagAttributes(t);
//     }
//     return addContent;
// }

const tag = t => typeof t === 'string' ? tagAttributes({tag: t}) : tagAttributes(t);    


// Un clousure recuerda el contexto en el que fue creado
// const generateHTMLTag = tag => content => `<${tag}>${content}</${tag}>`
// const h1 = generateHTMLTag('h1');
// h1('bla bla bla'); //<h1>bla bla bla</h1>


//la funcion tag construye la funcion content
// const h1 = tag('h1');
// const p = tag({
//     tag: 'p',
//     attributes: {
//         class: 'post',
//         color: 'red'
//     }
// });


const tr = tag('tr');
// const trs = item => tr(tds(item));
const trs = items => compose(tr, tds)(items)

const td = tag('td');
const tds = item => item.map(td).join('');

const $DESCRIPTION = document.getElementById('$description');
const $CALORIES = document.getElementById('$calories');
const $CARBS = document.getElementById('$carbs');
const $PROTEIN = document.getElementById('$protein');
const $ADD = document.getElementById('$add');

const $totalCalories = document.getElementById('total-calories');
const $totalCarbs = document.getElementById('total-carbs');
const $totalProtein = document.getElementById('total-protein');

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
}

const cleanInputs = () => {
    $INPUTS.forEach((input) => {
        input.value = '';
    })
}

const updateTotals = () => {
    let calories = 0, carbs = 0, proteins = 0;

    list.map(item => {
        calories += item.calories;
        carbs += item.carbs;
        proteins += item.protein;
    })

    $totalCalories.innerHTML = `${calories}`;
    $totalCarbs.innerHTML = `${carbs}`;
    $totalProtein.innerHTML = `${proteins}`;
}

const validateInputs = () => {
    $INPUTS.forEach((input) => {
        input.value ? '' : input.classList.add('is-invalid');        
    });    

    if (inputsAreEmpty()){
        addToList();
        cleanInputs();
        updateTotals();
        renderItems();
    } else {
            console.log('Inputs are empty!');
    }
}


const renderItems = () => {
    document.querySelector('tbody').innerHTML = ''

    list.map((item, index) => {

    const row = document.createElement('tr')
    const removeButton = tag({
        tag: 'button',
        attributes: {
            class: 'remove-button',
            onclick: `removeItem(${index})`
        }
    })('eliminar')
    row.innerHTML = trs([
        item.description,
        item.calories,
        item.carbs,
        item.protein,
        removeButton
    ]);

    document.querySelector('tbody').appendChild(row)
    });
}


const removeItem = (index) => {
    list = list.filter((item, i) => i !== index);

    updateTotals()
    renderItems()
}

keyDownInput();

