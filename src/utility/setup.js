import makeBerryObject from "./Berry";

async function initializeBerries() {
  // get 60 berries from the game
  const berries = await fetch('https://pokeapi.co/api/v2/berry/?limit=60').then(res => res.json()).then(json => json.results);

  // get the info about the berry from the api
  const berryInfo = await Promise.all(berries.map(element => fetch(element.url).then(res => res.json()).then(json => json)));
  
  // get item information about the berry
  const berryItems = await Promise.all(berryInfo.map(element => fetch(element.item.url).then(res => res.json()).then(json => json)));

  const berryObjects = berryItems.map(item => {
    return makeBerryObject(formatBerryName(item.name), item.sprites.default, crypto.randomUUID());
  })

  return berryObjects;
}

// formats berry name to single word, capitalized 
// raw: example-berry
// formatted: Example
function formatBerryName(rawName) {
  const dashIndex = rawName.indexOf('-');
  const firstHalf = rawName.slice(0, dashIndex);
  const capitalizedFirst = firstHalf.charAt(0).toUpperCase();

  return `${capitalizedFirst}${firstHalf.slice(1)}`;
}

export { initializeBerries };
