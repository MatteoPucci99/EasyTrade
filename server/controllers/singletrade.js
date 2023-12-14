import SingleTrade from "../models/singleTradeModel.js";
import mongoose from "mongoose";

export const createSingleTrade = async (req, res) => {
  const { strategyId, type, result, risk, reward, date, pair } = req.body;
  const newTrade = new SingleTrade({
    strategyId,
    type,
    result,
    risk,
    reward,
    date,
    pair,
  });

  try {
    await newTrade.save();
    res.status(201).json(newTrade);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllTradesForStrategy = async (req, res) => {
  const { strategyId } = req.params;

  try {
    const trades = await SingleTrade.find({ strategyId });

    res.status(200).json(trades);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Errore del server", error: error.message });
  }
};

export const getTrades = async (req, res) => {
  try {
    const trades = await SingleTrade.find();

    res.status(200).json(trades);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateSingleTrade = async (req, res) => {
  const { id: _id } = req.params;
  const trade = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Id trade non valido");

  const updatedTrade = await SingleTrade.findByIdAndUpdate(_id, trade, {
    new: true,
  });

  if (!updatedTrade) {
    return res.status(404).json({ message: "Trade non trovato" });
  }

  res.json(updatedTrade);
};

export const deleteSingleTrade = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Id trade non valido");

  await SingleTrade.findByIdAndDelete(_id);

  res.json({ message: "Trade eliminato con successo" });
};
