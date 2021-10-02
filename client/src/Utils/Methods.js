import axios from "axios";

export async function loadInfo (callback, page) {
    let pokemons
    if(page){
        pokemons = await axios.get(`http://localhost:3001/pokemons?page=${page}`);
    } else{
        pokemons = await axios.get(`http://localhost:3001/pokemons`);
    }
    
    callback(pokemons.data)
    //Callback is used to dispatch data to Redux store
}
