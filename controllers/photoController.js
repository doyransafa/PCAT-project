const Photo = require('../models/Photo')
const fs = require('fs')

exports.getAllPhotos = async (req, res) => {
    const photos = await Photo.find({})
    res.render("index", {
        photos
    });
}

exports.getPhotoById = async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('photo', {
        photo 
    })
}

exports.addPhoto = async (req, res) => {
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
}

exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    photo.title = req.body.title
    photo.description = req.body.description
    await photo.save()
    res.redirect(`/photo/${req.params.id}`)
}

exports.deletePhoto = async (req, res) => {
    const photo = Photo.findById(req.params.id)
    await Photo.deleteOne({_id: req.params.id});
    res.redirect('/')
}
