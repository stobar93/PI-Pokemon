
import { CHANGE_FILTER, CHANGE_SORT, GET_POKEMONS, CHANGE_PAGE, GET_TYPES, SEARCH, POST_POKEMON, LOADING, RESET_FILTER} from "../actions";

const initialState = {
    pokemons: [],
    copyPokemons: [],
    currentPokemons: [],
    types:[],
    search: [],
    pag: {
        pages:[],
        page: 1},
    sort: 'ID',
    filters: {
        type: 'All',
        db: 'All'},
    loading: true
};

export default function reducer (state=initialState, action){
    switch(action.type){
        /////////////////////////////////////////////////
        case CHANGE_FILTER:
        
            return {
                ...state,
                copyPokemons: action.copy,
                filters: {
                    ...state.filters,
                    [action.filterType]: action.filterValue
                },
                pag: {
                    pages: Array.from(Array(Math.ceil(action.copy.length/10)), (e,i)=>i+1),
                    page: 1
                },
                currentPokemons: action.copy.slice(0,10)
            }

        case CHANGE_SORT:
            return {
                ...state,
                copyPokemons: action.copy,
                pag: {
                    pages: Array.from(Array(Math.ceil(action.copy.length/10)), (e,i)=>i+1),
                    page: 1
                },
                sort: action.sortValue,
                currentPokemons: action.copy.slice(0,10)
            }
            // { type: GET_POKEMONS, pokemons: response, newPage: newPage }
        case GET_POKEMONS:
            let {newPage} = action
            if(state.sort !== 'ID'){newPage = 1}
            
            return{
                ...state,
                pokemons: action.pokemons,
                copyPokemons: action.pokemons,
                pag: {
                    pages: Array.from(Array(Math.ceil(action.pokemons.length/10)), (e,i)=>i+1),
                    page: newPage
                },
                sort: 'ID',
                currentPokemons: action.pokemons.slice((newPage-1)*10,newPage*10)
            }

            case CHANGE_PAGE:
                let {page} = action
                return {
                    ...state,
                    currentPokemons: state.copyPokemons.slice((page-1)*10,page*10),
                    pag: {
                        pages: Array.from(Array(Math.ceil(state.copyPokemons.length/10)), (e,i)=>i+1),
                        page: page
                    }
                }
            case GET_TYPES:
                return {
                    ...state,
                    types: action.pokemonTypes
                }
        
        
        
        case SEARCH:
            
            return {
                ...state,
                search: [action.payload]
            }
        
        case POST_POKEMON:
            return {
                ...state,
                pokemons: action.pokemons,
                copyPokemons: action.pokemons,
                pag: {
                    pages: Array.from(Array(Math.ceil(action.pokemons.length/10)), (e,i)=>i+1),
                    page: action.newPage
                },
                sort: 'ID',
                currentPokemons: action.pokemons.slice((action.newPage-1)*10,action.newPage*10)
            }
        case LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case RESET_FILTER:
            return{
                ...state,
                copyPokemons: action.copy,
                filters: {
                    ...state.filters,
                    [action.filterType]: 'All'
                },
                pag: {
                    pages: Array.from(Array(Math.ceil(action.copy.length/10)), (e,i)=>i+1),
                    page: 1
                },
                currentPokemons: action.copy.slice(0,10)
            }
        default:
            return state;
    }
    
    
}