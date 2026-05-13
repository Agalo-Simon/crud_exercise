import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import fileCheck from "./fileCheck.js";


export default async function updateData(info) {
  fileCheck();
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",  
        name: "id",
        message: "Enter the id of the item you want to update:",
      }]);

      let item;
      info.forEach((element) => {
        if (element.id === answers.id) {
          item = element;
          updateDetails(item, info);
        }
        });
  } catch (error) {
    console.log("Something went wrong", error);  
  }
}

async function updateDetails(item, info) {
    try {
        const feedback = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                default: item.name, 
                message: "Enter the new name:",
            },
            {
                type: "input",
                name: "price",
                default: item.price,
                message: "Enter the new price:",
            },
            {
                type: "input",
                name: "quantity",   
                default: item.quantity,
                message: "Enter the new quantity:",
            },
        ]);
        item.name = feedback.name;
        item.price = parseFloat(feedback.price);
        item.quantity = parseInt(feedback.quantity);

        await fs.writeFile("data.json", JSON.stringify(info), (err) => {
            if (err) {
                console.error("Error occurred while updating data.json:", err);
                return;
            }   
            console.log("Item updated successfully.");
        });

    } catch (error) {
        console.log("Something went wrong", error);
        
    }
}

queryDB(updateData);
