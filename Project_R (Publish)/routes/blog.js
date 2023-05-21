const express = require("express");
const pool = require("../config");
const Joi = require("joi")
const multer = require('multer');
const path = require("path");
const { isLoggedIn } = require("../middleware");

router = express.Router();

var imageStorage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, "./static/uploads/image")
    },
    filename: function(req,file,callback){
        callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
})
const upload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 4096000,
    }
});

const blogsValid = Joi.object({
    blog_title: Joi.string().required().min(10).max(100),
    blog_content: Joi.string().required().max(10000),
    blog_banner: '',
})

const isBlogOwner = async(req,res,next) => {
    if(req.role == 'admin'){
        next()
    }
    const[[blog]] = await pool.query("SELECT * FROM blogs WHERE Blog_ID = ?", [parseInt(req.params.blogid)])
    if(blog.Create_User_ID !== req.user.user_id){
        return res.status(400).send("You have have permission to do this")
    }
    next()
}

//get all blogs in database

router.get("/blogs", async function(req,res,next){
    try{
        const [rows,fields] = await pool.query("SELECT * FROM Blogs WHERE Status = 1;");
        return res.status(200).json(rows)
    }catch(err){
        return next(err)
    }
})

//เรียก blog ที่ต้องการมา
router.get("/blogs/:blogID", async function(req,res,next){
    // console.log(req.param)
    try{
        const [rows, fields] = await pool.query("SELECT * FROM Blogs WHERE Blog_ID = ?",
        [req.params.blogID])
        return res.status(200).json(rows)
    }catch(err){
        return res.status(400).json(err)
    }
})

//add blogs
router.post("/blogs/add",isLoggedIn, upload.single("bannerImage"), async(req,res,next) =>{
    try{
        await blogsValid.validateAsync(req.body,{ AbortEarly: false})
    }catch(err){
        return res.status(400).json(err)
    }
    //add picture
    if(!req.file){
        return res.status(400).json({message: "Please insert banner"})
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        await conn.query('INSERT INTO blogs (Blog_Title, Blog_Content, Blog_Banner, Status, Pin, View_count, Create_Date, Create_User_ID)' +
        'VALUES (?,?,?,0,0,0,CURRENT_TIMESTAMP,?)', 
        [req.body.blog_title, req.body.blog_content, req.file.filename, req.user.user_id])
        await conn.commit()
        return res.status(200).json({message : "Add blogs success"})
    }catch(err){
        await conn.rollback()
        return res.status(400).json(err)
    }finally{
        await conn.release()
    }
})

router.put('/blogs/edit/:blogid', isLoggedIn, isBlogOwner, async(req,res,next)=>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    let blogid = parseInt(req.params.blogid)
    try{
        await conn.query("UPDATE blogs SET Blog_Title = ?, Blog_Content = ? WHERE Blog_ID = ?",
        [req.body.title,req.body.content,blogid])
        conn.commit()
        return res.status(200).json({message: 'แก้ไขสำเร็จ'})
    }catch(err){
        conn.rollback()
        return res.status(400).json(err)
    }finally{
        conn.release()
    }
})


router.delete('/blogs/delete/:blogid',isLoggedIn, isBlogOwner,  async(req,res,next)=>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    let blogid = parseInt(req.params.blogid)
    try{
        await conn.query("DELETE FROM blogs WHERE Blog_ID = ?",[blogid])
        conn.commit()
        return res.status(200).json({message: 'ลบสำเร็จ'})
    }catch(err){
        conn.rollback()
        return res.status(400).json(err)
    }finally{
        conn.release()
    }
})

// router.post('/image/upload', upload.single("banner"), async(req,res,next) =>{
//     console.log(req.file)
//     // console.log(JSON.stringify(req.file))
//     if(!req.file){
//         return res.status(400).json({message: "No image"})
//     }
//     else{
//         res.json({image : req.file.path.substring(6)})
//     }
//     return
// })

exports.router = router;