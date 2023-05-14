const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')

const app = express();

app.use(express.static('static'))
app.use(express.json())
// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'))
// app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: true}));

const indexRouter = require('./routes/index.js')
const repairshopRouter = require('./routes/repair_shop.js')
const userRouter = require('./routes/user.js')
const blogRouter = require('./routes/blog.js')
const problemRouter = require('./routes/problem.js')

app.use(indexRouter.router)
app.use(repairshopRouter.router)
app.use(userRouter.router)
app.use(blogRouter.router)
app.use(problemRouter.router)

app.listen(3000, () => {
    console.log(`Running in port3000`)
})