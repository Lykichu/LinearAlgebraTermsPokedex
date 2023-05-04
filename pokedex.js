const pokemonCount = 300;
var pokedex = {}; // {1 : {"term" : "linear equation", "name" : "bulbsaur", "img" : url, "type" : ["grass", "poison"], "desc" : "...."} }

window.onload = async function() {
    // getPokemon(1);
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
        //<div id="1" class="pokemon-name">BULBASAUR</div>
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["term"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemon-list").append(pokemon);
    }

    document.getElementById("pokemon-description1").innerText = pokedex[1]["name"].toUpperCase();
    document.getElementById("pokemon-description2").innerText = pokedex[1]["desc"];

    //console.log(pokedex);
}

async function getPokemon(num) {


    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];
    let pokemonName = pokemon["name"];

    

    if(num<20){
        
        let url1 = "https://raw.githubusercontent.com/Lykichu/LinearAlgebraTermsPokedex/main/PokemonDescriptions.json";
        let res1 = await fetch(url1);
        let pokemon1 = await res1.json();
        pokemonDesc = pokemon1["results"][num-1]["definition"];
        let linearTerm = pokemon1["results"][num-1]["term"];
        pokedex[num] = {"term" : linearTerm, "name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc};
    }
    else {
        
        res = await fetch(pokemon["species"]["url"]);
        let pokemon2 = await res.json();
        pokemonDesc = pokemon2["flavor_text_entries"][9]["flavor_text"];

        pokedex[num] = {"term" : pokemonName, "name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc};
    }

}



function updatePokemon(){
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    //clear previous type
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //update types
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); //adds background color and font color
        typesDiv.append(type);
    }

    //update description
    document.getElementById("pokemon-description1").innerText = pokedex[this.id]["name"].toUpperCase();
    document.getElementById("pokemon-description2").innerText = pokedex[this.id]["desc"];
}
