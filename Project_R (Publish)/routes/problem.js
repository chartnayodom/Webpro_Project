const express = require("express");
const pool = require("../config");
// const Joi = require('joi')

router = express.Router();

router.get('/problem', async (req,res,next) =>{
    try{
        pool.query("SELECT * FROM problem WHERE ref_id == NULL")
    }catch(err){
        return next(err)
    }
})

router.get('', async(req,res,next) =>{
    try{
        pool.query("SELECT * FROM problem WHERE")
    }catch(err){
        return next(err)
    }
})
exports.router = router