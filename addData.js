import inquirer from "inquirer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";

export default async function addData(info) {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the item:",
      },
      {
        type: "number",
        name: "price",
        message: "Enter the price of the item:",
      },
      {
        type: "number",
        name: "quantity",
        message: "Enter the quantity of the item:",
      },
    ]);
    const data = {
      id: uuidv4(),
      name: answers.name,
      price: parseFloat(answers.price),
      quantity: parseInt(answers.quantity),
    };
    info.push(data);

    if (fs.existsSync("data.json")) {
      addDetails(info);
    } else {
      fs.appendFile("data.json", "[]", (err) => {
        if (err) {
          console.error("Create file unsuccessfully:");
        }
        console.log("data.json created successfully.");
        addDetails(info);
      });
    }
  } catch (err) {
    console.error("Something went wrong:", err);
  }
}

async function addDetails(info) {
  await fs.writeFile("data.json", JSON.stringify(info), (err) => {
    if (err) {
      console.error("Error writing to data.json:", err);
      return;
    }
    console.log("Item added successfully.");
});   
}

queryDB(addData);