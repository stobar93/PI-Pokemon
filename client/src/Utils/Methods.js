import axios from "axios";

export async function loadNewPokemons (callback, page) {
    let pokemons
    if(page){
        pokemons = await axios.get(`http://localhost:3001/pokemons?page=${page}`);
    } else{
        pokemons = await axios.get(`http://localhost:3001/pokemons`);
    }
    
    await callback(pokemons.data)
    //Callback is used to dispatch data to Redux store
}

export async function loadTypes (callback) {
    let types
        types = await axios.get('http://localhost:3001/types')
    callback(types.data)
    //Callback is used to dispatch data to Redux store
}

export const capitalLetter = (str)=>{
    return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase()
}

export const sortOptions = {
    'ID': (a, b)=>{
        return a.id-b.id
    },
    'AZ': (a, b)=>{
        return a.name.localeCompare(b.name)
    },
    'ZA':(a, b)=>{
        return b.name.localeCompare(a.name)
    },
    'AA':(a, b)=>{
        return a.stats.Attack-b.stats.Attack
    },
    'AD':(a, b)=>{
        return b.stats.Attack-a.stats.Attack
    }
};   