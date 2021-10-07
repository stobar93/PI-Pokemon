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
    let pages = [];
router.get('/', async (req,res)=>{
    

    let {name, page} = req.query;
    
    page = parseInt(page);
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
                attributes: ['name', 'id', 'hp', 'attack', 'defense', 'speed', 'height', 'weight'],
                include: Type
            }),
                getApiInfo()
            ])
    
            pokemonDB = arr[0].value.map(p=>{
                let {name, id, hp, attack, defense, speed, height, weight, types} = p.dataValues

                return {
                    name,
                    id,
                    stats: {hp,attack, defense, speed},
                    height,
                    weight,
                    types: types.map(t=>capitalLetter(t.name))
            }})  // pendiente incluir todos los atributos de cada pokemon
            if(pokemonDB.length===0) console.log('There is no pokemon created in DB')
            
            let apiInfo = arr[1]
            
    
            
            if(page){
                let nextPage = await getPokemonsInfo(apiInfo, page)
                nextPage = nextPage.map(p=>{
                    return responseShort(p.data, 'long')
                                                })
                if(page>pages[pages.length-1]){
                    pokemon = [...pokemonDB, ...nextPage];
                    
                    pages.push(page)
                    
                } 
                res.status(200).send(pokemon)
             }
             else{
                pokemonAPI = await getPokemonsInfo(apiInfo)
                pokemonAPI = pokemonAPI.map(p=>{
                return responseShort(p.data, 'long')
            })
                pokemon = [...pokemonDB,
                    ...pokemonAPI]
                pages.push(1)
                res.status(200).send(pokemon)
             }
         }
        
         
         

    } catch(e){
        console.log(e)
        res.status(500).send(e)
    }

//////////////////////////////////////////////////////////////////////
   
        
    
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