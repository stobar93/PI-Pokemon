const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRouter = require('./pokemon')
const typesRouter = require('./types')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonRouter);
router.use('/types', typesRouter);




module.exports = router;
