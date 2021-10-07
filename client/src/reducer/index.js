
import { CHANGE_COPY, CHANGE_PAGE, GET_POKEMONS, GET_TYPES, NEW_POKEMONS, SEARCH, SET_PAGES, SET_DB, SET_TYPE, SET_PAGE, SET_SORT } from "../actions";

const initialState = {
    pokemons: [],
    copy: [],
    pokemonsToRender: [],
    types:[],
    queryPage: 0,
    search: [],
    pag: {
        pages:[1,2,3,4],
        page: 1,
        sort: 'ID',
        type: 'All',
        db: 'All'
    }
};

export default function reducer (state=initialState, action){
    switch(action.type){
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                copy: action.payload,
                queryPage: state.queryPage + 1
            }
        case CHANGE_COPY:
            return {
                ...state,
                copy: action.payload
            }
        case CHANGE_PAGE:
            return {
                ...state,
                pokemonsToRender: state.copy.filter((p, i)=>{
                    return i >= (action.page-1)*10 && i < action.page*10
                })
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case NEW_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                queryPage: state.queryPage + 1,
                copy: action.payload
            }
        case SEARCH:
            
            return {
                ...state,
                search: [action.payload]
            }
        case SET_PAGES:
            return {
                ...state,
                pag: {...state.pag, pages:[...action.payload]}
            }
        case SET_DB:
            return {
                ...state,
                pag: {...state.pag, db:action.payload}
            }
        case SET_TYPE:
            return {
                ...state,
                pag: {...state.pag, type:action.payload}
            }
        case SET_PAGE:
            return {
                ...state,
                pag: {...state.pag, page:action.payload}
            }
        case SET_SORT:
            return {
                ...state,
                pag: {...state.pag, sort:action.payload}
            }
        default:
            return state;
    }
    
    
}