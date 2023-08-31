import { PokemonController } from "../controllers/PokemonController.js"
import { AppState } from "../AppState.js"
import { Pokemon } from "../models/Pokemon.js"
import { api } from "./AxiosService.js"

const pokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    timeout: 8000,
})



class PokemonService {
    constructor() {

    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > array.length; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            [array[i], array[j]] = [array[j], array[i]]
        }
        console.log(array)
    }

    async findWildPokemon() {
        let res = await pokeApi.get('pokemon?limit=1281')
        let pokeMen = res.data.results
        let newPokemen = pokeMen.map(pokemon => new Pokemon(pokemon))
        AppState.pokemon = newPokemen
    }

    async setActivePokemon(pokeName) {
        let singleRes = await pokeApi.get(`pokemon/${pokeName}`)
        AppState.activePokemon = new Pokemon(singleRes.data)
        AppState.activePokemon.img = singleRes.data.sprites.front_default
        AppState.activePokemon.types = singleRes.data.types[0].type.name
        // let res = api.post(`api/pokemon/`, AppState.activePokemon)
        console.log(AppState.activePokemon)

        // SEND SPRITES TO SANDBOX API

    }

    async setRandomActive() {
        let randIndex = Math.floor(Math.random() * 999)
        let singleRes = await pokeApi.get(`pokemon/${randIndex}`)
        AppState.activePokemon = new Pokemon(singleRes.data)
        AppState.activePokemon = AppState.pokemon[randIndex - 1]
        AppState.activePokemon.img = singleRes.data.sprites.front_default
        AppState.activePokemon.types = singleRes.data.types[0].type.name
        console.log(randIndex)
        this.drawActive()
    }

    drawActive() {
        let activeTemp = ''
        document.getElementById('pokemon-container').innerHTML = activeTemp += AppState.activePokemon.ActiveTemplate
    }
}

export const pokemonService = new PokemonService()