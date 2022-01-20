const genericCrud = require('./generic.controller');
const { Category } = require('../model');

const relations = {
  getAll: 'transactions',
  get: 'transactions',
};

module.exports = {
  ...genericCrud(Category, relations),
};
