const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const itemSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      desc: {
        type: String,
        required: true,
        validate(value) {
          if (validator.isLength(value, { max: 49 })) {
            throw new Error('Cloth Item description should be at least 50 characters');
          }
        }
      },
      img: {
        type: String,
        default: "sample_product.png"
      },
      category: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      color: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
      },
      quantity_in_stock: {
        type: Number,
        default: 100,
      },
    },
    {
      timestamps: true,
    }
);

itemSchema.plugin(toJSON);
itemSchema.plugin(paginate);

/**
 * @typedef Item
 */
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;