async function logger(req, res, next) {
    const timestamp = new Date().toISOString().substring(0, 19)
    console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`)
    next()
}

const pool = require("../config");

async function isLoggedIn (req, res, next) {
    let authorization = req.headers.authorization
    // console.log(authorization)
    if (!authorization) {
        return res.status(401).send('You are not logged in')
    }

    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        return res.status(401).send('You are not logged in')
    }
    // console.log("SELECT * FROM tokens WHERE `token` = "+part2)

    // Check token
    const [tokens, column] = await pool.query('SELECT * FROM `tokens` WHERE token = ? ', [part2])
    const token = tokens[0]
    // console.log(token)
    if (!token) {
        return res.status(401).send('You are not logged in by not found token')
    }
    // console.log(token.role)
    if (token.role == 'user') {
        // Set user
        console.log('get role user')
        const [users] = await pool.query(
            'SELECT user_id, user_fname, user_lname, user_sign ' +
            'FROM user WHERE user_id = ?', [token.user_id]
        )
        req.user = users[0]
        req.user = Object.assign(req.user,{role : 'user'})
        // req.role = "user"
        // console.log(req.user)
        next()
    }
    else if (token.role == 'admin') {
        // Set admin    
        console.log('get admin role')
        const [users] = await pool.query(
            'SELECT Admin_ID, Admin_Alias' +
            ' FROM admin WHERE Admin_ID = ?', [token.user_id]
        )
        req.user = users[0]
        req.user = Object.assign(req.user,{role : 'admin'})
        // req.role = "admin"
        console.log(req.user)
        next()
    }



}

module.exports = {
    logger,
    isLoggedIn
}