const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require("mongoose");

const schema = new Schema({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: ObjectId,
    ref: "Category",
  },
  date:{
    type: Date,
    default: "",
  },
  user: {
    type: ObjectId,
    ref: "Category",
  }
});

module.exports = model("Transaction", schema);
