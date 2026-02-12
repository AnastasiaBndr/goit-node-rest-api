import { error } from "console";
import sequelize from "./sequelize.js";

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");
  } catch (err) {
    console.log("Failed connect to database", err.message);
    process.exit(1);
  }
};

export default connectDatabase;
