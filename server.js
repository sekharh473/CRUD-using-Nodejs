const express=require('express')
const dotenv=require("dotenv");
const morgan=require('morgan')
const path=require('path');


const connectDB=require('./server/database/connection')

const app =express();
// app.use(express.urlencoded({extend:true}))

dotenv.config({path:'config.env'})
const PORT=process.env.PORT || 8080


//log requests
app.use(morgan('tiny'));

//!mongoDb connection
connectDB();



//parse request to bodyparser
app.use(express.json());


//set view engine
app.set("view engine","ejs")
// app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets
// app.use('/assets',express.static(path.resolve(__dirname,"assets")))
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
// css/style.css


//load routers
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)})