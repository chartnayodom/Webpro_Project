const express = require("express");
const pool = require("../config");
// const Joi = require('joi')

router = express.Router();

router.get('/problem', async (req,res,next) =>{
    try{
        pool.query("SELECT * FROM problem WHERE problem_ref_id == NULL")
    }catch(err){
        return next(err)
    }
})

router.get('/problem/:asking', async(req,res,next) =>{
    try{
        pool.query("SELECT * FROM problem WHERE problem_ref_id = ?",
        [req.params.asking])
    }catch(err){
        return next(err)
    }
})

router.post('/problem/add', async (req,res,next)=>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        pool.query("INSERT INTO problem (problem_ref_id,context,answer)VALUES (?,?,?)",
        [req.body.refer, req.context, req.answer])
        conn.commit()
        res.status(200).json({ 'message': 'pass', 'insert_values': req.body})
    }catch(err){
        conn.rollback()
    }finally{
        conn.release()
    }
})
exports.router = router