import fs from "fs";
import { exit } from "process";

export default async function checkFile(){
  if (!fs.existsSync("data.json")) {
    console.log("file does not exists");
    exit(1);
  }
};
