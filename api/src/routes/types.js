const { Router } = require('express');
const router = Router();

router.get('/', (req,res)=>{
    res.send('/Types')
})




module.exports = router;