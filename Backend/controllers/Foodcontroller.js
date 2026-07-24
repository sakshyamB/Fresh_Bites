const foods = require('../models/Foods')

 exports.AddFoods = async (req,res) => {
  try {
    await foods.create({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    type: req.body.type,
    description: req.body.description
    })
    return res.status(201).json({message: "Foods Added sucessfully."})
  }
  catch(err){
    return res.status(500).json({message: "Couldn't Add foods."})  
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