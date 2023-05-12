const express = require("express");
const pool = require("../config");
const Joi = require('joi')

router = express.Router();

//make validation
const signupSchema = Joi({
    email: '',
    mobile: '',
})

// const loginValid = Joi({
//     username
// })


//all router

router.post('user/signup', async(req,res,next) =>{
    try{
        await signupSchema.validateAsync(req.body, { abortEarly: false })
    } catch(err){
        return res.status(400).json(err)
    }

    res.send('valid')
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = req.body.password
    const first_name = req.body.first_name
    const last_name = req.body.last_name

    try{
        await conn.query('INSERT INTO ',[])
        conn.commit()
        res.status(201).send()
    }catch(err){
        conn.rollback()
        res.status(400).json(err.toString())
    }finally{
        conn.release
    }

})

router.post('user/login', async (req,res,next) =>{

})

exports.router = router