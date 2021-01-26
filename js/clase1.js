// Normal Function
function double(x) {
    return x * 2
}

// Arrow Function
const double = (x) => {
    return x * 2
}

// Short Arrow Function
const double = x => x*2

let car = { color: 'Black', year: '2019', km: 0, owner: {name: 'alejandro'} }

// Copiando car a newCar sin hacer referencia al mismo pointer (shallow copy)
// experimenta el mismo problema que Object.assign
let newCar = { ...car }

// Copiando car a newCar sin hacer referencia al mismo pointer (pero no copia los objetos internos)
// sigue copiando la referencia del owner
let newCar2 = Object.assign({}, car);

// Copiando car a newCar sin hacer referencia al mismo pointer y los objetos internos de igual forma
let newCar3 = JSON.parse(JSON.stringify(car));

// De modo que al parecer para hacer copias 
// profundas conviene o utilizar el hack de 
// json.parse(json.stringify(car)) o darle 
// uso a librerías externas como lodash o underscore.js.

// Con mutaciones (estamos mutando la listada que viene en el parametro sin saber si otra funcion la esta utilizando)
const addToList = (list, item, quantity) => {
	list.push({ // modificamos el argumento `list`
		item,
		quantity
	})
	return list
}

//  Sin mutaciones (inmutabilidad) (creamos una nueva lista para no alterar la original)
const addToList = (list, item, quantity) => {
	const newList = JSON.parse(JSON.stringify(list))
	newList.push({ // modificamos la copia del argumento
		item,
		quantity
	})

	return newList
}