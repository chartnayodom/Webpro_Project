const express = require("express");
const pool = require("../config");
const Joi = require('joi')
const { isLoggedIn } = require("../middleware");
// const Loader = require("@googlemaps/js-api-loader")
const NodeGeocoder = require('node-geocoder');

router = express.Router();

const options = {
    provider: 'google',
    // fetch: customFetchImplementation,
    apiKey: "AIzaSyB12mjt1P72zdonmXSo2uMWUe7SIbbaoAg",
    formatter: null
}
const geocoder = NodeGeocoder(options)

const isShopRecommenter = async(req,res,next) => {
    if(req.role == 'admin'){
        next()
    }
    const[[shop]] = await pool.query("SELECT * FROM shop WHERE r_shop_id= ? ", [req.params.shopid])
    if(shop.r_shop_by !== req.user.user_id){
        // console.log(shop.r_shop_by)
        return res.status(400).send("You have have permission to do this")
    }
    next()
}


//
const blogVal = Joi.object({
    shop_name : Joi.string().min(5).max(100),
    shop_addr : Joi.string().min(10).max(300),
    userid : Joi.number()
})



//Request หน้ารวมอู่
router.get("/repairshop", async (req,res,next) => {
    //get repair shop maps
    try{
        const[rows, column] = await pool.query('SELECT s.*, m.user_sign FROM shop s join `user` m on (s.r_shop_by = m.user_id) WHERE shop_approved = 1')
        res.status(200).json(rows)
    }catch(err){
        res.status(400).json(err)
    }
})

router.get("/repairshop/:shopid", async (req,res,next) =>{
    let shopid = parseInt(req.params.shopid)
    try{
        const[rows, column] = await pool.query('SELECT * FROM shop WHERE r_shop_id = ?', [shopid])
        res.status(200).json(rows)
    }catch(err){
        res.status(400).json(err)
    }
})

//ส่ง form แนะนำลงไปใน Database
router.post("/repairshop/add", isLoggedIn, async (req,res,next) => {
    try{
        await blogVal.validateAsync(req.body, { abortEarly: false })
    } catch(err){
        return res.status(400).json(err)
    }

    //get shop coordinate
    const loresult = await geocoder.geocode(req.body.shop_addr)
    let lat = loresult[0].latitude
    let lng = loresult[0].longitude
    // console.log(loresult)

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    //เอาUserid จาก Session แล้วใส่แทน req.body.userid 
    // const userid = 
    try{
        await conn.query('INSERT INTO shop (r_shop_name, r_shop_address, lat, lng, r_shop_by, r_shop_like, shop_approved) VALUES (?,?,?,?,?,0,0)'
        ,[req.body.shop_name, req.body.shop_addr, lat, lng, req.user.user_id])
        conn.commit()
        res.status(201).json({message: 'success'})
    }catch(err){
        conn.rollback()
        res.status(400).json(err.toString())
    }finally{
        conn.release()
    }
    return
})

router.put("/repairshop/update/:shopid", isLoggedIn, isShopRecommenter, async(req,res,next)=>{
    
    //get shop coordinate
    const loresult = await geocoder.geocode(req.body.shop_addr)
    let lat = loresult[0].latitude
    let lng = loresult[0].longitude
    const conn = await pool.getConnection()
    conn.beginTransaction()
    const shopid = parseInt(req.params.shopid)
    try{
        await conn.query("UPDATE shop SET r_shop_name = ?, r_shop_address = ?, lat = ?, lng = ? WHERE r_shop_id = ?",[req.body.shop_name, req.body.shop_addr,lat,lng,shopid])
        conn.commit()
        res.status(200).json({message: 'update recommented shop success'})
    }catch(err){
        conn.rollback()
        res.status(400).json(err)
    }finally{
        conn.release()
    }
    return
})

//delete
router.delete("/repairshop/delete/:shopid", isLoggedIn, isShopRecommenter, async (req,res,next) => {
    const conn = await pool.getConnection()
    conn.beginTransaction()
    try{
        await conn.query("DELETE FROM shop WHERE r_shop_id = ?",[parseInt(req.params.shopid)])
        conn.commit()
        res.status(200).json({message: 'delete recommented shop success'})
    }catch(err){
        conn.rollback()
        res.status(400).json(err)
    }finally{
        conn.release()
    }
    return
})

//addlike
router.get("/repairshop/addlike/:shopid", async function(req,res,next){
    
    const shopid = parseInt(req.params.shopid)

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
//router.get("/repairshop/publish/", async(req,res,nect)=>{
//
//    const shopid = parseInt(req.query.id)
//
//    const conn = await pool.getConnection()
//    await conn.beginTransaction()
//    try{
//        await conn.query("UPDATE shop SET shop_approved = 1 WHERE r_shop_id = ?", [shopid])
//        await conn.commit()
//        res.status(201).json({message: "approved and release success"})
//   } catch(err){
//        await conn.rollback()
//        res.status(400).json(err)
//    }finally{
//        await conn.release()
//    }
//})

// router.post("/repairshop/addlocate", async (req,res,next) =>{
//     const loresult = await geocoder.geocode(req.body.address)
//     return res.json({
//         address : req.body.address,
//         lat : loresult[0].latitude,
//         lng : loresult[0].longitude
//     })
// })

exports.router = router;