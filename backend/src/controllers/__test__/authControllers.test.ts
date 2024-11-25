import request from "supertest";
import bcryptjs from "bcryptjs";
import db from "../../db.js";
import { app, server } from "../../index.js";
import { generateTestToken } from "../tokenController.js";

jest.mock("../../db");
jest.mock("bcryptjs");

afterAll(async () => {
  server.close();
});

describe("POST /signup", () => {
  it("should return an error if required fields are missing", async () => {
    const response = await request(app).post("/api/auth/signup").send({
      name: "John Doe",
      email: "john@example.com",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Please fill in all fields");
  });

  it("should return an error if email already exists", async () => {
    (db.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: 1, email: "john@example.com", name: "John Doe" }],
    });

    const response = await request(app).post("/api/auth/signup").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Email already exists");
  });

  it("should create a new user when all fields are valid", async () => {
    (db.query as jest.Mock).mockResolvedValueOnce({
      rows: [],
    });
    (db.query as jest.Mock).mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          name: "John Doe",
          mail: "john@exampaale.com",
          password: "hashed_password",
        },
      ],
    });

    const response = await request(app).post("/api/auth/signup").send({
      name: "John Doe",
      email: "john@exampaale.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.mail).toBe("john@exampaale.com");
  });

  it("should return 500 if an error occurs", async () => {
    (db.query as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).post("/api/auth/signup").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Internal Server Error");
  });
});

describe("POST /login", () => {
  it("should return an error if credentials are invalid (email not found)", async () => {
    (db.query as jest.Mock).mockResolvedValueOnce({
      rows: [],
    });

    const response = await request(app).post("/api/auth/login").send({
      email: "nonexistent@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid credentials");
  });

  it("should return an error if password is incorrect", async () => {
    (db.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: 1, email: "john@example.com", password: "hashed_password" }],
    });

    (bcryptjs.compare as jest.Mock).mockResolvedValueOnce(false);

    const response = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid credentials");
  });

  it("should return a user object and token if credentials are correct", async () => {
    (db.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: 1, email: "john@example.com", password: "hashed_password" }],
    });

    (bcryptjs.compare as jest.Mock).mockResolvedValueOnce(true);

    const response = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body.email).toBe("john@example.com");
  });

  it("should return 500 if an error occurs", async () => {
    (db.query as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Internal Server Error");
  });
});

describe("POST /logout", () => {
  it("should return a success message when logged out successfully", async () => {
    const response = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", "Bearer some_valid_token");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Logged out successfully");
  });
});

describe("GET /profile", () => {
  it("should return user info when a valid token is provided", async () => {
    const userId = "1";
    const token = generateTestToken(userId);

    (db.query as jest.Mock).mockResolvedValue({
      rows: [{ id: userId, name: "John Doe", email: "john@example.com" }],
    });

    const response = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", userId);
    expect(response.body).toHaveProperty("name", "John Doe");
    expect(response.body).toHaveProperty("email", "john@example.com");
  });

  it("should return 404 if user not found in the database", async () => {
    const token = generateTestToken("999");

    (db.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    const response = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("User not found");
  });

  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/api/auth/profile");

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Unauthorized - No token provided");
  });

  it("should return 401 if the token is invalid", async () => {
    const invalidToken = "invalid_token";

    const response = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Unauthorized - Invalid Token");
  });

  it("should return 500 if an error occurs in the controller", async () => {
    const token = generateTestToken("1");

    (db.query as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Internal Server Error");
  });
});
