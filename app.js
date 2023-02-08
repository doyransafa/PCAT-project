const express = require("express");
const mongoose = require("mongoose");
const ejs = require('ejs')
const path = require('path')
const Photo = require('./models/Photo')

const app = express();

// connect DB
mongoose.set('strictQuery', false);
mongoose
    .connect("mongodb://127.0.0.1:27017/pcat-test-db")
    .then(() => console.log("Connected!"));

app.set('view engine', 'ejs')

// kullanilan middlewareler
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


// Routelar
app.get("/", async (req, res) => {
    const photos = await Photo.find({})
    res.render("index", {
        photos
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/add", (req, res) => {
    res.render("add");
});

app.get("/photo", (req, res) => {
    res.render("photo");
});

app.post("/add_photo", async (req, res) => {
    await Photo.create(req.body)
    await console.log(req.body, 'Added succesfully!')
    await res.redirect("/")
});


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} uzerinden baslatildi.`);
});
