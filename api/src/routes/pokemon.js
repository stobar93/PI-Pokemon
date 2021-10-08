const { Router } = require('express');
const router = Router();
const { Pokemon } = require('../db');
const {Type} = require('../db')

const {getApiInfo, getPokemonsInfo, getPokemonByName, getPokemonById, responseShort, capitalLetter} = require('../Utils/methods')

// - GET https://pokeapi.co/api/v2/pokemon
// - GET https://pokeapi.co/api/v2/pokemon/{id}
// - GET https://pokeapi.co/api/v2/pokemon/{name}
// - GET https://pokeapi.co/api/v2/type

    let pokemon = [];
    let pokemonDB = [];
    let pokemonAPI = [];
    
router.get('/', async (req,res)=>{
    
    
    let {name, limit} = req.query;
    if(limit) limit = parseInt(limit);

    try{
        if(name){
            try{
                 let searchPokemonAPI = await getPokemonByName(name) 
                 let singlePokemon = []
 
                 if(searchPokemonAPI!==null){
                     searchPokemonAPI = responseShort(searchPokemonAPI, 'long')
                     singlePokemon = [...pokemonDB.filter(p=>p.name === name), searchPokemonAPI ]
                 } else {
                     singlePokemon = pokemonDB.filter(p=>p.name === name)
                 }
                                 
                 if(singlePokemon.length===0){
                     res.status(404).send(`${name} not found. Does not exist`)}
                  else {res.status(200).send(...singlePokemon)}
            }catch(e){
                 console.log(e)
            }
               
         } else {
            let arr = await Promise.allSettled([Pokemon.findAll({
                attributes: ['name', 'id', 'hp', 'attack', 'defense', 'speed', 'height', 'weight', 'imgUrl'],
                include: Type
            }),
                getApiInfo()//Trae la informacion inicial de todos los pokemon de la api
            ])
    
            pokemonDB = arr[0].value.map(p=>{
                let {name, id, hp, attack, defense, speed, height, weight, types, imgUrl} = p.dataValues

                return {
                    name,
                    id,
                    stats: {hp,attack, defense, speed},
                    height,
                    weight,
                    types: types.map(t=>capitalLetter(t.name)),
                    imgUrl
            }}) 

            if(pokemonDB.length===0) console.log('There is no pokemon created in DB')
            
            let apiInfo = arr[1]
            
            let start = pokemonAPI.length > 0 ? pokemonAPI.length : 0

                let newPokemons = await getPokemonsInfo(apiInfo, limit, start)
                pokemonAPI = [...pokemonAPI, ...newPokemons.map(p=>{return responseShort(p.data, 'long')})];
                
                pokemon = [...pokemonDB, ...pokemonAPI];
                
                res.status(200).send(pokemon)
             }
             
         }catch(e){
        console.log(e)
        res.status(500).send(e)
    }

//////////////////////////////////////////////////////////////////////
   
        
    
})

router.get('/:id', async (req,res)=>{
    let {id} = req.params;
        try{
            // if(Number.isInteger(id-1)){
                let pokemonAPI = await getPokemonById(id)
                pokemonAPI = pokemonAPI.map(p=>{
                    return responseShort(p, 'long')
                })
                res.status(200).json(pokemonAPI)
            // } else {res.status(400).send('ID must be a number')}
           
        } catch(e){
            res.status(404).send(`${id} not found. Does not exist`)
        }
})

router.post('/', async (req, res)=>{
    const {name, hp, attack, defense, speed, height, weight, types, imgUrl} = req.body;
    
    // res.send({recibido: true, ...req.body});
    const [pokemon, created] = await Pokemon.findOrCreate({
        where: {
          name,hp, attack, defense, speed, height, weight, imgUrl
        },
        
      });
    
      await pokemon.addType(types)

      res.status(200).send(pokemon);
})





module.exports = router;