export const GET_POKEMONS = 'GET_POKEMONS';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const NEW_POKEMONS = 'NEW_POKEMONS';


export const getPokemons = (data)=>{
    return {
        type: GET_POKEMONS,
        payload: data
    }
}

export const changePage = (page, limit)=>{
    return {
        type: CHANGE_PAGE,
        page: page,
        limit: limit
    }
}

export const newPokemons = (data)=>{
    return {
        type: NEW_POKEMONS,
        payload: data
    }
}
