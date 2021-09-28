const axios = require('axios')

 const getApiInfo = async (page, limit)=>{
    let url = "https://pokeapi.co/api/v2/pokemon";
    if(page && limit){url = `${url}?offset=${(page-1)*limit}&limit=${limit}`}
    else{url = `${url}?limit=40`}

    try{
        const info = await axios.get(url);
        return info;
    }catch(e){return e}
}

 const getPokemonsInfo = async (data)=>{
    let pokemons = data.results;
    let promises = pokemons.map(p =>{
        return new Promise((resolve, reject) => {
            resolve(axios.get(p.url))
          });
    })
    await Promise.all(promises).then(values=>{
        pokemons = values.map(p=>{
            return responseShort(p.data, 'short')
            // let {name, id} = p.data;
            // let imgUrl = p.data.sprites.other.dream_world.front_default
            // return {name, id, imgUrl}
        })
        }
    )
    return pokemons
}

 const getPokemonByName = async (name)=>{
    const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

    return pokemon.data;
}

 const getPokemonById = async (id)=>{
    const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return pokemon.data;
}

 const responseShort = (pokemon, length)=>{   
    let {name, id, height, weight, stats} = pokemon;
    let imgUrl = pokemon.sprites.other.dream_world.front_default;  
    switch(length){
        case 'short':
            return {name, id, imgUrl};
        case 'long':
            return {name, id, imgUrl, height, weight, stats};
        default:
            return pokemon;
    }
}

module.exports = {
    getApiInfo,
    getPokemonsInfo,
    getPokemonByName,
    getPokemonById,
    responseShort
}