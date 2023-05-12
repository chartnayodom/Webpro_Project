const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: false}));

const indexRouter = require('./routes/index.js')
const repairshopRouter = require('./routes/repair_shop.js')
const userRouter = require('./routes/user')

app.use(indexRouter.router)
app.use(repairshopRouter.router)
app.use(userRouter.router)

app.listen(3000, () => {
    console.log(`Running in port3000`)
})