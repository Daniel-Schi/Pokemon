function generatePokemonHTML(i, pokemonName) {
    return /*html*/`
    <div id="onePokemonCard${i}" class="onePokemonCard" onclick="showOnePokemonCard(${i})">
            <div class="headline">
                <h1 id="pokemonName" class="pokemonName">${pokemonName}</h1>
                <span>#</span>
                <span id="id">${i}</span>
            </div>
            <img id="pokemonImage${i}">
            <div class="type">
            <div id="pokemonTypeOne${i}" class="typeColor"></div>
            <div id="pokemonTypeTwo${i}" class="typeColor"></div>
            </div>
        </div>
        `;
}


function generateShowOneCard(pokemonName, i) {
    return /*html*/`
    <div id="allPokemonCard"  onclick="allPokemonCard(event)">
        <div class="singleCard">
            <div class="singleHeader">
                <h1>${pokemonName}</h1>
                <span class="singleHashtag">#</span>
                <span class="singleId">${i}</span>
            </div>
            <div class="pokemonImage">
                <div class="previousImg"><img onclick="previousPokemon(event)" src="${pokemonInfo[i]['sprites']['other']['home']['front_default']}"></div>
                <div class="pokemonImg"><img src="${pokemonInfo[i]['sprites']['other']['home']['front_default']}"></div>
                <div class="nextImg"><img onclick="nextPokemon(event)" src="${pokemonInfo[i]['sprites']['other']['home']['front_default']}"></div>
            </div>
            <div class="typeSingleCard">
                <div class="singleTypeLeft">${pokemonInfo[i]['types'][0]['type']['name']}</div>
                <div class="singleTypeRight">${pokemonInfo[i]['types'][1] ? `<div>${pokemonInfo[i]['types'][1]['type']['name']}</div>` : ''}</div>
            </div>
        </div>
        <div id="pokemonInfo" class="pokemonInfo">
            <div class="about-stats-container">
                <div class="about-info" id="about" onclick="showAboutInfo(pokemonInfo, ${i})">ABOUT</div>
                <div class="stats-info" id="stats" onclick="showStatsInfo(pokemonInfo, ${i})">STATS</div>
            </div> 
            <div class="about-charts" id="charts">
                <div class="about">
                    <div class="about-specification">
                        <div class="about-speci-name">Height:</div>
                        <p>${(pokemonInfo[i]['height'] * 10)} cm</p></div>
                    <div class="about-specification">
                        <div class="about-speci-name">Weight:</div>
                        <p>${(pokemonInfo[i]['weight'] / 10)} kg</p></div>
                    <div class="about-specification">
                        <div class="about-speci-name">Abilities:</div>
                        <p>${pokemonInfo[i]['abilities'][0]['ability']['name']}</p>
                        <p>${pokemonInfo[i]['abilities'][1] ? pokemonInfo[i]['abilities'][1]['ability']['name'] : ''}</p>
                    </div>
                    <div class="about-specification">
                        <div class="about-speci-name">Base Exp.:</div>
                        <p>${pokemonInfo[i]['base_experience']}</p></div>
                    </div>  
                    
                </div>   
            </div>
        </div>    
    `;
}


function createPokemonInfo(i, pokemonInfo) {
    return /*html*/`
           <div class="about">
                <div class="about-specification">
                    <div class="about-speci-name">Height:</div>
                    <p>${(pokemonInfo[i]['height'] * 10)} cm</p></div>
                <div class="about-specification">
                    <div class="about-speci-name">Weight:</div>
                    <p>${(pokemonInfo[i]['weight'] / 10)} kg</p></div>
                <div class="about-specification">
                    <div class="about-speci-name">Abilities:</div>
                    <p>${pokemonInfo[i]['abilities'][0]['ability']['name']}</p>
                    <p>${pokemonInfo[i]['abilities'][1] ? pokemonInfo[i]['abilities'][1]['ability']['name'] : ''}</p>
                </div>
                <div class="about-specification">
                    <div class="about-speci-name">Base Exp.:</div>
                    <p>${pokemonInfo[i]['base_experience']}</p></div>
                </div>   
            </div>
        `
}

function createPokemonStatsInfo(i) {
    document.getElementById(`charts${i}`)
    return /*html*/`
    <canvas id="myChart" width="200" height="150"></canvas></div>
    `;
}