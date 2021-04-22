const path = require("path")
const hbs = require('hbs')
const express = require('express')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express();
const port = process.env.PORT || 3000; 
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views")
const partilasPath = path.join(__dirname, '../templates/partials')



app.set("view engine", "hbs") 
app.set('views', viewsPath)
app.use(express.static(publicDirPath))
hbs.registerPartials(partilasPath)



app.get("", (req, res)=>{
    res.render('index', {
        title: "weather app",
        name:"youyou"
    })
})

app.get("/about",(req, res)=>{
    res.render('about',{
        title:'about me',
        name : "author"
    })
})

app.get("/help",(req, res)=>{
    res.render("help", {

        msg:"we can help you",
        title:'help',
        name : "author"
    })
})

app.get("/weather", (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"please provide a valid address"
        })
    }

    geocode(req.query.address, (error, {location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(location , (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData ,
                address: req.query.address
            })
        })
    })



        /*res.send({
            //address:req.query.address
        })*/
})

app.get("/products", (req, res)=>{
    if(!req.query.product){
        return res.send({
            error: 'error massage'
        })

    }
    console.log(req.query);
    res.send({
        products:[]
    })
})


app.get('/help/*',(req, res)=>{
    res.render('errorPage',{
        errorMsg : "help article not found",
        title:404,
        name:'author'
    })
})

app.get("/*", (req, res)=>{
    res.render("errorPage",{
        errorMsg:"page not found",
        title:404,
        name:"robot" 
    })
})

app.listen(port, ()=>{
    console.log("server is up running");
})