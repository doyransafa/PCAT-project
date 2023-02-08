const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// connect DB
mongoose.set('strictQuery', false);
mongoose
    .connect("mongodb://127.0.0.1:27017/pcat-test-db")
    .then(() => console.log("Connected!"));

const PhotoSchema = new Schema({
    title: String,
    description: String,
});

const Photo = mongoose.model("Photo", PhotoSchema);

// create a photo

Photo.create({
    title: "Photo Title 1",
    description: "Photo Description 1",
});

Photo.fi