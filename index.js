const express = require("express");
const mongoose = require("mongoose");
const ejs = require('ejs')
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const photoController = require('./controllers/photoController')
const pageController = require('./controllers/pageController')

const app = express();

// connect DB
mongoose.set('strictQuery', false);
mongoose
    .connect("mongodb+srv://doyransafa:546800asd@cluster0.siwzqiv.mongodb.net/pcat-db?retryWrites=true&w=majority")
    .then(() => console.log("Connected to Photo database!"));

app.set('view engine', 'ejs')

// kullanilan middlewareler
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(fileUpload());
app.use(methodOverride('_method', {methods: ['POST', 'GET']}));


// Routelar
app.get("/", photoController.getAllPhotos);
app.get("/photo/:id", photoController.getPhotoById);
app.post("/add_photo", photoController.addPhoto)
app.put('/photo/:id', photoController.updatePhoto)
app.delete('/photo/:id', photoController.deletePhoto)

app.get("/about", pageController.getAboutPage);
app.get("/add", pageController.getAddPage);
app.get("/photo/edit/:id", pageController.getEditPhotoPage)

app.get("/photo", (req, res) => {
    res.render("photo");
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} uzerinden baslatildi.`);
});
