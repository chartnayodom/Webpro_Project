const express = require("express");
const pool = require("../config");
const Joi = require("joi")

router = express.Router();

const blogsValid = Joi.object({
    blog_title: Joi.string().required(),
    blog_content: Joi.string().required(),
    blog_banner: Joi.required(),
})

// router.get("/", async function(req,res,next){
//     console.log("request index page")
//     res.render("index", {title: "hi"})
//     return
// })

//get all blogs in database

router.get("/blogs", async function(req,res,next){
    try{
        const [rows,fields] = await pool.query("SELECT * FROM Blogs and Status = 1;");
        return res.status(200).json(rows)
    }catch(err){
        return next(err)
    }
})

//เรียก blog ที่ต้องการมา
router.get("/blogs/:blogID", async function(req,res,next){
    try{
        const [rows, fields] = await pool.query("SELECT * FROM Blogs where Blog_ID = ?;",
        [req.param.blogID])
        return res.statis(200).json(rows)
    }catch(err){
        return next(err)
    }
})

//add blogs
router.post("/blogs/add", async(req,res,next) =>{
    try{
        await blogsValid.validateAsync(req.body,{ AbortEarly: false})
    }catch(err){
        return res.status(400).json(err)
    }
    //add picture
    

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        await conn.query('INSERT INTO blogs (Blog_Title, Blog_Content, Blog_Banner, Status, Pin, View_count, Create_Date, Member_ID)' +
        'VALUES (?,?,?,0,0,0,DATE_TIMESTAMP,?)', [])
        await conn.commit()
    }catch(err){
        await conn.rolback()
        res.status(400).json(err)
    }finally{
        await conn.release()
    }
})

router.put('/blogs/edit/:blogid', async(req,res,next)=>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        await conn.query("UPDATE blogs SET Blog_Title = ?, Blog_Content = ?, Status = ?, Pin = ? WHERE Blog_ID = ?",
        [req.body.title,req.body.content,,req.body.status,req.body.pin,req.param.blogid])
        conn.commit()
    }catch(err){
        conn.rollback()
    }finally{
        conn.release()
    }
})


router.delete('/blogs/delete/:blogid', async(req,res,next)=>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        await conn.query("DELETE FROM blogs WHERE Blog_ID = ?",[])
        conn.commit()
    }catch(err){
        conn.rollback()
    }finally{
        conn.release()
    }
})

exports.router = router;