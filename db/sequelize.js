import { Sequelize } from "sequelize";
import "dotenv/config";

const {
  DATABASE_DIALECT,
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
} = process.env;

const sequelize = new Sequelize({
  dialect: DATABASE_DIALECT,
  host: DATABASE_HOST,
  username: DATABASE_USERNAME,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;
