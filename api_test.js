// import { getUserVideos } from "./src/api/user"
const { getUserVideos } = require("./src/api/user");

async function main() {
  const a = await getUserVideos();
  console.log(a);
}

main();