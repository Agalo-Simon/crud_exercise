import queryDB from "./queryDB.js";

export default async function retrieveData() {
  await queryDB();
}
queryDB();