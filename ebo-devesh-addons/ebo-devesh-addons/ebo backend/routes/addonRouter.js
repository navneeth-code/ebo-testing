const express = require('express');
const validator = require('../middlewares/validatorMiddleware');
const { getAddons, postAddon, deleteAddon, updateAddon } = require('../controllers/addonController');
const { body } = require("express-validator");
const admin = require('../middlewares/adminMiddleware')

const router = express.Router();

// Get all the addons
router.get('/:category', getAddons);

// Create a new addon
router.post('/', admin, [
    body('productName', 'Please enter a product name').exists({checkFalsy: true}),
    body('productImage').isString().withMessage("should be string"),
    body('price', 'Please enter price').exists({checkFalsy: true}),
    body('discount', 'Please enter discount').exists({checkFalsy: true}),
    body('productCategory', 'Please enter a product category').exists({ checkFalsy: true})
], validator, postAddon);

// delete an addon
router.delete('/delete/:idx', admin, deleteAddon)

 // update an addon
 router.post('/update/:idx', admin, [
    body('productName', 'Please enter a product name').exists({checkFalsy: true}),
    body('productImage').isString().withMessage("should be string"),
    body('productName', 'Please enter price').exists({checkFalsy: true}),
    body('productName', 'Please enter discount').exists({checkFalsy: true}),
    body('productCategory', 'Please enter a product category').exists({ checkFalsy: true})
], validator, updateAddon)

module.exports = router;
