const express = require("express");
// const pool = require("../config");

router = express.Router();

router.get("/", async function(req,res,next){
    console.log("request index page")
    res.render("index", {title: "hi"})
    return
})

exports.router = router;