const express = require("express");
const pool = require("../config");
const Joi = require('Joi')

router = express.Router();

const blogsValid = Joi({
    blog_title: Joi.string().required(),
    blog_content: Joi.string().required(),
})

router.get("/", async function(req,res,next){
    console.log("request index page")
    res.render("index", {title: "hi"})
    return
})

//get all blogs in database

router.get("/blogs", async function(req,res,next){
    try{
        const [rows,fields] = await pool.query("SELECT * FROM Blogs;");
        return res.json(rows)
    }catch(err){
        return next(err)
    }
})

//เรียก blog ที่ต้องการมา
router.get("/blogs/:blogID", async function(req,res,next){
    try{
        const [rows, fields] = await pool.query("SELECT * FROM Blogs where Blog_ID = ?;",
        [req.param.blogID])
        return res.json(rows)
    }catch(err){
        return next(err)
    }
})

router.post("/blogs/add", async(req,res,next) =>{
    try{
        await blogsValid.validateAsync(req.body,{ AbortEarly: false})
    }catch(err){
        return res.status(400).json(err)
    }
    

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        // await conn.query('INSERT INTO blogs')
        await conn.commit()
    }catch(err){
        await conn.rolback()
    }finally{
        await conn.release()
    }
})

exports.router = router;