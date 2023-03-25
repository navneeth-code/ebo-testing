const mongoose = require('mongoose');

const AddonSchema = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    productName: {
        type: String, 
        required: true 
    },
    productImage: {
        type: String, 
        required: true 
    },
    productCategory: { 
        type: String, 
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    discount: { 
        type: Number, 
        required: true
    },
});

module.exports = mongoose.model('Addon', AddonSchema);
