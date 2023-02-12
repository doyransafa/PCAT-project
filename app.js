const express = require("express");
const mongoose = require("mongoose");
const ejs = require('ejs')
const path = require('path')
const methodOverride = require('method-override');
const fs = require('fs')
const fileUpload = require('express-fileupload');
const Photo = require('./models/Photo')


const app = express();

// connect DB
mongoose.set('strictQuery', false);
mongoose
    .connect("mongodb://127.0.0.1:27017/pcat-test-db")
    .then(() => console.log("Connected to Photo database!"));

app.set('view engine', 'ejs')

// kullanilan middlewareler
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(fileUpload());
app.use(methodOverride('_method', {methods: ['POST', 'GET']}));


// Routelar
app.get("/", async (req, res) => {
    const photos = await Photo.find({})
    res.render("index", {
        photos
    });
});

app.get("/photo/:id", async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('photo', {
        photo 
    })
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

    let uploadedImage = req.files.image
    let uploadPath = __dirname  + '/public/uploads/' + uploadedImage.name

    fs.mkdirSync('public/uploads/', { recursive: true })

    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name 
        })
        res.redirect('/')
    })

});

app.get("/photo/edit/:id", async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('edit', {
        photo
    })
});


app.put('/photo/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    photo.title = req.body.title
    photo.description = req.body.description
    await photo.save()

    res.redirect(`/photo/${req.params.id}`)
})

app.delete('/photo/:id', async (req, res) => {
    const photo = Photo.findById(req.params.id)
    await Photo.deleteOne({_id: req.params.id});
    res.redirect('/')
})


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} uzerinden baslatildi.`);
});
