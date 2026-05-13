import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import fileCheck from "./fileCheck.js";

export default async function removeData(info) {
  fileCheck();
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",  
        name: "id",
        message: "Enter the id of the item you want to remove:",
      }]);
        let removeData =[];
        info.forEach((element) => {
          if (element.id !== answers.id) {
            removeData.push(element);
          }
        });
        await fs.writeFile("data.json", JSON.stringify(removeData), (err) => {
          if (err) {
            console.error("Error occurred while updating data:", err);
            return;
          } else {
            console.log("Item removed successfully.");
          } 
        });
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

queryDB(removeData);
