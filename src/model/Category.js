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
  transactions: [
    {
      type: ObjectId,
      ref: "Transaction",
    },
  ],
  user: {
    type: ObjectId,
    ref: "User",
  }
});

module.exports = model("Category", schema);
