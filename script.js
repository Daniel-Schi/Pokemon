let allPokemon = [];
let amount = 20;
let offset = 0;
let pokemonNames = [];
let firstPokemon = 0;
let maxLimit = 1000;
let pokemonInfo = [];
let currentPokemonIndex = 0;

/*Search Section*/

function searchPokemon() {
    let searchInput = document.getElementById('search').value.toLowerCase();
    let matchingPokemons = pokemonNames.filter(name => name.startsWith(searchInput));
    
    renderMatchingPokemons(matchingPokemons);
    searchInput.value = '';
    
    document.addEventListener('click', function (event) {
        let searchInput = document.getElementById('search');
        if (!event.target.closest('.search') && !event.target.closest('.inputBox')) {
            searchInput.value = '';
        }
    });
}


function resetPokemons() {
    document.getElementById('pokemonsOverview').innerHTML = '';  
}


async function renderMatchingPokemons(matchingPokemons) {
    let pokemonsOverview = document.getElementById('pokemonsOverview');
    if (!pokemonsOverview) {
        return;
    }
    resetPokemons();
    for (let i = 0; i < matchingPokemons.length; i++) {
        let pokemonName = matchingPokemons[i];
        let index = pokemonNames.indexOf(pokemonName);
        let pokemon = allPokemon['results'][index];
        let pokemonNameFormatted = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        pokemonsOverview.innerHTML += generatePokemonHTML(index, pokemonNameFormatted, pokemon);
        
        await renderPokemonInfo(index);
    }
}

/*API Requests*/

async function loadPokemon() {
    amount = 20;
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=0`;
    let response = await fetch(url);
    allPokemon = await response.json();
    
    renderPokemons();
    showAdPokemon('previous');
    showAdPokemon('next');
    
}

 
async function renderPokemonInfo(i) {
    let url = allPokemon['results'][i]['url'];
    let response = await fetch(url);
    let currentPokemon = await response.json();
    pokemonInfo[i] = currentPokemon;
   
    morePokemonInfos(i, currentPokemon);
}


async function renderPokemons() {
    let pokemon = allPokemon['results'];

    for (let i = offset; i < offset + amount; i++) {
        let pokemonName = pokemon[i - offset]['name'].charAt(0).toUpperCase() + pokemon[i - offset]['name'].slice(1);
        document.getElementById(`pokemonsOverview`).innerHTML += generatePokemonHTML(i, pokemonName);
        pokemonNames.push(pokemon[i - offset]['name']);
        
        await renderPokemonInfo(i);    
    }
}

/* Load More Section*/

async function loadMorePokemons() {
    offset += amount; 
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=${offset}`;
    let response = await fetch(url);
    let morePokemon = await response.json();

    renderMorePokemons(morePokemon);   
}


async function renderMorePokemons(morePokemon) {
    let pokemon = morePokemon['results'];

    let renderPromises = [];
    for (let i = offset; i < offset + amount; i++) {
        let pokemonName = pokemon[i - offset]['name'].charAt(0).toUpperCase() + pokemon[i - offset]['name'].slice(1);
        document.getElementById(`pokemonsOverview`).innerHTML += generatePokemonHTML(i, pokemonName);
        pokemonNames.push(pokemon[i - offset]['name']);
        allPokemon['results'][i] = pokemon[i - offset];
        renderPromises.push(renderPokemonInfo(i));
    }

    await Promise.all(renderPromises);
    showAdPokemon('previous');
    showAdPokemon('next');
}

/* More Pokemon Infos*/

function morePokemonInfos(i, currentPokemon) {
    let pokeTypeOne = currentPokemon['types'][0]['type']['name'].charAt(0).toUpperCase() + currentPokemon['types'][0]['type']['name'].slice(1);
    document.getElementById(`pokemonTypeOne${i}`).innerHTML = pokeTypeOne;
    if (currentPokemon['types'][1]) {
        let pokeTypeTwo = currentPokemon['types'][1]['type']['name'].charAt(0).toUpperCase() + currentPokemon['types'][1]['type']['name'].slice(1);
        document.getElementById(`pokemonTypeTwo${i}`).innerHTML = pokeTypeTwo;
    } else {
        document.getElementById(`pokemonTypeTwo${i}`).innerHTML = "";
    }
    let pokemonImage = currentPokemon['sprites']['other']['home']['front_default'];
    moreInfos(i, pokemonImage);
    pokemonColor(i, currentPokemon);
    pokemonTypeBorder(i, currentPokemon);
}


function moreInfos(i, pokemonImage) {
    document.getElementById(`pokemonImage${i}`).src = pokemonImage;
}


function pokemonTypeBorder(i, currentPokemon) {
    let onePokemonCard = document.getElementById(`pokemonTypeOne${i}`);
    let twoPokemonCard = document.getElementById(`pokemonTypeTwo${i}`);

    if (currentPokemon && currentPokemon['types'].length > 0) {
        onePokemonCard.style.border = "3px solid rgb(255 255 255 / 80%)";
        if (currentPokemon['types'].length > 1) {
            twoPokemonCard.style.border = "3px solid rgb(255 255 255 / 80%)";
        } else {
            twoPokemonCard.style.border = "none";
        }
    } else {
        onePokemonCard.style.border = "none";
        twoPokemonCard.style.border = "none";
    }
}

