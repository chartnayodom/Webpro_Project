const express = require("express");
const pool = require("../config");
const Joi = require('joi')

router = express.Router();

const passwordValid = (value, helpers)=>{
    if(value < 8){
        throw new Joi.ValidationError('Password must contain 8 or more characters')
    }
    if(!values.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[A-Z]/) ){
        throw new Joi.ValidationError('Password must stronger')
    }
    return value
}   
//make validation
const signupSchema = Joi({
    username: Joi.string().required().min(8).max(16),
    password: Joi.string().required().custom(passwordValid),
    email: Joi.string().email().required(),
    user_sign: Joi.string().required().alphanum().min(3).max(30),
    first_name: Joi.string().required().alpha().min(2).max(50),
    last_name: Joi.string().required().alpha().min(2).max(50)
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