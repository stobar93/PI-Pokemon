const axios = require('axios')

 const getApiInfo = async ()=>{
    let url = "https://pokeapi.co/api/v2/pokemon";
    
    
    url = `${url}?limit=1118` 


    try{
        const info = await axios.get(url);
        return info;
    }catch(e){return e}
}

 const getPokemonsInfo = async (data, page)=>{
     
     let pokemons = data.value.data.results
     if(page){
        pokemons = pokemons.slice(40*(page-1),40*page);
     }else {
         pokemons = pokemons.slice(0,40);
     }
    
    let promises = pokemons.map(p =>{
        
        return axios.get(p.url)
    
    })
    
    const values = await Promise.all(promises)
    //Nos interesa la propiedad data de cada obj contenido en values
    return values
}

 const getPokemonByName = async (name)=>{
    try{
        const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return pokemon.data;
    }catch(e){
        return null
    }
    
}

 const getPokemonById = async (id)=>{
    const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return pokemon.data;
}

 const responseShort = (pokemon, length)=>{   
    let {name, id, height, weight, stats, types} = pokemon;
    let imgUrl = pokemon.sprites.other.dream_world.front_default;  
    
    stats = stats.map(s=>{
        return {
           [capitalLetter(s.stat.name)]: s.base_stat
        }
    });
    let obj = {}
    for(let stat of stats){
         obj = {
             ...obj,
             ...stat
        }
    }
    stats = {...obj}
    types = types.map(t=>{

        return capitalLetter(t.type.name);
    });

    name = capitalLetter(name)

    switch(length){
        case 'short':
            return {name, id, imgUrl, types};
        case 'long':
            
            return {name, id, imgUrl, height, weight, stats, types};
        default:
            return pokemon;
    }
}

const getTypesFromApi = async ()=>{
    let apiTypes = await axios.get('https://pokeapi.co/api/v2/type');
        
        apiTypes = apiTypes.data.results.map(t=>{
            return {name:t.name}
        });
        return apiTypes;
}

const capitalLetter = (str)=>{
    return str.slice(0,1).toUpperCase() + str.slice(1)
}

module.exports = {
    getApiInfo,
    getPokemonsInfo,
    getPokemonByName,
    getPokemonById,
    responseShort,
    getTypesFromApi,
    capitalLetter
}