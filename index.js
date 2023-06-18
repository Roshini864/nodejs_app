
// 1.NODEJS
// // const http = require("http")
// // const gfName = require("./features")

// import http, { METHODS } from "http"
// // import gfName from './features.js'
// // import {gfName2, gfName3} from './features.js'
// import * as obj from './features.js'
// import fs from "fs"
// import path from "path"

// // console.log(obj.gfname/4)

// // console.log(obj.genPerct())
// // console.log(path.basename)

// // console.log(gfName)
// // console.log(gfName2)

// console.log(METHODS)

// // const file = fs.readFile('./index.html', () => {
// //     console.log("ha malum hai")
// // })

// // const home = fs.readFile("./index.html", () => {console.log("HELLO")})
// const home = fs.readFileSync("./index.html")
// // console.log(home)
// const server = http.createServer((req, res) => {
//     if(req.url == '/'){
//         // console.log(gfName)  

//         console.log(req.method)
//         res.end("home");

//         // fs.readFile('./index.html', () => {
//         //     res.end(home);
//         // })

//         // const file = fs.readFile('./index.html', () => {
//         //     console.log("ha malum hai")
//         // })
//         // console.log(file)
//         // res.end("<h1>Home +page</h1>");
//     }
//     else if(req.url == '/about'){
//         res.end(`<h1>My Love is ${obj.genPerct()}</h1>`)
//         // res.end("<h1>About page</h1>");
//     }
//     else if(req.url == '/contact'){
//         // res.end("<h1>Contact page</h1>");
//         console.log("nhi")
//     }
//     else{
//         res.end("<h1>Page Not Found</h1>");
//     }
// })

// // const server = http.createServer((req, res) => {
//     // console.log(req.url)
//     // console.log("server started");
//     // res.end("okiee");
//     // res.end("<h1>ROSHINI</h1>");
// // })

// // const server = http.createServer(() => {
// //     console.log("server started");
// // })

// server.listen(5000, () => {
//     console.log("server is working");
// })


// // type: commonjs  const name = require("name")
// // type: module import name from "name" in package.json


// 2.EXPRESSS
import express from "express"
import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrpyt from "bcrypt"
const app = express();

app.set("view engine", "ejs")

// const users = []

//static pages ke liye in public, phir yeh
// console.log("hello")
// console.log(path.join(path.resolve(), "public"));
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1", {
    dbName: "backend",
}).then(() => {console.log("DataBase Connected")})
.catch((e) => {console.log(e)})

// const msgSchema = new mongoose.Schema({
//     name: String,
//     email: String
// });
// const Message = mongoose.model("Message", msgSchema)

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
const User = mongoose.model("User", userSchema)


// app.get("/", (req, res) => {
//     console.log("Home Page")
//     // res.send("HA")
//     // res.statusCode = 404
//     res.sendStatus(404);
// })

// console.log(path.resolve())

// app.get("/", (req, res) => {
//     console.log(path.resolve())
//     const pathLoc = path.resolve()
//     // res.sendFile(path.join(path.resolve(), "./index.html"))
//     res.render("index.ejs", {name: "Roshini "})

//     // const file = fs.readFileSync("./index.html");
//     // res.send(file)

//     // res.sendFile("./index.html") 
// })

// app.get("/", (req, res) => {
//     res.render("index.ejs", {name: "Ankit"})
// })


// app.get("/add", async (req, res) => {
//    await Message.create({
//         name: "Roshini",
//         email: "roshini@gmail.com"
//     })
// })

// app.get("/add", (req, res) => {
//     Message.create({
//         name: "Rosh",
//         email: "rosh@gmail.com"
//     }).then(() => {
//         res.send("Nice")
//     })
// })

// app.post("/contact", async (req, res) =>{
//     const {name, email} = req.body
//     await Message.create({name: name, email: email})
//     res.render("success")
// })

