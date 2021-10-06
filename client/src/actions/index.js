/////////////////////////////////////////////
export const GET_POKEMONS = 'GET_POKEMONS';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const CHANGE_COPY = 'CHANGE_COPY';
export const GET_TYPES = 'GET_TYPES';
export const NEW_POKEMONS = 'NEW_POKEMONS';
export const SEARCH = 'SEARCH';
export const SET_PAGES = 'SET_PAGES';
export const SET_DB = 'SET_DB';
export const SET_TYPE = 'SET_TYPE';
export const SET_PAGE = 'SET_PAGE';
export const SET_SORT = 'SET_SORT';

export const getPokemons = (data)=>{
    return {
        type: GET_POKEMONS,
        payload: data
    }
}

export const changePage = (newPage)=>{
    return {
        type: CHANGE_PAGE,
        page: newPage,
    }
}

export const getTypes = (types)=>{
    return {
        type: GET_TYPES,
        payload: types
    }
}

export const changeCopy = (ptr)=>{
    return {
        type: CHANGE_COPY,
        payload: ptr
    }
}


export const newPokemons = (data)=>{
    return {
        type: NEW_POKEMONS,
        payload: data
    }
}

export const searchPokemon = (data)=>{
    return {
        type: SEARCH,
        payload: data
    }
}

export const setPages = (data)=>{
    return {
        type: SET_PAGES,
        payload: data
    }
}

export const setPage = (data)=>{
    return {
        type: SET_PAGE,
        payload: data
    }
}

export const setSort = (data)=>{
    return {
        type: SET_SORT,
        payload: data
    }
}

export const setType = (data)=>{
    return {
        type: SET_TYPE,
        payload: data
    }
}

export const setDb = (data)=>{
    return {
        type: SET_DB,
        payload: data
    }
}

