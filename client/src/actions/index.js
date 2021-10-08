import axios from "axios";

////////////////////////////////////////////////////
export const CHANGE_FILTER = 'CHANGE_FILTER';
export const CHANGE_SORT = 'CHANGE_SORT';
export const GET_POKEMONS = 'GET_POKEMONS';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const GET_TYPES = 'GET_TYPES';
export const SEARCH = 'SEARCH';
export const UPDATE_POKEMONS = 'UPDATE_POKEMONS';

export const changeFilter = (filterType,filterValue, copy)=>{
    return {
        type: CHANGE_FILTER,
        filterType: filterType, //filtertype es el tipo de filtro que cambio. String Ej: db o type
        filterValue: filterValue, //El valor seleccionado por el usuario. String
        copy: copy //La copia del array pokemons, filtrado y ordenado. Array
    }
}

export const changeSort = (sortValue, copy)=>{
    return {
        type: CHANGE_SORT, //filtertype es el tipo de filtro que cambio. String Ej: db o type
        sortValue: sortValue, //El valor seleccionado por el usuario. String
        copy: copy //La copia del array pokemons, filtrado y ordenado. Array
    }
}

export const getPokemons = (limit, newPage)=>{
    return function(dispatch) {
      return axios(`http://localhost:3001/pokemons?limit=${limit}`)
      .then(response => dispatch({ type: GET_POKEMONS, pokemons: response.data, newPage: newPage }))
    };
}

export const getTypes = ()=>{
    return function(dispatch) {
        return axios('http://localhost:3001/types')
        .then(response => dispatch({ type: GET_TYPES, pokemonTypes: response.data}))
    };
}

  export const changePage = (newPage)=>{
    return {
        type: CHANGE_PAGE,
        page: newPage,
    }
}



export const searchPokemon = (data)=>{
    return {
        type: SEARCH,
        payload: data
    }
}


export const updatePokemons = (data)=>{
    return {
        type: UPDATE_POKEMONS,
        payload:data
    }
}


