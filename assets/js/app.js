import { pokeApi } from "./poke-api.js"
import elements from "./elements.js";

const app = {

    maxRecords: 493,
    limit: 10,
    offset: 0,

    convertPokemonToHtml(pokemon) {
        return `
            <li class="pokemon">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}"><span class="icon ${type}"></span> ${type}</li>`).join('')}
                    </ol>

                    <img class="poke-img" src="${pokemon.photo}"
                        alt="${pokemon.name}">

                    <div class="content-more-info">
                
                        <div class="container more-info">
                            <div id="top">
    
                                <div class="heart">
                                    <input id="iconHeart" type="checkbox" name="heart" value="heart">
                                </div>
    
                                <span id="number-pokemon">#${pokemon.number}</span>
                                
                                <button type="button" class="btnCloseMoreInfo" title="Fechar">
                                    <img src="./assets/img/x-dark.svg" alt="Ícone de um 'X'">
                                </button>
    
                            </div>
    
                            <div id="middle">
    
                                <div class="middle__img">
                                    <img src="${pokemon.photo}"
                                        alt="${pokemon.name}">
                                </div>
    
                                <div class="middle__info">
                                    <h2>${pokemon.name}</h2>
                                    <h3>${pokemon.type} Pókemon</h3>
                                </div>
    
                            </div>
    
                            <div id="bottom">
    
                                <div class="bottom-card about">
                                    <h4>Sobre</h4>
    
                                    <div class="bottom__info">
                                        <h5>
                                            <strong>Altura</strong> <span class="nth-capitalize">${pokemon.height} m</span>
                                        </h5>
    
                                        <h5>
                                            <strong>Peso</strong> <span class="nth-capitalize">${pokemon.weight} kg</span>
                                        </h5>
    
                                        <h5>
                                            <strong>Geração</strong> <span class="uppercase">${pokemon.generation}</span> 
                                        </h5>
    
                                        <h5>
                                            <strong>Habitat</strong> <span class="capitalize">${pokemon.habitat}</span> 
                                        </h5>
    
                                        <h5>
                                            <strong>Mítico</strong> <span class="capitalize">${pokemon.isMythical}</span> 
                                        </h5>
                                        
                                        <h5>
                                            <strong>Lendário</strong> <span class="capitalize">${pokemon.isLegendary}</span> 
                                        </h5>
    
                                        <h5>
                                            <strong>Forma</strong> <span class="capitalize">${pokemon.shape}</span> 
                                        </h5>
    
                                        <h5>
                                            <strong>Grupo</strong> 
    
                                            <ol class="bottom__eggGroups">
                                                ${pokemon.eggGroups.map((group) => `<li class="eggGroups capitalize">${group}</li>`).join('/')}
                                            </ol>
                                        </h5>
    
                                        <h5>
                                            <strong>Habilidades</strong> 
    
                                            <ol class="bottom__abilities">
                                                ${pokemon.abilities.map((ability) => `<li class="abilities capitalize">${ability}</li>`).join('')}
                                            </ol>
                                        </h5>
                                            
                                        <h5>
                                            <strong>Tipo</strong> 
    
                                            <ol class="bottom__types">
                                                ${pokemon.types.map((type) => `<li title="${type}" class="badge ${type}"><span class="icon ${type}"></span></li>`).join('')}
                                            </ol>
                                        </h5>
    
                                    </div>
                                </div>
    
                                <div class="bottom-card stats">
                                    <h4>Status</h4>
    
                                    <div class="status">
    
                                        <div class="status__info">
                                            <h5>HP</h5>
    
                                            <h5>${pokemon.stats[0]}</h5>
    
                                            <progress class="${pokemon.type}" value="${pokemon.stats[0]}" max="100">Vida: ${pokemon.stats[0]}</progress>
                                        </div>
    
                                        <div class="status__info">
                                            <h5>Attack</h5>
    
                                            <h5>${pokemon.stats[1]}</h5>
    
                                            <progress class="${pokemon.type}" value="${pokemon.stats[1]}" max="100">Ataque: ${pokemon.stats[1]}</progress>
                                        </div>
    
                                        <div class="status__info">
                                            <h5>Defense</h5>
    
                                            <h5>${pokemon.stats[2]}</h5>
    
                                            <progress class="${pokemon.type}" value="${pokemon.stats[2]}" max="100">Defesa: ${pokemon.stats[2]}</progress>
                                        </div>
    
                                        <div class="status__info">
                                            <h5>Sp.Atk</h5>
    
                                            <h5>${pokemon.stats[3]}</h5>
    
                                            <progress class="${pokemon.type}" value="${pokemon.stats[3]}" max="100">Ataque Especial: ${pokemon.stats[3]}</progress>
                                        </div>
    
                                        <div class="status__info">
                                            <h5>Sp.Def</h5>
    
                                            <h5>${pokemon.stats[4]}</h5>
    
                                            <progress class="${pokemon.type}" value="${pokemon.stats[4]}" max="100">Defesa Especial: ${pokemon.stats[4]}</progress>
                                        </div>
    
                                        <div class="status__info">
                                            <h5>Speed</h5>
    
                                            <h5>${pokemon.stats[5]}</h5>
    
                                            <progress class="${pokemon.type}" value="${pokemon.stats[5]}" max="100">Velocidade: ${pokemon.stats[5]}</progress>
                                        </div>
                                        
                                    </div>
                                </div>
    
                                <div class="bottom-card moves">
                                    <h4>Movimentos</h4>
    
                                    <h3>
                                        <ol class="bottom__moves">
                                            ${pokemon.moves.slice(0, 15).map((move) => `<li class="moves capitalize">${move}</li>`).join('')}
                                        </ol>
                                    </h3>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        `
    },

    loadPokemonItens(offset, limit) {
        
        pokeApi.getPokemons(offset, limit)
            .then((pokemons = []) => elements.pokemonList.innerHTML += pokemons.map(this.convertPokemonToHtml).join(''))

    },

    loadMorePokemons() {

        elements.loadMoreButton.addEventListener('click', () => {

            this.offset += this.limit
            const qtdRecordsWithNexPage = this.offset + this.limit

            const isMaxRecordsReached = qtdRecordsWithNexPage >= this.maxRecords
        
            if (isMaxRecordsReached) {

                const newLimit = this.maxRecords - this.offset
                this.loadPokemonItens(this.offset, newLimit)
        
                elements.loadMoreButton.parentElement.removeChild(elements.loadMoreButton)

            } 

            this.loadPokemonItens(this.offset, this.limit)

        })
    },

    filter: {

        getListElement(list, callback) {
            for (let item of list.children) callback(item)
        },
        
        filterSearch() {

            elements.filterSearch.addEventListener("input", () => {

                const isOrNoEmpty = elements.filterSearch.value != ""

                if (isOrNoEmpty) {
    
                    this.getListElement(elements.pokemonList, (card) => {

                        let pokemonName = card.querySelector(".name").textContent.toLowerCase()
                        let filterSearchValue = elements.filterSearch.value.toLowerCase()
                                        
                        !pokemonName.includes(filterSearchValue) ? card.style.display = "none" : card.style.display = "flex"

                    }) 
    
                } else {
                    
                    this.getListElement(elements.pokemonList, (card) => card.style.display = "flex")
                    
                }

            })

        },
    
        resetCounterFilter() {
            let count = parseInt(elements.filterButton.getAttribute("aria-count"))
            count = 0
            elements.filterButton.setAttribute("aria-count", count)
        },
    
        sumCounterFilter() {
            let count = parseInt(elements.filterButton.getAttribute("aria-count"))
            count = 1
            elements.filterButton.setAttribute("aria-count", count)
        },
        
        testType: {
    
            hasGrass(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeGrass = list[i].classList.contains("grass")

                    if (hasTypeGrass) return true
                    
                }
            },
    
            hasFire(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeFire = list[i].classList.contains("fire")

                    if (hasTypeFire) return true 

                }
            },
    
            hasNormal(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeNormal = list[i].classList.contains("normal")

                    if (hasTypeNormal) return true

                }
            },
    
            hasWater(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeWater = list[i].classList.contains("water")

                    if (hasTypeWater) return true

                }
            },
    
            hasElectric(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeElectric = list[i].classList.contains("electric")

                    if (hasTypeElectric) return true

                }
            },
    
            hasIce(list) {
                for (let i = 0; i < list.length; i++) {
                    
                    let hasTypeIce = list[i].classList.contains("ice")
                    
                    if (hasTypeIce) return true

                }
            },
    
            hasGround(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeGround = list[i].classList.contains("ground")

                    if (hasTypeGround) return true

                }
            },
    
            hasFlying(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeFlying = list[i].classList.contains("flying")

                    if (hasTypeFlying) return true

                }
            },
    
            hasPoison(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypePoison = list[i].classList.contains("poison")

                    if (hasTypePoison) return true

                }
            },
    
            hasFighting(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeFighting = list[i].classList.contains("fighting")

                    if (hasTypeFighting) return true

                }
            },
    
            hasPsychic(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypePsychic = list[i].classList.contains("psychic")

                    if (hasTypePsychic) return true

                }
            },
    
            hasDark(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeDark = list[i].classList.contains("dark")

                    if (hasTypeDark) return true

                }
            },
    
            hasRock(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeRock = list[i].classList.contains("rock")

                    if (hasTypeRock) return true

                }
            },
    
            hasBug(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeBug = list[i].classList.contains("bug")

                    if (hasTypeBug) return true

                }
            },
    
            hasGhost(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeGhost = list[i].classList.contains("ghost")

                    if (hasTypeGhost) return true

                }
            },
    
            hasSteel(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeSteel = list[i].classList.contains("steel")

                    if (hasTypeSteel) return true

                }
            },
    
            hasDragon(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeDragon = list[i].classList.contains("dragon")

                    if (hasTypeDragon) return true

                }
            },
    
            hasFairy(list) {
                for (let i = 0; i < list.length; i++) {

                    let hasTypeFairy = list[i].classList.contains("fairy")

                    if (hasTypeFairy) return true

                }
            }    
        
        },

        filterPokemonByType() {

            elements.itemTypes.forEach(item => item.addEventListener("click", () => {

                if (item.innerText == "Todos") {
    
                    this.resetCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => card.style.display = "flex")
                        
                } else if(item.innerText == "Grama") {
                    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasGrass(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Fogo") {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasFire(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Normal") {
                    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasNormal(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Água") {
                    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasWater(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Elétrico") {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasElectric(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Gelo") {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasIce(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Terra") {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasGround(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Voador") {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasFlying(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Venenoso") {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
    
                        this.getListElement(elements.pokemonList, (card) => {
    
                            const listTypes = card.querySelector(".types").children
                            
                            this.testType.hasPoison(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                            
                        })
                                            
                    })
    
                } else if(item.innerText == "Lutador") {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasFighting(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Psíquico") {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasPsychic(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Sombrio") {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasDark(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Pedra") {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasRock(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Inseto") {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasBug(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Fantasma") {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasGhost(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Metal") {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasSteel(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else if(item.innerText == "Dragão") {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasDragon(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                } else {
    
                    this.sumCounterFilter()
    
                    this.getListElement(elements.pokemonList, (card) => {
    
                        const listTypes = card.querySelector(".types").children
                        
                        this.testType.hasFairy(listTypes) ? card.style.display = "flex" : card.style.display = "none"
                        
                    })
    
                }
            }))
        },
    
        dialogFilterActions() {
            elements.filterButton.onclick = () => elements.filterOptions.showModal()
    
            elements.btnCloseFilter.onclick = () => elements.filterOptions.close()
        },

    },
    
    moreInfoAboutPokemon: {

        dialogMoreInfoPokemon: elements.moreInfoPokemon,

        showDialogMoreInfo() {
            this.dialogMoreInfoPokemon.showModal()
        },

        closeDialogMoreInfo() {
            this.dialogMoreInfoPokemon.close()
        },
        
        generateContentDialogMoreInfoPokemon() {

            elements.pokemonList.addEventListener("click", (event) => {
    
                if (event.target.className === "poke-img") {
                    
                    const cardPokeActual = event.target.parentElement.parentElement
                    const contentDialogMoreInfoPokemon = cardPokeActual.querySelector(".content-more-info")
                    
                    this.dialogMoreInfoPokemon.innerHTML = contentDialogMoreInfoPokemon.innerHTML
    
                    this.showDialogMoreInfo()

                    const btnCloseMoreInfoPokemon = this.dialogMoreInfoPokemon.querySelector(".btnCloseMoreInfo")
                    btnCloseMoreInfoPokemon.onclick = () => this.closeDialogMoreInfo()
    
                    const iconHeartCheckbox = this.dialogMoreInfoPokemon.querySelector("#iconHeart")

                    iconHeartCheckbox.addEventListener("change", (event) => {

                        let isChecked = event.target.checked
                
                        localStorage.setItem("checkboxState", isChecked)

                    })

                    const checkboxState = localStorage.getItem("checkboxState")

                    if (checkboxState !== null) iconHeartCheckbox.checked = JSON.parse(checkboxState)

                }
    
    
            })

        }

    },

    start() {
        this.loadPokemonItens(this.offset, this.limit)
        this.loadMorePokemons()
        this.moreInfoAboutPokemon.generateContentDialogMoreInfoPokemon()
        this.filter.filterSearch()
        this.filter.filterPokemonByType()
        this.filter.dialogFilterActions()
    }
    
}

export {
    app
}  
