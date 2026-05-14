import express from "express";
import { getAllItems, createItem, updateItem, removeItem } from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getAllItems);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", removeItem);

export default router;