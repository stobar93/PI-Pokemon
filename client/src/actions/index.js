export const GET_POKEMONS = 'GET_POKEMONS';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const NEW_POKEMONS = 'NEW_POKEMONS';
export const CHANGE_LIMIT = 'CHANGE_LIMIT';
export const SORT_POKEMONS = 'SORT_POKEMONS';

export const getPokemons = (data)=>{
    return {
        type: GET_POKEMONS,
        payload: data
    }
}

export const changePage = (newPage, limit)=>{
    return {
        type: CHANGE_PAGE,
        page: newPage,
        limit: limit
    }
}

export const changeLimit = (newLimit)=>{
    return {
        type: CHANGE_LIMIT,
        limit: newLimit
    }
}

export const newPokemons = (data)=>{
    return {
        type: NEW_POKEMONS,
        payload: data
    }
}

export const sortPokemons = (fn)=>{
    return {
        type: SORT_POKEMONS,
        payload: fn
    }
}