const Addon = require('../models/addonModel');

// get addons
const getAddons = async (req, res) => {
    const { category } = req.params;
    const data = await Addon.find({ productCategory: category.toLowerCase() });
    if(!data.length) return res.status(200).json({ message: "No addons with the category"})
    res.status(200).json(data);
}

// delete a Addon
const deleteAddon = async (req, res)=>{
  const { idx } = req.params;

  try {
    const addon = await Addon.findOne({_id: idx});
    if(!addon) return res.status(404).json({ error: 'No addon with that id' });
    await addon.remove();
    res.status(200).json({ message: 'Post deleted successfully' });
  } 
  catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// post an addon
const postAddon = async(req,res) => {
  const userId = req.user._id;
  const { 
     productName,
     productImage, 
     price, 
     discount,
     productCategory
     } = req.body;
  
  try {
   const addon = await Addon.create({ 
      user: userId,
      productName,
      productImage,
      price,
      discount,
      productCategory:productCategory.toLowerCase()
     });
    
    res.status(200).json({ message: 'Addon created successfully', added: addon });
  } catch (err) {
   res.status(400);
   throw new Error(err);
  }}

// update an addon
const updateAddon = async (req, res)=>{
    const { idx } = req.params;
    const userId = req.user._id;
    
    const update = req.body;
    try {
      const newAddon = await Addon.findByIdAndUpdate(idx, {...update, _id: idx, user: userId }, {new: true});
      res.status(200).json({ message: 'Addon updated successfully', new: newAddon });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }  
 }

module.exports = { getAddons, postAddon, deleteAddon, updateAddon };



