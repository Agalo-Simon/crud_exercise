import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const FILE = "data.json";

const read = async () => JSON.parse(await fs.readFile(FILE, "utf-8"));
const write = async (data) => await fs.writeFile(FILE, JSON.stringify(data, null, 2));

export const getItems = async () => await read();

export const addItem = async (data) => {
  const items = await read();
  const newItem = {
    id: uuidv4(),
    name: data.name,
    price: data.price,
    quantity: data.quantity,
  };

  items.push(newItem);
  await write(items);

  return newItem;
};

export const updateItem = async (id, data) => {
  const items = await read();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...data };
  await write(items);
  return items[index];
};

export const deleteItem = async (id) => {
  const items = await read();
  const filtered = items.filter((item) => item.id !== id);
  if (items.length === filtered.length) return false;
  await write(filtered);
  return true;
};
