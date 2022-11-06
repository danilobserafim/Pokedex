const title = document.getElementById("title")
const pageDetails = document.getElementById("details")
const btnBack = document.getElementsByTagName('button')
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id')

async function DetailsPokemon(id) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(response => response.json()).then((data) => {
        title.innerText = `Detalhes: ${data.name}`
        pageDetails.innerHTML += `
        <a href="../?page=${data.id / 60 < 1 ? 1 : Math.ceil(data.id / 66)}" id="btnBack"><img src="../assets/images/Google_material_icons_arrow_back_24px.svg.png" alt="X" ></a>        

        <div id='containerImage' class='${data.types[0].type.name}'>
        <a href='./details.html?id=${id > 1 ? data.id - 1:1}'class='backPokemon positionArrows' ><img src='../assets/images/left-arrow.png'/></a>

            <img src='${data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : "../assets/images/no_foto.png"}' id='imgPokemon'/>
            <h1>${data.name}</h1>
            <a href='./details.html?id=${data.id + 1}' class='nextPokemon positionArrows '><img src='../assets/images/right-arrow.png'/></a>
            <div id='types'>${data.types.map( typeName => `<span class='type'>${typeName.type.name}</span>`)}</div>
        </div>
        <div id='cards'>
            <div id='abilities' class='card'>
                <h2>Habilidades</h2>
                ${data.abilities.map(ability=>{
                    return `<span>${ability.ability.name}</span>`
                })}            
            </div>
            <div id='stats' class='card'>
                <h2>Status</h2>
                ${data.stats.map(stat =>{
                    return `<span>${stat.stat.name}: ${stat.base_stat}</span>`
                })}
            </div>
            <div id='moves' class='card'>
                <h2>Movimentos</h2>
                ${data.moves.map(move =>{
                    return `<span>${move.move.name}</span>`
                })}
            </div>
        </div>
        `
    }
        )
}
pageDetails.onload = DetailsPokemon(id)