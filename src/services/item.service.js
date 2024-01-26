const httpStatus = require('http-status');
const { Item } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Get item by id
 * @param {ObjectId} id
 * @returns {Promise<Item>}
 */
const getItemById = async (id) => {
    return Item.findById(id);
};

/**
 * Get all items
 * @returns {Promise<Item[]>}
 */
const getItems = async () => {
    return Item.find({});
};


/**
 * Create a item
 * @param {Object} itemBody
 * @returns {Promise<Item>}
 */
const createItem = async (itemBody) => {
    return Item.create(itemBody);
};


/**
 * Update item by id
 * @param {ObjectId} itemId
 * @param {Object} updateBody
 * @returns {Promise<Item>}
 */
const updateItemById = async (itemId, updateBody) => {
    const item = await getItemById(itemId);
    if (!item) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
    }
    Object.assign(item, updateBody);
    await item.save();
    return item;
};


/**
 * Delete item by id
 * @param {ObjectId} itemId
 * @returns {Promise<Item>}
 */
const deleteItemById = async (itemId) => {
    const item = await getItemById(itemId);
    if (!item) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
    }
    await item.remove();
    return item;
  };

module.exports = {
    getItemById,
    getItems,
    createItem,
    updateItemById,
    deleteItemById,
};
  