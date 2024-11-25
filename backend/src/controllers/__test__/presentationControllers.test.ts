import request from "supertest";
import { app, server } from "../../index.js";
import db from "../../db.js";
import { generateTestToken } from "../tokenController.js";

jest.mock("../../db");
afterAll(async () => {
  server.close();
});

beforeEach(() => {
  (db.query as jest.Mock).mockResolvedValueOnce({
    //mock authentication
    rows: [{ id: "1", name: "John Doe", email: "john@example.com" }],
  });
});

describe("GET /api/presentation", () => {
  it("should return presentations for the logged-in user with sorting", async () => {
    const userId = "1";
    const token = generateTestToken(userId);

    (db.query as jest.Mock).mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          name: "Presentation 1",
          image: "image1.png",
          last_updated: "2023-11-25",
          created_by: "John Doe",
        },
      ],
    });

    const response = await request(app)
      .get("/api/presentation")
      .set("Authorization", `Bearer ${token}`)
      .query({ sortBy: "TITLE_A_Z" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        name: "Presentation 1",
        image: "image1.png",
        last_updated: "2023-11-25",
        created_by: "John Doe",
      },
    ]);
  });

  it("should return 500 if there is a database error", async () => {
    const userId = "1";
    const token = generateTestToken(userId);

    (db.query as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app)
      .get("/api/presentation")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Internal Server Error");
  });
});

describe("POST /api/presentation/create", () => {
  it("should create a new presentation for the logged-in user", async () => {
    const userId = "1";
    const token = generateTestToken(userId);

    const newPresentation = {
      name: "New Presentation",
      image: "new_image.png",
    };

    (db.query as jest.Mock).mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          name: newPresentation.name,
          image: newPresentation.image,
          user_id: userId,
        },
      ],
    });

    const response = await request(app)
      .post("/api/presentation/create")
      .set("Authorization", `Bearer ${token}`)
      .send(newPresentation);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("name", newPresentation.name);
  });

  it("should return 400 if name is missing", async () => {
    const userId = "1";
    const token = generateTestToken(userId);

    const response = await request(app)
      .post("/api/presentation/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ image: "image.png" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Name is required");
  });

  it("should return 500 if there is a database error", async () => {
    const userId = "1";
    const token = generateTestToken(userId);

    (db.query as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app)
      .post("/api/presentation/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "New Presentation", image: "image.png" });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Internal Server Error");
  });
});

describe("PUT /api/presentation", () => {
  it("should update a presentation", async () => {
    const userId = "1";
    const token = generateTestToken(userId);

    const updatedPresentation = { id: 1, name: "Updated Presentation" };

    (db.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: updatedPresentation.id, name: updatedPresentation.name }],
    });

    const response = await request(app)
      .put("/api/presentation/update")
      .set("Authorization", `Bearer ${token}`)
      .send(updatedPresentation);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", updatedPresentation.id);
    expect(response.body).toHaveProperty("name", updatedPresentation.name);
  });

  it("should return 400 if name is missing", async () => {
    const userId = "1";
    const token = generateTestToken(userId);

    const response = await request(app)
      .put("/api/presentation/update")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: 1 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Name is required");
  });

  it("should return 404 if the presentation is not found", async () => {
    const userId = "1";
    const token = generateTestToken(userId);

    (db.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    const response = await request(app)
      .put("/api/presentation/update")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: 999, name: "Non-existent Presentation" });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Presentation not found");
  });

  it("should return 500 if there is a database error", async () => {
    const userId = "1";
    const token = generateTestToken(userId);

    (db.query as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app)
      .put("/api/presentation/update")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: 1, name: "Updated Presentation" });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Internal Server Error");
  });
});

describe("DELETE /api/presentation/delete", () => {
  it("should delete a presentation", async () => {
    const userId = "1";
    const token = generateTestToken(userId);
    const presentationId = 1;

    (db.query as jest.Mock).mockResolvedValueOnce({
      rowCount: 1,
    });

    const response = await request(app)
      .post("/api/presentation/delete")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: presentationId });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Presentation deleted successfully");
  });

  it("should return 404 if the presentation is not found", async () => {
    const userId = "1";
    const token = generateTestToken(userId);

    (db.query as jest.Mock).mockResolvedValueOnce({
      rowCount: 0,
    });

    const response = await request(app)
      .post("/api/presentation/delete")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: 999 });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Presentation not found for this user");
  });

  it("should return 500 if there is a database error", async () => {
    const userId = "1";
    const token = generateTestToken(userId);

    (db.query as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app)
      .post("/api/presentation/delete")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: 1 });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Internal Server Error");
  });
});
