const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>
{
    res.render('index',{title:"my book store",message:"helloworld"})
})

module.exports=router;