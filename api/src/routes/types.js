const { default: axios } = require('axios');
const { Router } = require('express');
const router = Router();
const {Type} = require('../db')
// - GET https://pokeapi.co/api/v2/type
router.get('/', async (req,res)=>{
    //Validar si existe la información en la DB
    //Si no existe la información traerla de la API con un axios GET
    //Depurar la información y guardar nombre y typeId en la DB la primera vez
    //Responder con los types disponibles
    let types = await Type.findAll();
    if(types.length === 0){
        let apiTypes = await getTypesFromApi()

        types = await Type.bulkCreate(apiTypes);
        res.send(types)
    } else{ 
        res.send(await Type.findAll())
    }
    
})

const getTypesFromApi = async ()=>{
    let apiTypes = await axios.get('https://pokeapi.co/api/v2/type');
        
        apiTypes = apiTypes.data.results.map(t=>{
            return {name: t.name}
        });
        return apiTypes;
}




module.exports = router;