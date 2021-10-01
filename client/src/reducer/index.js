import { GET_POKEMONS } from "../actions";

const initialState = {
    pokemons: []
};

export default function reducer (state=initialState, action){
    switch(action.type){
        case GET_POKEMONS:
            
        
            return {
                ...state,
                pokemon: action.payload
            }
        default:
            return state;
    }
    
    
}