const express = require("express");
const pool = require("../config");

router = express.Router();

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

exports.router = router;