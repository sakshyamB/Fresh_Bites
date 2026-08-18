const foods = require('../models/Foods')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const deleteCloudinaryImage = async (imageUrl) => {
  if (!imageUrl || !imageUrl.includes('cloudinary.com')) return

  try {
    const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0]
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Cloudinary delete failed:', error.message)
  }
}

exports.AddFoods = async (req,res) => {
  try {
    const { name, price, category, image, type, description } = req.body;

    if (!name || !price || !category || !image || !type || !description) {
      return res.status(400).json({ message: 'All food fields are required.' })
    }

    await foods.create({
      name,
      price,
      category,
      image,
      type,
      description
    })

    return res.status(201).json({ message: 'Foods Added successfully.' })
  }
  catch (err) {
    console.error('AddFoods error:', err)

    const validationMessage = err?.errors
      ? Object.values(err.errors).map(error => error.message).join(', ')
      : err.message

    return res.status(500).json({
      message: validationMessage || "Couldn't Add foods."
    })
  }
 }

 exports.UpdateFoods = async (req,res) => {
    try {
    await foods.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    type: req.body.type,
    description: req.body.description
        })
        return res.status(200).json({message: "Foods updated sucessfully."})
    }
    catch (err) {
        return res.status(500).json({message: "Couldn't update food."})
    }
 }

 exports.DeleteFoods = async (req,res) =>{
    try {
        const foodItem = await foods.findById(req.params.id)

        if (!foodItem) {
            return res.status(404).json({ message: "Food not found." })
        }

        await deleteCloudinaryImage(foodItem.image)
        await foods.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Food deleted sucessfully."})
    }
    catch (err) {
        return res.status(500).json({message: "Couldn't delete food."})
    }
 }

 exports.GetAllFoods = async (req,res) =>{
    try{
        const food = await foods.find({});
        return res.status(200).json({message: "foods found", data: food})
    }
    catch (err){
        return res.status(500).json({ message: "Internal Server Error",})
    }
 }

  exports.GetFoodsById = async (req,res) =>{
    try{
        const food = await foods.findById(req.params.id);
    if (!food) {
    return res.status(404).json({message: "Food not found"});
    }
        return res.status(200).json({message: "food found", data: food})
    }
    catch (err){
        return res.status(500).json({ message: "food not found."})
    }
 }