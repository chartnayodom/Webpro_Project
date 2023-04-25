const express = require("express");
const pool = require("../config");

router = express.Router();

//Request หน้ารวมอู่
router.get("/repairshop/overview", async function(req,res,next){
    //get repair shop maps
    console.log("request index page")
    res.render("repair_shop", {title: "hi"})
    return
})

//ส่ง form แนะนำลงไปใน Database
router.post("/repairshop/add", async function(req,res,next){
    // try{
    //     const[rows,column] = await pool.query("INSERT INTO ")
    // }
    // catch(err){
    //     return next(err)
    // }
    return res
})

router.delete("/repairshop/:shopid", aync function(req,res,next){
    // try{
    //     const[rows,column] = await pool.query("INSERT INTO ")
    // }
    // catch(err){
    //     return next(err)
    // }
    return res
})

exports.router = router;