// app.post("/contact", async (req, res) =>{
//     // console.log(req.body.name)
//     // const userData = ({userName: req.body.name, EMail: req.body.email})
//     // console.log(userData)
//     await Message.create({name: req.body.name, email: req.body.email})
//     res.render("success")
// })

// app.post("/contact", (req, res) =>{
//     console.log(req.body.name)
//     users.push({userName: req.body.name, EMail: req.body.email})
//     console.log(users)
//     // res.redirect("success")
//     res.render("success")
// })

// app.get("/success", (req, res) => {
//     res.render("success.ejs")
// })

// app.get("/users", (req, res) => {
//     res.json({
//         users,
//     })
// })


// app.get("/", (req, res) => {
//     res.sendFile("index.html")
// })

// app.get("/getproducts", (req, res) => {
//     // res.status(400).send("MERI MARZI")
//     // res.json({
//     //     success: true,
//     //     products: []
//     // })
// })

app.listen(5000, () => {
    console.log("Server ban gayaa")
})

//AUTHORIZATION

// const isAuthenticated = (req, res, next) => {
//     const {token} = req.cookies;
//     if(token) {
//         next()
//     }
//     else{
//         res.render("login")
//     }
// }

const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;
    if(token) {
        const decoded = jwt.verify(token, "wedding")
        // console.log(decoded)
        req.user = await User.findById(decoded._id)
        next();
    }
    else{
        // res.render("login")
        res.redirect("/login")
    }
}

app.get("/", isAuthenticated, (req, res) => {
    console.log(req.user)
    res.render("logout", {name: req.user.name})
});

app.get("/register", (req, res) => {
    // console.log(req.user)
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})

// app.get("/", (req, res, next) => {
//     const {token} = req.cookies;
//     if(token) {
//         next();
//     }
//     else{
//         res.render("login")
//     }
// }, (req, res, next) => {})

// app.get("/", (req, res) => {
//     const {token} = req.cookies;
//     if(token) {
//         res.render("logout")
//     }
//     else{
//         res.render("login")
//     }
// })

app.post("/register", async (req, res) => {
    console.log(req.body)
    const {name, email, password} = req.body;
    const usertemp = await User.findOne({email})
    if(usertemp){
        return res.redirect("/login")
    }
    const hashPass = await bcrpyt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashPass,
    })

    const token = jwt.sign({_id: user._id}, "wedding");
    // console.log(token)

    res.cookie("token", token, {
        httpOnly: true, 
        expires: new Date(Date.now() + 60 * 1000)
    })
    res.redirect("/")
})

app.post("/login", async (req,res) => {
    const{email, password} = req.body;
    let user = await User.findOne({email});
    if(!user){
        return res.redirect('/register')
    }
    // const isMatch = user.password === password;
    const isMatch = await bcrpyt.compare(password, user.password);
    if(!isMatch) return res.render("login", {email, message: "Incorrect Password"});
    const token = jwt.sign({_id: user._id}, "wedding");
    // console.log(token)
    res.cookie("token", token, {
        httpOnly: true, 
        expires: new Date(Date.now() + 60 * 1000)
    })
    res.redirect("/")

})

// app.post("/login", async (req, res) => {
//     console.log(req.body)
//     const {name, email} = req.body;
//     const usertemp = await User.findOne({email})
//     if(!usertemp){
//         return res.redirect("/register")
//     }
//     const user = await User.create({
//         name,
//         email,
//     })

//     const token = jwt.sign({_id: user._id}, "wedding");
//     // console.log(token)

//     res.cookie("token", token, {
//         httpOnly: true, 
//         expires: new Date(Date.now() + 60 * 1000)
//     })
//     res.redirect("/")
// })

// app.post("/login", (req, res) => {
//     // console.log("aa bhai.....")
//     res.cookie("token", "iamin", {
//         httpOnly: true,
//         expires: new Date(Date.now() + 60 * 1000)
//     })
//     res.redirect("/")
// })

app.get("/logout", (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.redirect("/")
}) 