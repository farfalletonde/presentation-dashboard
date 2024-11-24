import { Request, Response } from "express";
import db from "../db.js";

export const getPresentationsController = async (
  req: Request,
  res: Response
) => {
  try {
    let sortQuery: string;

    switch (req.query["sortBy"]) {
      case "TITLE_A_Z":
        sortQuery = "ORDER BY name ASC";
        break;
      case "TITLE_Z_A":
        sortQuery = "ORDER BY name DESC";
        break;
      case "RECENTLY_MODIFIED":
        sortQuery = "ORDER BY last_updated DESC";
        break;
      case "OLDEST_MODIFIED":
        sortQuery = "ORDER BY last_updated ASC";
        break;
      default:
        sortQuery = "ORDER BY last_updated DESC";
    }

    const { rows } = await db.query(
      "SELECT p.id, p.name, p.image, p.last_updated, u.name AS created_by FROM presentations p JOIN users u ON u.id = p.user_id WHERE p.user_id = $1 " +
        sortQuery,
      [req.user]
    );

    const presentations = rows.map(
      ({ id, name, image, last_updated, created_by }) => ({
        id,
        name,
        image,
        created_by,
        last_updated,
      })
    );

    res.status(200).json(presentations);
  } catch (error: any) {
    console.log("Error in getPresentations controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createPresentationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, image } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const { rows } = await db.query(
      "INSERT INTO presentations (name, user_id, image) VALUES ($1, $2, $3) RETURNING *",
      [name, req.user, image]
    );

    const createResult = rows[0];

    res.status(201).json(createResult);
  } catch (error: any) {
    console.log("Error in createPresentation controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePresentationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id, name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const { rows } = await db.query(
      "UPDATE presentations SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: "Presentation not found" });
    }

    const updateResult = rows[0];

    res.status(200).json(updateResult);
  } catch (error: any) {
    console.log("Error in updatePresentation controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePresentationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.body;

    const result = await db.query(
      "DELETE FROM presentations WHERE id = $1 RETURNING *",
      [id]
    );

    // Check if any rows were deleted
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Presentation not found for this user" });
      return;
    }

    res.status(200).json({
      message: "Presentation deleted successfully",
    });
  } catch (error: any) {
    console.log("Error in deletePresentation controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
