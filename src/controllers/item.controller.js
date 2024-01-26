const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { itemService } = require('../services');

const defaultRequest = catchAsync(async (req, res) => {
  res.send({ res: 'Default request' });
});

const getItemById = catchAsync(async (req, res) => {
  const template = await itemService.getItemById(req.params.itemId);
  res.status(httpStatus.CREATED).send(template);
});

const getItems = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await itemService.queryItems(filter, options);
  res.send(result);
});

const addItem = catchAsync(async (req, res) => {
  const task = await itemService.createItem(req.body);
  res.status(httpStatus.CREATED).send(task);
});

const updateItem = catchAsync(async (req, res) => {
  const task = await itemService.updateItemById(req.params.itemId, req.body);
  res.send(task);
});

const deleteItem = catchAsync(async (req, res) => {
  await itemService.deleteItemById(req.params.itemId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  defaultRequest,
  getItemById,
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
