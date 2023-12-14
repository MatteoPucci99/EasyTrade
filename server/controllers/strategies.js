import mongoose from "mongoose";
import Strategy from "../models/strategyModel.js";

export const getStrategies = async (req, res) => {
  try {
    const postStrategy = await Strategy.find();

    res.status(200).json(postStrategy);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createStrategy = async (req, res) => {
  const strategy = req.body;
  const newStrategy = new Strategy(strategy);

  try {
    await newStrategy.save();
    res.status(201).json(newStrategy);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getStrategyById = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("Id strategia non valido");

    const strategy = await Strategy.findById(_id);

    if (!strategy)
      return res.status(404).json({ message: "Strategia non trovata" });

    res.status(200).json(strategy);
  } catch (error) {
    res.status(500).json({ message: "Errore nel server" });
  }
};

export const updateStrategy = async (req, res) => {
  const { id: _id } = req.params;
  const strategy = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Id strategia non valido");

  const updatedStrategy = await Strategy.findByIdAndUpdate(_id, strategy, {
    new: true,
  });
  res.json(updatedStrategy);
};

export const deleteStrategy = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Id strategia non valido");

  await Strategy.findByIdAndDelete(_id);
  res.json({ message: "Strategia rimossa con successo" });
};
