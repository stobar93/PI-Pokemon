export const GET_POKEMONS = 'GET_POKEMONS';




export const getPokemons = (data)=>{
    return {
        type: GET_POKEMONS,
        payload: data
    }
}

