const axios = require('axios')

 const getApiInfo = async ()=>{
    let url = "https://pokeapi.co/api/v2/pokemon";
    
    
    url = `${url}?limit=1118` 


    try{
        const info = await axios.get(url);
        return info;
    }catch(e){return e}
}

 const getPokemonsInfo = async (data, limit=40, start=0)=>{
     
     let pokemons = data.value.data.results    
    
    let promises = pokemons.slice(start,limit).map(p =>{
        
        return axios.get(p.url)
    
    })
    
    const values = await Promise.all(promises)
    //Nos interesa la propiedad data de cada obj contenido en values
    return values
}

const getPokemonByNameDB = async (name, pokemon, type)=>{
    
    try{
        const pokemonDB = await pokemon.findOne({ where: { name: name.slice(0,1).toUpperCase() + name.slice(1).toLowerCase() } , include: type})
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
        console.log('response', response)
        return response;
    }catch(e){
        return []
    }
    
}

const getPokemonByIdDB = async (idDb, pokemon, type)=>{
    
    
    try{
        
        const pokemonDB = await pokemon.findOne({ where: { id: idDb } , include: type})
        console.log(pokemonDB)
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
    
    imgUrl = imgUrl || pokemon.sprites.other.dream_world.front_default;  
    
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