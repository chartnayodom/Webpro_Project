const express = require("express");
const pool = require("../config");
const Joi = require('joi')

router = express.Router();

const blogVal = Joi({
    shop_name : Joi.string(),
    shop_desc : Joi.string()
})

//Request หน้ารวมอู่
router.get("/repairshop/overview", async function(req,res,next){
    //get repair shop maps
    try{
        const[rows, column] = await pool.query('SELECT * FROM shop')
        res.status(200).json(rows)
    }catch(err){
        next(err)
    }
})

//ส่ง form แนะนำลงไปใน Database
router.post("/repairshop/add", async function(req,res,next){
    try{
        await blogVal.validateAsync(req.body, { abortEarly: false })
    } catch(err){
        return res.status(400).json(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        await conn.query('INSERT INTO ',[])
        await conn.commit()
        res.status(201).send()
    }catch(err){
        await conn.rollback()
        res.status(400).json(err.toString())
    }finally{
        await conn.release
    }
    // return res
})

router.delete("/repairshop/:shopid", async function(req,res,next){
    // try{
    //     const[rows,column] = await pool.query("INSERT INTO ")
    // }
    // catch(err){
    //     return next(err)
    // }
    return res
})

exports.router = router;