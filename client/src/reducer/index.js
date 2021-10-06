
import { CHANGE_COPY, CHANGE_PAGE, GET_POKEMONS, GET_TYPES, NEW_POKEMONS, SEARCH } from "../actions";

const initialState = {
    pokemons: [],
    copy: [],
    pokemonsToRender: [],
    types:[],
    queryPage: 0
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
                pokemons: [...state.pokemons, ...action.payload],
                queryPage: state.queryPage + 1,
                copy: [...state.pokemons, ...action.payload]
            }
        case SEARCH:
            
            return {
                ...state,
                pokemonsToRender: [action.payload]
            }
        default:
            return state;
    }
    
    
}