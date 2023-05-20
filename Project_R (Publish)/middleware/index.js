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
    if (token.role == 'user') {
        // Set user
        const [users] = await pool.query(
            'SELECT user_id, user_fname, user_lname, user_sign ' +
            'FROM user WHERE user_id = ?', [token.user_id]
        )
        req.user = users[0]
        // console.log(users[0])
        next()
    }
    else if (token.role == 'admin') {
        // Set admin
        const [users] = await pool.query(
            'SELECT Admin_ID, Admin_Alias' +
            'FROM user WHERE Admin_ID = ?', [token.user_id]
        )
        req.user = users[0]
        // console.log(users[0])
        next()
    }



}

module.exports = {
    logger,
    isLoggedIn
}