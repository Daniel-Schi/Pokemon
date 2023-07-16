function pokemonColor(i, currentPokemon) {
    let onePokemonCard = document.getElementById(`onePokemonCard${i}`);
    let typeColor = currentPokemon['types'][0]['type']['name'];
    switch (typeColor) {
        case 'grass':
            onePokemonCard.style.backgroundColor = "rgba(23, 255, 0, 0.5)";
            break;
        case 'fire':
            onePokemonCard.style.backgroundColor = "rgba(213, 0, 0, 0.5)"; 
            break;
        case 'water':
            onePokemonCard.style.backgroundColor = "rgba(14, 145, 253, 0.5)";  
            break;
        case 'electric':
            onePokemonCard.style.backgroundColor = "rgba(254, 218, 120, 0.5)";
            break;
        case 'normal':
            onePokemonCard.style.backgroundColor = "rgba(183, 183, 170, 0.5)";
            break;
        case 'fighting':
            onePokemonCard.style.backgroundColor = "rgba(177, 82, 71, 0.5)";
            break;
        case 'flying':
            onePokemonCard.style.backgroundColor = "rgba(121, 168, 241, 0.5)";
            break;
        case 'poison':
            onePokemonCard.style.backgroundColor = "rgba(156, 88, 148, 0.5)";
            break;
        case 'ground':
            onePokemonCard.style.backgroundColor = "rgba(236, 206, 89, 0.5)";           
            break;
        case 'rock':
            onePokemonCard.style.backgroundColor = "rgba(205, 189, 114, 0.5)";
            break;
        case 'bug':
            onePokemonCard.style.backgroundColor = "rgba(196, 207, 34, 0.5)";
            break;
        case 'ghost':
            onePokemonCard.style.backgroundColor = "rgba(116, 114, 213, 0.5)";
            break;
        case 'psychic':
            onePokemonCard.style.backgroundColor = "rgba(249, 95, 173, 0.5)";
            break;
        case 'ice':
            onePokemonCard.style.backgroundColor = "rgba(150, 242, 255, 0.5)";
            break;
        case 'dragon':
            onePokemonCard.style.backgroundColor = "rgba(117, 103, 201, 0.5)";
            break;
        case 'dark':
            onePokemonCard.style.backgroundColor = "rgba(143, 106, 88, 0.5)";
            break;
        case 'steel':
            onePokemonCard.style.backgroundColor = "rgba(196, 195, 217, 0.5)";
            break;
        case 'fairy':
            onePokemonCard.style.backgroundColor = "rgba(249, 177, 254, 0.5)";
            break;
    }
}