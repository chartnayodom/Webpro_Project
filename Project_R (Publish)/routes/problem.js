const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require("../middleware");
// const Joi = require('joi')

router = express.Router();

const isAdmin = async(req,res,next) => {
    console.log(req.user.role)
    if(req.role == 'admin'){
        next()
    }
    else{
        return res.status(400).send("You have don't have permission to do this")
    }
}

//list คำถาม
router.get('/problem', async (req,res,next) =>{
    try{
        const [rows] = await pool.query("SELECT * FROM problem WHERE problem_ref_id = '' or problem_id is null")
        res.status(200).json(rows)
    }catch(err){
        return next(err)
    }
})

//เลือกข้อเพื่อไปส่วนย่อยของปัญหานั้น
router.get('/problem/:asking', async(req,res,next) =>{
    try{
        const [subrow] = await pool.query("SELECT * FROM problem WHERE problem_ref_id = ?",
        [req.params.asking])
        res.status(200).json(subrow)
    }catch(err){
        return next(err)
        
    }
})



//เพิ่มหัวข้อปัญหา มีใส่เลขReferenceที่เป็นย่อยจากหัวข้อหลัก, ปัญหา, คำตอบ(ถ้ามี)
router.post('/problem/add', isLoggedIn,isAdmin, async (req,res,next)=>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        pool.query("INSERT INTO problem (problem_ref_id,context,answer)VALUES (?,?,?)",
        [req.body.refer, req.body.context, req.body.answer])
        conn.commit()
        res.status(200).json({ 'message': 'pass', 'insert_values': req.body})
    }catch(err){
        conn.rollback()
        res.status(400).json(err)
    }finally{
        conn.release()
    }
})

//แก้ไข
router.put('/problem/edit/:problemid',isLoggedIn, isAdmin, async(req,res,next)=>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        await conn.query("UPDATE problem SET problem_ref_id = ?, context = ?, answer = ? WHERE problem_id = ?",
        [req.body.refer, req.body.context, req.body.answer, req.params.problemid])
        conn.commit()
        res.status(200).json({ 'message': 'pass', 'insert_values': req.body})
    }catch(err){
        conn.rollback()
        res.status(400).json(err)
    }finally{
        conn.release()
    }
})

//ลบ
router.delete('/problem/delete/:problemid', isLoggedIn, isAdmin, async(req,res,next)=>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        await conn.query("DELETE FROM problem WHERE problem_id = ?",
        [req.params.problemid])
        conn.commit()
        res.status(200).json({ 'message': 'pass'})
    }catch(err){
        conn.rollback()
        res.status(400).json(err)
    }finally{
        conn.release()
    }
})

exports.router = router