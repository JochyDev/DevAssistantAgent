import { starCLI } from "./chat/cli.js";


starCLI().catch((error: Error) => {
  console.log(" Error: ", error.message);
  process.exit(1);
})