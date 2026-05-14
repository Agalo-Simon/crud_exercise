import * as ItemModel from "../models/itemModel.js";

export const getAllItems = async (req, res) => {
  const items = await ItemModel.getItems();
  res.json(items);
};

export const createItem = async (req, res) => {
  const newItem = await ItemModel.addItem(req.body);
  res.status(201).json(newItem);
};

export const updateItem = async (req, res) => {
  const updated = await ItemModel.updateItem(req.params.id, req.body);
  updated ? res.json(updated) : res.status(404).json({ msg: "Not Found" });
};

export const removeItem = async (req, res) => {
  const success = await ItemModel.deleteItem(req.params.id);
  success ? res.json({ msg: "Deleted" }) : res.status(404).json({ msg: "Not Found" });
};