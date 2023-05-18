const express = require("express");
const pool = require("../config");
// const Joi = require('joi')

router = express.Router();

//list คำถาม
router.get('/problem', async (req,res,next) =>{
    try{
        pool.query("SELECT * FROM problem WHERE problem_ref_id == NULL")
    }catch(err){
        return next(err)
    }
})

//เลือกข้อเพื่อไปส่วนย่อยของปัญหานั้น
router.get('/problem/:asking', async(req,res,next) =>{
    try{
        pool.query("SELECT * FROM problem WHERE problem_ref_id = ?",
        [req.params.asking])
    }catch(err){
        return next(err)
    }
})

//เพิ่มหัวข้อปัญหา มีใส่เลขReferenceที่เป็นย่อยจากหัวข้อหลัก, ปัญหา, คำตอบ(ถ้ามี)
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

//แก้ไข
router.put('/problem/edit/:problemid', async(req,res,next)=>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        await conn.query("UPDATE problem SET problem_ref_id = ?, context = ? answer = ? ",
        [])
        conn.commit()
    }catch(err){
        conn.rollback()
    }finally{
        conn.release()
    }
})

//ลบ
router.put('/problem/delete/:problemid', async(req,res,next)=>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        await conn.query("DELETE FROM problem WHERE problem_id = ?",
        [])
        conn.commit()
    }catch(err){
        conn.rollback()
    }finally{
        conn.release()
    }
})

exports.router = router