const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  used: { type: Number, default: 0 }
});

module.exports = mongoose.model("Budget", BudgetSchema);
export default Budget;
