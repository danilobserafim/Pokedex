const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type')
const title = document.getElementById('title')
const cards = document.getElementById('cards')
const menuTypes = document.getElementById('menuTypes')

function ShowDetails(id) {
    window.location.href = `./details.html?id=${id}`
}


async function ShowTypes() {
    await fetch("https://pokeapi.co/api/v2/type/").then(response => response.json()).then(data =>{
        menuTypes.innerHTML += `<a href='../'>All</a>`

        data.results.map(type=>{

        menuTypes.innerHTML += `<a href='./types.html?type=${type.name}'>${type.name}</a>`

        })

    })
}

async function ShowTypesPokemons(type) {
    ShowTypes()
    await fetch(`https://pokeapi.co/api/v2/type/${type}/`).then(response => response.json()).then(data => data).then(pokemons =>{
        title.innerText = pokemons.name
        menuTypes.innerHTML += ``
        
        pokemons.pokemon.map(async poke =>{
            await fetch(poke.pokemon.url).then(response=> response.json()).then(pokemon =>{
                cards.innerHTML += `<li class='${pokemon.types[0].type.name} card' onClick='ShowDetails(${pokemon.id})'>
                <div class='containerTypes'>
                ${pokemon.types.map( typeName => `<span class='type'>${typeName.type.name}</span>`)}
                </div>
                <h1 class='pokeName'>${pokemon.name}</h1>
                <img src=${pokemon.sprites.other.dream_world.front_default ? pokemon.sprites.other.dream_world.front_default : "../assets/images/no_foto.png"} class='cardImg'/>
                </li>
                `
            })
        })
    })

}

cards.onload(ShowTypesPokemons(type))

