const express = require("express");
const pool = require("../config");
const Joi = require('joi')

router = express.Router();

const blogVal = Joi({
    
})

//Request หน้ารวมอู่
router.get("/repairshop/overview", async function(req,res,next){
    //get repair shop maps
    console.log("request index page")
    res.render("repair_shop", {title: "hi"})
    return
})

//ส่ง form แนะนำลงไปใน Database
router.post("/repairshop/add", async function(req,res,next){
    try{
        await blogVal.validateAsync(req.body, { abortEarly: false })
    } catch(err){
        return res.status(400).json(err)
    }

    const conn = pool.getConnection()
    await conn.beginTransaction()
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