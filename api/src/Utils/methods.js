const axios = require('axios')

 const getApiInfo = async ()=>{
    let url = "https://pokeapi.co/api/v2/pokemon";
    url = `${url}?limit=1118` 
    try{
        const info = await axios.get(url);
        return info;
    }catch(e){return e}
}

 const getPokemonsInfo = async (apiInfo, limit=40, start=0)=>{
     //apiInfo, response from APi --> .value.data.results = [{name, url}]
    let pokemons = apiInfo.value.data.results    
    //Only request 40 new pokemons to save time
    let promises = pokemons.slice(start,limit).map(p =>{
        return axios(p.url)
    })
    
    let values = await Promise.all(promises)
    values = values.map(p=>{return responseShort(p.data, 'long')})
    
    return values
}

const getPokemonByNameDB = async (name, pokemon, type)=>{
    
    try{
        const pokemonDB = await pokemon.findOne({ where: { name: capitalLetter(name) } , include: type})
        let {id, hp,attack, defense, speed, height, weight, imgUrl, types} = pokemonDB.dataValues
        
        return [{
            name: capitalLetter(name), id, height, weight, imgUrl,
            stats: {Hp:hp, Attack: attack, Defense:defense, Speed:speed},
            types: types.map(t=>capitalLetter(t.pokemon_type.dataValues.typeName)),
            createdBy: 'user'
        }]
    } catch(e){
        return []
    }
}

 const getPokemonByNameAPI = async (name)=>{
    
    try{
        
        const pokemonAPI = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
        
        let response = [responseShort(pokemonAPI.data, 'long')]
        return response;
    }catch(e){
        return []
    }
    
}

const getPokemonByIdDB = async (idDb, pokemon, type)=>{
    
    try{
        
        const pokemonDB = await pokemon.findOne({ where: { id: idDb } , include: type})
        
        let {id, name, hp, attack, defense, speed, height, weight, imgUrl, types} = pokemonDB.dataValues
        
        return [{
            name: capitalLetter(name), id, height, weight, imgUrl,
            stats: {Hp:hp, Attack: attack, Defense:defense, Speed:speed},
            types: types.map(t=>capitalLetter(t.pokemon_type.dataValues.typeName)),
            createdBy: 'user'
        }]
    } catch(e){
        return []
    }
}

 const getPokemonByIdAPI = async (id)=>{
    let pokemonAPI =[];
    try{
        pokemonAPI = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
        pokemonAPI = responseShort(pokemonAPI.data, 'long')
        return [pokemonAPI];
    }catch(e){
        return []
    }  
}

 const responseShort = (pokemon, length)=>{   
    let {name, id, height, weight, stats, types, imgUrl} = pokemon;
    
    imgUrl = imgUrl || pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other["official-artwork"].front_default;
    
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
            return {name, id, imgUrl, types, createdBy: 'api'};
        case 'long':
            
            return {name, id, imgUrl, height, weight, stats, types, createdBy: 'API'};
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
    getPokemonByNameDB,
    getPokemonByNameAPI,
    getPokemonByIdAPI,
    getPokemonByIdDB,
    responseShort,
    getTypesFromApi,
    capitalLetter
}