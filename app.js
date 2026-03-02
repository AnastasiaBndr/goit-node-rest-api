import "./config/configPassport.js";
import "dotenv/config";

import connectDatabase from "./db/connectionDatabase.js";
import app from "./server.js";

const PORT = process.env.PORT || 3000;

await connectDatabase();

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
