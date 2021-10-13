const { Router } = require('express');
const router = Router();
const { Pokemon } = require('../db');
const {Type} = require('../db')

const {getApiInfo, getPokemonsInfo, getPokemonByNameAPI, 
        getPokemonByNameDB, getPokemonByIdAPI, getPokemonByIdDB, 
            responseShort, capitalLetter} = require('../Utils/methods')

// - GET https://pokeapi.co/api/v2/pokemon
// - GET https://pokeapi.co/api/v2/pokemon/{id}
// - GET https://pokeapi.co/api/v2/pokemon/{name}
// - GET https://pokeapi.co/api/v2/type

    
router.get('/', async (req,res)=>{
    let pokemon = [];
    let pokemonDB = [];

    //This route attends 2 types of search
    //1. By Name
    //2. By limit
    let {name, limit} = req.query;
    if(limit) {limit = parseInt(limit)};

    try{
        if(name){//Search by name: if name is defined in req.query -> Invoke from "../Utils/methods.js":
            //getPokemonByNameAPI: Request the API, if the pokemon doesn't exist, returns [] 
            //getPokemonByNameDB: Request the DB, if the pokemon doesn't exist, returns []
            //Else, both methods return [{}] with the pokemon info.
            const searchPokemon = await Promise.all([getPokemonByNameAPI(name), getPokemonByNameDB(name, Pokemon, Type)])
               
            if(searchPokemon.length===0){
                //If searchPokemon is empty, response 404 Not found
                res.status(404).send(`${name} not found. Does not exist`)}
            else { 
                //Else, send [pokemon from API, pokemon from DB]
                res.status(200).send(searchPokemon.flat()) }     
         
        } else {//Search by limit (Pagination)
            //First of all: gets all the pokemons from DB and API (First URL)
            let arr = await Promise.allSettled([Pokemon.findAll({
                attributes: ['name', 'id', 'hp', 'attack', 'defense', 'speed', 'height', 'weight', 'imgUrl'],
                include: Type
            }),
                getApiInfo()//It only brings the url of each pokemon's info
            ])
            
            //arr = array with two elements. Containing the result of previous promises
            //arr[0] = DB info --> Map pokemonDB to get just the required information
            pokemonDB = arr[0]
            if(pokemonDB.length===0) console.log('There is no pokemon created in DB')
            else{
                pokemonDB = pokemonDB.value.map(p=>{
                    let {name, id, hp, attack, defense, speed, height, weight, types, imgUrl} = p.dataValues
                    return {
                        name, id, 
                        stats: {hp, attack, defense, speed},
                        height, weight, 
                        types: types.map(t=>capitalLetter(t.name)),
                        imgUrl, createdBy: 'user'}
                })
            }   

            //arr[1] = API info from Promise.allSettled
            let apiInfo = arr[1]
            
            //Calculate the start point to slice apiInfo (start, limit)
                let start = limit - 40
            //Invoke getPokemonsInfo from "../Utils/methods.js":
                //Returns an array with the info of 40 new pokemons
                let newPokemons = await getPokemonsInfo(apiInfo, limit, start)
                 
                //If it's the first request (limit=nul || limit=40)
                //Send DB and API pokemons
                if(!limit || limit === 40){
                    pokemon = [...pokemonDB, ...newPokemons];
                } else {
                    //If limit > 40 send only newPokemons from API
                    pokemon = [...newPokemons]
                }
                
                res.status(200).send(pokemon)
             }
             
         }catch(e){
        res.status(500).send(e)
    }
    
})



router.get('/:id', async (req,res)=>{
    let {id} = req.params;
        try{                
                let pokemonAPI = await getPokemonByIdAPI(id)
                
                let pokemonDB = await getPokemonByIdDB(id, Pokemon, Type)
                
                let pokemon = pokemonDB.length>0 ? pokemonDB : pokemonAPI
                
                res.status(200).json(pokemon)
            // } else {res.status(400).send('ID must be a number')}
           
        } catch(e){
            res.status(404).send(`${id} not found. Does not exist`)
        }
})

router.post('/', async (req, res)=>{
    const {name, hp, attack, defense, speed, height, weight, types, imgUrl} = req.body;
    
    // res.send({recibido: true, ...req.body});
    try{
        const [pokemon, created] = await Pokemon.findOrCreate({
        where: {
          name: capitalLetter(name),hp, attack, defense, speed, height, weight, imgUrl
        },
        
      });
    
      await pokemon.addType(types)

      res.status(200).send(pokemon)
    }catch(e){
        res.status(400).send('failed')
    }

})





module.exports = router;