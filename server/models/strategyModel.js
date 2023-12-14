import mongoose from "mongoose";

const strategySchema = mongoose.Schema({
  params: {
    name: String,
    risk: String,
    pair: [String],
  },
  targets: {
    month: {
      profit: String,
      dd: String,
    },
    quarter: {
      profit: String,
      dd: String,
    },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Strategy = mongoose.model("Strategy", strategySchema);

export default Strategy;
