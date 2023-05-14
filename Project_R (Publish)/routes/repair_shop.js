const express = require("express");
const pool = require("../config");
const Joi = require('joi')

router = express.Router();

const blogVal = Joi.object({
    shop_name : Joi.string(),
    shop_addr : Joi.string(),
    userid : Joi.number()
})

//Request หน้ารวมอู่
router.get("/repairshop", async function(req,res,next){
    //get repair shop maps
    try{
        const[rows, column] = await pool.query('SELECT * FROM shop WHERE shop_approved = 1')
        res.status(200).json(rows)
    }catch(err){
        next(err)
    }
})

//ส่ง form แนะนำลงไปใน Database
router.post("/repairshop/add", async function(req,res,next){
    try{
        await blogVal.validateAsync(req.body, { abortEarly: false })
    } catch(err){
        return res.status(400).json(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    //เอาUserid จาก Session แล้วใส่แทน req.body.userid 
    // const userid = 
    try{
        await conn.query('INSERT INTO shop (r_shop_name, r_shop_address, r_shop_by, r_shop_like, shop_approved) VALUES (?,?,?,?,?)'
        ,[req.body.shop_name, req.body.shop_addr, req.body.userid, 0 ,0])
        conn.commit()
        res.status(201).json({message: 'success'})
    }catch(err){
        conn.rollback()
        res.status(400).json(err.toString())
    }finally{
        conn.release()
    }
    // return res
})

router.post("/repairshop/update", async(req,res,next)=>{
    // const SELECT
    const conn = await pool.getConnection()
    conn.beginTransaction()
    const userid = parseInt(req.body.id)
    try{
        await conn.query("UPDATE shop SET r_shop_name = ?, r_shop_address = ? WHERE r_shop_id = ?",[req.body.shop_name, req.body.shop_addr,userid])
        conn.commit()
        res.status(201).json({message: 'update recommented shop success'})
    }catch(err){
        conn.rollback()
        res.status(400).json(err)
    }finally{
        conn.release()
    }
})

//delete
router.delete("/repairshop/delete/", async (req,res,next) => {
    const conn = await pool.getConnection()
    conn.beginTransaction()
    try{
        await conn.query("DELETE FROM shop WHERE r_shop_id = ?",[parseInt(req.query.id)])
        conn.commit()
        res.status(201).json({message: 'delete recommented shop success'})
    }catch(err){
        conn.rollback()
        res.status(400).json(err)
    }finally{
        conn.release()
    }

})

//addlike
router.get("/repairshop/addlike/", async function(req,res,next){
    
    const shopid = parseInt(req.query.id)

    const [rows, column] = await pool.query("SELECT r_shop_like FROM shop WHERE r_shop_id = ?"
    , [shopid])
    // console.log(rows)
    let likecount = rows[0].r_shop_like
    // console.log(likecount)
    likecount += 1

    const conn = await pool.getConnection()
    conn.beginTransaction()
    try{
        await conn.query("UPDATE shop set r_shop_like = ? WHERE r_shop_id = ?",[likecount ,shopid])
        conn.commit()
        res.status(201).json({message: 'addliked'})
    }catch(err){
        conn.rollback()
        res.status(400).json(err)
    }finally{
        conn.release()
    }
})

//for admin
router.get("/repairshop/publish/", async(req,res,nect)=>{

    const shopid = parseInt(req.query.id)

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        await conn.query("UPDATE shop SET shop_approved = 1 WHERE r_shop_id = ?", [shopid])
        await conn.commit()
        res.status(201).json({message: "approved and release success"})
    } catch(err){
        await conn.rollback()
        res.status(400).json(err)
    }finally{
        await conn.release()
    }
})

exports.router = router;