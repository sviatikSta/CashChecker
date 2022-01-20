const genericCrud = require('./generic.controller');
const { Transaction } = require('../model');

const relations = {
  getAll: 'category',
  get: 'category',
};

module.exports = {
  ...genericCrud(Transaction, relations),
};
