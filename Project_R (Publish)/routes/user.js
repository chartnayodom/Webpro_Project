const express = require("express");
const pool = require("../config");
const Joi = require('joi')
const bcrypt = require('bcrypt')
const { generateToken } = require("../util/token");
const { isLoggedIn, isAdmin } = require("../middleware/index")
router = express.Router();

const passwordValid = (value, helpers) => {
    if (value < 8) {
        throw new Joi.ValidationError('Password must contain 8 or more characters')
    }
    if (!value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[A-Z]/)) {
        throw new Joi.ValidationError('Password must stronger')
    }
    return value
}
//make validation
const signupSchema = Joi.object({
    username: Joi.string().required().min(8).max(16),
    password: Joi.string().required().custom(passwordValid),
    confirm_password: Joi.string().required().equal(Joi.ref('password')),
    email: Joi.string().email().required(),
    user_sign: Joi.string().required().alphanum().min(3).max(30),
    first_name: Joi.string().required().min(2).max(50),
    last_name: Joi.string().required().min(2).max(50)
})

const loginValid = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})


//all router

router.post('/user/signup', async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err)
    }

    // res.send('valid')
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = await bcrypt.hash(req.body.password, 5)
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const user_sign = req.body.user_sign
    const email = req.body.email
    // console.log({ 
    //     '1': username,
    //     '2' : password,
    //     '3': first_name,
    //     '4':last_name,
    //     '5': user_sign,
    //     '6':email})
    try {
        await conn.query("INSERT INTO user (u_username, u_password, user_email, user_fname, user_lname, user_sign)" +
            "VALUES (?,?,?,?,?,?)",
            [username, password, email, first_name, last_name, user_sign])
        conn.commit()
        res.status(201).json({ 'message': 'Signup okay' })
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString())
    } finally {
        conn.release()
    }

})


//login
router.post('/user/login', async (req, res, next) => {
    try {
        await loginValid.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err)
    }

    // const password = await bcrypt.hash(req.body.password, 5)
    // console.log(password)
    const [rows, column] = await pool.query('SELECT * FROM user WHERE u_username = ?', [req.body.username])
    // res.status(200).json({'data': rows});

    let user = rows[0]
    if (!user) {
        throw new Error('Incorrect username or password')
    }

    if (!(await bcrypt.compare(req.body.password, user.u_password))) {
        throw new Error('Incorrect username or password')
    }
    console.log("pass")
    // return res.send("pass")
    //check token
    // const conn = pool.getConnection()
    const [tokens] = await pool.query("SELECT * FROM tokens WHERE user_id = ? and role = 'user'",[user.user_id])
    let token = tokens[0]?.token
    if(!token){
        token = generateToken()
        const conn = await pool.getConnection()
        try{
            await conn.query('INSERT INTO tokens(user_id, token, role) VALUES (?,?,"user")',
            [user.user_id, token])
            conn.commit()
            res.status(200).json({'token': token})
        }catch(err){
            conn.rollback()
            res.status(400).json(err)
        }finally{
            conn.release()
        }
    }
    else{
        res.status(200).json({'token':token})
    }
    
})

//check token from user และ admin
router.get('/user/me', isLoggedIn, async (req, res, next) => {
    // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
    res.json(req.user)
})

exports.router = router