const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async function(req,res,next){
    console.log("request index page")
    try{
        const [rows,fields] = await pool.query("SELECT * FROM blogs WHERE pin = 1;");
        return res.status(200).json(rows)
    }catch(err){
        return res.status(400).next(err)
    }
})

//get all blogs in database
router.get("/home", async function(req,res,next){
    try{
        const [rows, fields] = await pool.query("SELECT * FROM blogs WHERE pin = 0;");
        return res.status(200).json(rows);
    } catch(err){
        return next(err)
    }
})

// router.get("/blogs", async function(req,res,next){
//     try{
//         const [rows,fields] = await pool.query("SELECT * FROM Blogs;");
//         return res.json(rows)
//     }catch(err){
//         return next(err)
//     }
// })

// router.get("/blogs/:blogID", async function(req,res,next){
//     try{
//         const [rows, fields] = await pool.query("SELECT * FROM Blogs where Blog_ID = ?;",
//         [req.param.blogID])
//         return res.json(rows)
//     }catch(err){
//         return next(err)
//     }
// })

exports.router = router;