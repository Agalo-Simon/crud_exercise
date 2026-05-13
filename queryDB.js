import fs from "fs";

export default async function queryDB(externalFunction) {
  try {
    let info = [];
    if (fs.existsSync("data.json")) {
      await fs.readFile("data.json", (err, data) => {
        if (err) {
          console.error("Reading file failed", err);
          return;
        }
        info = JSON.parse(data.toString());
        console.log(info);
        
        if (externalFunction && !err) {
          externalFunction(info);
          return;
        }
      });       
    } else {
        if (externalFunction) {
          externalFunction(info);
          return;
        }
    }
  } catch (err) {
    console.error("something went wrong:", err);
  }
}

