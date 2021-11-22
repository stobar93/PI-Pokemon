import axios from "axios";

////////////////////////////////////////////////////
export const CHANGE_FILTER = "CHANGE_FILTER";
export const CHANGE_SORT = "CHANGE_SORT";
export const GET_POKEMONS = "GET_POKEMONS";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const GET_TYPES = "GET_TYPES";
export const SEARCH = "SEARCH";
export const POST_POKEMON = "POST_POKEMON";
export const LOADING = "LOADING";
export const RESET_FILTER = "RESET_FILTER";

export const changeFilter = (filterType, filterValue, copy) => {
  return {
    type: CHANGE_FILTER,
    filterType: filterType, //filtertype es el tipo de filtro que cambio. String Ej: db o type
    filterValue: filterValue, //El valor seleccionado por el usuario. String
    copy: copy, //La copia del array pokemons, filtrado y ordenado. Array
  };
};

export const changeSort = (sortValue, copy) => {
  return {
    type: CHANGE_SORT, //filtertype es el tipo de filtro que cambio. String Ej: db o type
    sortValue: sortValue, //El valor seleccionado por el usuario. String
    copy: copy, //La copia del array pokemons, filtrado y ordenado. Array
  };
};

export const getPokemons = (limit, newPage) => {
  return async function (dispatch) {
    return await axios(`/pokemons?limit=${limit}`).then((response) =>
      dispatch({
        type: GET_POKEMONS,
        pokemons: response.data,
        newPage: newPage,
      })
    );
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    return await axios("/types").then((response) =>
      dispatch({ type: GET_TYPES, pokemonTypes: response.data })
    );
  };
};

export const changePage = (newPage) => {
  return {
    type: CHANGE_PAGE,
    page: newPage,
  };
};

export const searchPokemon = (name) => {
  if (name !== "clear") {
    return async function (dispatch) {
      return await axios(`/pokemons?name=${name.toLowerCase()}`)
        .then((response) => response.data)
        .then((data) => {
          dispatch({ type: SEARCH, payload: data });
          return data;
        });
    };
  } else {
    return { type: SEARCH, payload: "clear" };
  }
};

// export const postPokemon = (data)=>{
//     return async function(dispatch) {
//         return await axios.post('/pokemons', data)
//         .then(response => axios(`/pokemons`))
//         .then(response => dispatch({ type: POST_POKEMON, pokemons: response.data, newPage: 1 }))
//       };
// }
export const postPokemon = (data) => {
  return async function (dispatch) {
    return await axios
      .post("/pokemons", data)
      .then((response) => {
        if (response.status === 400) {
          throw Error;
        } else {
          return axios(`/pokemons`);
        }
      })
      .then((response) => {
        dispatch({ type: POST_POKEMON, pokemons: response.data, newPage: 1 });
      })
      .catch((e) => {
        return "failed";
      });
  };
};

export const setLoading = (loading) => {
  return {
    type: LOADING,
    loading: loading,
  };
};

export const resetFilters = (filterType, copy) => {
  return {
    type: RESET_FILTER,
    filterType: filterType,
    copy: copy,
  };
};
