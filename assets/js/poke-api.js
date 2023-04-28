import { Pokemon } from "../js/pokemon-model.js"

const pokeApi = {

    async convertPokeApiDetailToPokemon(pokeDetail) {

        const pokemon = new Pokemon()

        pokemon.number = pokeDetail.id
        pokemon.name = pokeDetail.name
    
        const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
        const [type] = types
    
        pokemon.types = types
        pokemon.type = type
    
        pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

        pokemon.height = pokeDetail.height / 10 // dm -> m
        pokemon.weight = pokeDetail.weight / 10 // hg -> kg

        pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)

        pokemon.stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)

        pokemon.moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.name)

        const urlsSpecies = Object.values(pokeDetail.species).slice(1)

        try {

            await Promise.all(urlsSpecies.map(url => fetch(url).then(response => response.json())))
                .then((data) => data.map((data) => {

                    pokemon.eggGroups = data.egg_groups.map((eggSlot) => eggSlot.name)

                    pokemon.generation = data.generation.name.replace("generation-", "")

                    pokemon.habitat = data.habitat.name

                    pokemon.isLegendary = data.is_legendary

                    pokemon.isMythical = data.is_mythical

                    pokemon.shape = data.shape.name

                }))
            
        } catch (error) {

            console.error(error)
            
        }
        
        return pokemon
    },

    async getPokemonDetail(pokemon) {

        try {

            return await fetch(pokemon.url)
            .then((response) => response.json())
            .then(this.convertPokeApiDetailToPokemon)

        } catch (error) {

            console.error(error)

        }
    },

    async getPokemons(offset = 0, limit = 5) {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
        try {

            return await fetch(url)
                .then((response) => response.json())
                .then((jsonBody) => jsonBody.results)
                .then((pokemons) => pokemons.map((pokemon) => this.getPokemonDetail(pokemon)))
                .then((detailRequests) => Promise.all(detailRequests))
                .then((pokemonDetails) => pokemonDetails)

        } catch (error) {

            console.error(error)

        }
    }

}

export {
    pokeApi
}