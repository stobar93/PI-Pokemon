import { GET_POKEMONS, CHANGE_PAGE } from "../actions";

const initialState = {
    pokemons: [],
    pokemonsToRender: []
};

export default function reducer (state=initialState, action){
    switch(action.type){
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }
        case CHANGE_PAGE:
            let pokemonsToRender = state.pokemons.filter((p,i)=>{
               return i >= (action.page-1) * action.limit && i < (action.page) * action.limit 
            })
            return{
                ...state,
                pokemonsToRender: pokemonsToRender
            }
        

        default:
            return state;
    }
    
    
}