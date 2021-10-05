export const GET_POKEMONS = 'GET_POKEMONS';

export const NEW_POKEMONS = 'NEW_POKEMONS';
export const CHANGE_LIMIT = 'CHANGE_LIMIT';
export const SORT_POKEMONS = 'SORT_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const FILTER_TYPE = 'FILTER TYPE';

/////////////////////////////////////////////
export const CHANGE_COPY = 'CHANGE_COPY';
export const CHANGE_PAGE = 'CHANGE_PAGE';

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

/////////////////////////////////////////////
export const newPokemons = (data)=>{
    return {
        type: NEW_POKEMONS,
        payload: data
    }
}

// export const filterType = (type)=>{
//     return {
//         type: FILTER_TYPE,
//         payload: type
//     }
// }