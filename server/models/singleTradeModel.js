import mongoose from "mongoose";

const singleTradeSchema = mongoose.Schema({
  strategyId: String,
  pair: String,
  type: {
    type: String,
    enum: ["Compra", "Vendi"],
  },

  result: {
    type: String,
    enum: ["Take Profit", "Stop Loss", "Break Even"],
  },
  risk: String,
  reward: String,
  date: String,
});

const SingleTrade = mongoose.model("SingleTrade", singleTradeSchema);

export default SingleTrade;
