let hpStats = [];
let attackStats = [];
let defenseStats = [];
let specialAttackStats = [];
let specialDefenseStats = [];
let speedStats = [];

/*One Pokemon Card*/

function pokemonCard() {
    document.getElementById('pokemonOverlay').classList.add('d-none');
    document.body.style.overflow = 'auto';
}


function showOnePokemonCard(i) {
    document.body.style.overflow = 'hidden';
    let pokemonName = pokemonInfo[i]['name'].charAt(0).toUpperCase() + pokemonInfo[i]['name'].slice(1);
    currentPokemonIndex = i;
    let showOneCard = document.getElementById('pokemonOverlay');
    showOneCard.innerHTML = generateShowOneCard(pokemonName, i);
    showOneCard.classList.remove('d-none');
    showAdPokemon('previous');
    showAdPokemon('next');
}

/*Prev/Next Pokemon Section*/

function previousPokemon(event) {
    if (currentPokemonIndex == 0) {
        currentPokemonIndex = pokemonInfo.length - 1;
    } else {
        currentPokemonIndex--;
    }
    showOnePokemonCard(currentPokemonIndex);
    event.stopPropagation();
}


function nextPokemon(event) {
    if (currentPokemonIndex == pokemonInfo.length - 1) {
        currentPokemonIndex = 0;
    } else {
        currentPokemonIndex++;
    }
    showOnePokemonCard(currentPokemonIndex);
    event.stopPropagation();
}


function updatePokemonImage(element, pokemon) {
    if (element && pokemon?.sprites?.other?.home?.front_default) {
        element.src = pokemon.sprites.other.home.front_default;
    }
}


function showAdPokemon() {
    const previousIndex = (currentPokemonIndex === 0) ? (pokemonInfo.length - 1) : (currentPokemonIndex - 1);
    const nextIndex = (currentPokemonIndex === pokemonInfo.length - 1) ? 0 : (currentPokemonIndex + 1);
    const previousPokemon = pokemonInfo[previousIndex];
    const nextPokemon = pokemonInfo[nextIndex];

    const previousImgElement = document.querySelector('.previousImg img');
    const nextImgElement = document.querySelector('.nextImg img');

    updatePokemonImage(previousImgElement, previousPokemon);
    updatePokemonImage(nextImgElement, nextPokemon);
}


function allPokemonCard(event) {
    event.stopPropagation();
    document.getElementById('allPokemonCard').classList.remove('d-none');
}

/*About Section*/

function showAboutInfo(pokemonInfo, i) {
    let about = document.getElementById('charts');
    if (about !== null) {
        about.innerHTML = '';
        about.innerHTML += createPokemonInfo(i, pokemonInfo);
    }
}


function abilities(i, pokemonInfo) {
    let abilitiesOne = pokemonInfo[i]['abilities'][0]['ability']['name'].charAt(0).toUpperCase() + pokemonInfo[i]['abilities'][0]['ability']['name'].slice(1);
    document.getElementById(`abilities${i}`).innerHTML = abilitiesOne;
    if (pokemonInfo[i]['abilities'][1]) {
        let abilitiesTwo = pokemonInfo[i]['abilities'][1]['ability']['name'].charAt(0).toUpperCase() + pokemonInfo[i]['abilities'][1]['ability']['name'].slice(1);
        document.getElementById(`abilitiesTwo${i}`).innerHTML = abilitiesTwo;
    } else {
        document.getElementById(`abilitiesTwo${i}`).innerHTML = "";
    }
}

/*Stats Section*/

function showStatsInfo(pokemonInfo, i) {
    let stats = document.getElementById(`charts`);
    if (stats !== null) {
        stats.innerHTML = '';
        stats.innerHTML += createPokemonStatsInfo(i, pokemonInfo);
    }
    setStats(i, pokemonInfo);
}


function setStats(i, pokemonInfo) {
    let hp = pokemonInfo[i]['stats'][0]['base_stat'];
    let attack = pokemonInfo[i]['stats'][1]['base_stat'];
    let defense = pokemonInfo[i]['stats'][2]['base_stat'];
    let specialAttack = pokemonInfo[i]['stats'][3]['base_stat'];
    let specialDefense = pokemonInfo[i]['stats'][4]['base_stat'];
    let speed = pokemonInfo[i]['stats'][5]['base_stat'];
    pushStats(hp, attack, defense, specialAttack, specialDefense, speed);
    setChart();
}


function pushStats(hp, attack, defense, specialAttack, specialDefense, speed) {
    let statArrays = [hpStats, attackStats, defenseStats, specialAttackStats, specialDefenseStats, speedStats];

    for (let array of statArrays) {
        array.splice(0, array.length);
    }

    hpStats.push(hp);
    attackStats.push(attack);
    defenseStats.push(defense);
    specialAttackStats.push(specialAttack);
    specialDefenseStats.push(specialDefense);
    speedStats.push(speed);
}

/*Chart Section*/

function setChart() {
    const ctx = document.getElementById('myChart');
    const { statsLabels, statsData, backgroundColors, borderColors } = getChartOptions();
    const chartData = getChartData(statsLabels, statsData, backgroundColors, borderColors);

    new Chart(ctx, chartData);
}


function getChartOptions() {
    const statsLabels = ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'];
    const statsData = [hpStats, attackStats, defenseStats, specialAttackStats, specialDefenseStats, speedStats];
    const backgroundColors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)'];
    const borderColors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'];

    return {
        statsLabels,
        statsData,
        backgroundColors,
        borderColors
    };
}


function getChartData(labels, data, backgroundColors, borderColors) {
    const dataset = createDataset(data, backgroundColors, borderColors);

    return {
        type: 'bar',
        data: {
            legend: {
                display: false,
            },
            labels,
            datasets: [dataset]
        },
        options: {
            indexAxis: 'y',
        }
    };
}


function createDataset(data, backgroundColors, borderColors) {
    return {
        label: false,
        data,
        borderWidth: 1,
        fill: false,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
    };
}