const Transaction = require('../model/Transaction');
const Category = require('../model/Category');
const moment = require('moment');
const mongoose = require('mongoose');

exports.getPieChart = async (req, res) => {
  try {
    let transactions = [];
    const fromDate = req.params.fromDate;
    const toDate = req.params.toDate;
    if (fromDate != undefined && toDate != undefined) {
      transactions = await Transaction.find({
        user: { $eq: req.headers.userid },
      }).find({ date: { $gte: fromDate, $lte: toDate } });
    } else {
      transactions = await Transaction.find({
        user: { $eq: req.headers.userid },
      });
    }
    const filtered = [];
    for (var i = 0; i < transactions.length; i++) {
      if (filtered.find((item) => item.id == transactions[i].category)) {
        filtered.find((item) => item.id == transactions[i].category).sum =
          Number(
            filtered.find((item) => item.id == transactions[i].category).sum,
          ) + Number(transactions[i].price);
      } else {
        selectedCategory = await Category.find({
          user: { $eq: req.headers.userid },
        }).find({
          _id: { $eq: mongoose.Types.ObjectId(transactions[i].category) },
        });
        filtered.push({
          id: String(transactions[i].category),
          sum: Number(transactions[i].price),
          name: String(selectedCategory[0].title),
        });
      }
    }
    res.status(200).send(filtered.reverse());
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err);
  }
};

exports.getLineChart = async (req, res) => {
  try {
    let transactions = [];
    if (req.params.fromDate != undefined) {
      const fromDate = req.params.fromDate;
      const toDate = req.params.toDate;
      transactions = await Transaction.find({
        user: { $eq: req.headers.userid },
      }).find({ date: { $gte: fromDate, $lte: toDate } }).sort({ date : 1 });
    } else {
      transactions = await Transaction.find({
        user: { $eq: req.headers.userid },
      }).sort({date : 1});
    }

    const filtered = [];
    for (var i = 0; i < transactions.length; i++) {
      if (
        filtered.find(
          (item) => item.x == moment(transactions[i].date).format('YYYY.MM.DD'),
        )
      ) {
        filtered.find(
          (item) => item.x == moment(transactions[i].date).format('YYYY.MM.DD'),
        ).y =
          Number(
            filtered.find(
              (item) =>
                item.x == moment(transactions[i].date).format('YYYY.MM.DD'),
            ).y,
          ) + Number(transactions[i].price);
      } else {
        filtered.push({
          x: moment(transactions[i].date).format('YYYY.MM.DD'),
          y: Number(transactions[i].price),
        });
      }
    }
    res.status(200).send(filtered);
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err);
  }
};
