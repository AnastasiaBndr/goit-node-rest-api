import request from "supertest";
import User from "../db/models/User";

import app from "../server";
import { Sequelize } from "sequelize";
import "dotenv/config";


const testSequalize = new Sequelize({
  dialect: process.env.TEST_DATABASE_DIALECT,
  host: process.env.TEST_DATABASE_HOST,
  username: process.env.TEST_DATABASE_USERNAME,
  database: process.env.TEST_DATABASE_NAME,
  password: process.env.TEST_DATABASE_PASSWORD,
  port: process.env.TEST_DATABASE_PORT,
  dialectOptions: {
    ssl: true,
  },
});

describe("tests login controller", () => {
  let server = null;

  beforeAll(async () => {
    const port = Number(process.env.PORT) || 3000;
    try {
      await testSequalize.authenticate();
      console.log("Database connection successful");
    } catch (err) {
      console.log("Failed connect to database", err.message);
      process.exit(1);
    }
    server = app.listen(port, () =>
      console.log(`Server is running. Use our API on port: ${port}`)
    );
  });

  afterAll(async () => {
    server.close();
    await testSequalize.truncate({ cascade: true });
  });

  afterEach(async () => {
    await User.destroy({ where: {} });
  });

  test("test login with correct credentials", async () => {
    const registerData = { email: "test@gmail.com", password: "pswrd" };
    const loginData = { email: "test@gmail.com", password: "pswrd" };

    await request(app).post("/api/auth/register").send(registerData);
    const { status, body } = await request(app)
      .post("/api/auth/login")
      .send(loginData);

    expect(status).toBe(200);
    expect(body.user.email).toBe(registerData.email);
    expect(body.user.subscription).toBe("starter");
    expect(body).toHaveProperty("token");

    const dbUser = await User.findOne({ where: { email: registerData.email } });
    expect(dbUser.email).toBe(registerData.email);
    
  });

  test("test login with wrong credentials", async () => {
    const registerData = { email: "test@gmail.com", password: "pswrd" };
    const loginData = { email: "test4@gmail.com", password: "pswrd" };

    await request(app).post("/api/auth/register").send(registerData);
    const { status } = await request(app)
      .post("/api/auth/login")
      .send(loginData);

    expect(status).toBe(401);
  });

  
});
