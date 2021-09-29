const { Router } = require('express');
const router = Router();
const { Pokemon } = require('../db');

const {getApiInfo, getPokemonsInfo, getPokemonByName, getPokemonById, responseShort} = require('../Utils/methods')

// - GET https://pokeapi.co/api/v2/pokemon
// - GET https://pokeapi.co/api/v2/pokemon/{id}
// - GET https://pokeapi.co/api/v2/pokemon/{name}
// - GET https://pokeapi.co/api/v2/type

router.get('/', async (req,res)=>{
    let {name, page, limit} = req.query;
    if(name){ 
        try{
           let pokemon = await getPokemonByName(name)
           res.status(200).json(responseShort(pokemon, 'short'))
        } catch(e){
            res.status(404).send(`${name} not found. Does not exist`)
        }
    }
    else{
        try{

            let [pokemonDB, pokemonAPI] = await Promise.allSettled([Pokemon.findAll({
                attributes: ['name', 'id']
            }),
                getApiInfo(page, limit)
            ])
            
            pokemonDB = pokemonDB.value.map(p=>{
                return p.dataValues
            })            
            pokemonAPI = await getPokemonsInfo(pokemonAPI)

            pokemon = [...pokemonDB, ...pokemonAPI]
            if(pokemonDB.length===0) console.log('There is no pokemon created in DB')
            res.status(200).json(pokemon)
        }catch(e){
            console.log(e)
            res.status(500).send(e)
        }
        
    }   
})

router.get('/:id', async (req,res)=>{
    let {id} = req.params;
        try{
            // if(Number.isInteger(id-1)){
                let pokemon = await getPokemonById(id)
                res.status(200).json(responseShort(pokemon, 'long'))
            // } else {res.status(400).send('ID must be a number')}
           
        } catch(e){
            res.status(404).send(`${id} not found. Does not exist`)
        }
})

router.post('/', async (req, res)=>{
    const {name, hp, attack, defense, speed, height, weight, types} = req.body;
    
    // res.send({recibido: true, ...req.body});
    const [pokemon, created] = await Pokemon.findOrCreate({
        where: {
          name,hp, attack, defense, speed, height, weight
        },
        
      });
    
      await pokemon.addType(types)

      res.send(pokemon);
})





module.exports = router;