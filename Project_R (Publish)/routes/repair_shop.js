const express = require("express");
// const pool = require("../config");

router = express.Router();

//Request หน้ารวมอู่
router.get("/repairshop/overview", async function(req,res,next){
    console.log("request index page")
    res.render("repair_shop", {title: "hi"})
    return
})

exports.router = router;