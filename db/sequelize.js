import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "dpg-d66rb94r85hc739ssaog-a.frankfurt-postgres.render.com",
  username: "db_contacts_ctxf_user",
  database: "db_contacts_ctxf",
  password: "nF7BIbgAxCJKM75t7UxtdJLM6XFzzbXg",
  port: 5432,
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;
