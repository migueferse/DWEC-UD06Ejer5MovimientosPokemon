const fetch = require('node-fetch');

async function getSpanishName(url) {
  try {
    let response = await fetch(url);
    if (response.status !== 200) {throw `Respuesta: ${response.status}`}
    let data = await response.json();
    let names = data.names;
    let nameSpa = names.filter(names => names.language.name === 'es');
    let name = nameSpa[0].name;
    return name;    
  } catch (error) {
    console.log(error);
  }
}

async function getNamesUnsorted(movementsUrl) {
  try {
    let arrayNames = await Promise.all(
      movementsUrl.map(async (url) => {return await getSpanishName(url)})    
    )
    return arrayNames;    
  } catch (error) {
    console.log(error);
  }
}

async function movimientos(pokemonName) {
  const URLPOKEMON = 'https://pokeapi.co/api/v2/pokemon/'
  let url = URLPOKEMON + pokemonName;
  try {
    let response = await fetch(url);
    console.log(`status: ${response.status}` );
    if (response.status !== 200) {throw `Respuesta: ${response.status}`}
    let data = await response.json();
    let movements = data.moves;
    let movementsUrl = movements.map(movements => movements.move.url);
    let arrayNames = await getNamesUnsorted(movementsUrl)
    let arrayNamesSorted = arrayNames.sort();
    console.log(arrayNamesSorted);    
  } catch (error) {
    console.log('Ha tenido un error por ' + error);
  }
}

movimientos('bulbasaur');