import { GET_POKEMONS, CHANGE_PAGE, NEW_POKEMONS, CHANGE_LIMIT } from "../actions";

const initialState = {
    pokemons: [],
    pokemonsToRender: []
};

export default function reducer (state=initialState, action){
    switch(action.type){
        case GET_POKEMONS:
            let newP = action.payload.filter((p,i)=>{
                return i >= 0 && i < 10 
             })
            return {
                ...state,
                pokemons: action.payload,
                pokemonsToRender: newP
            }
        case CHANGE_PAGE:
            
            return {
                ...state,
                pokemonsToRender: state.pokemons.filter((p,i)=>{
                    return i >= (action.page-1) * action.limit && i < (action.page) * action.limit 
                 })
            }
        case CHANGE_LIMIT:
            let firstPokemonId = state.pokemonsToRender[0].id;
            let index = state.pokemons.map(p=>p.id).indexOf(firstPokemonId)
            return {
                ...state,
                pokemonsToRender: state.pokemons.slice(index,index+action.limit)
            }
        case NEW_POKEMONS:
            return {
                ...state,
                pokemons: [...state.pokemons,...action.payload]
            }
        

        default:
            return state;
    }
    
    
}