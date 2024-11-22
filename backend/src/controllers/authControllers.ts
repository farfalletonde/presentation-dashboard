import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import db from "../db.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Please fill in all fields" });
      return;
    }

    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (rows.length > 0) {
      res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const signUpResults = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    const newUser = signUpResults.rows[0];
    if (newUser) {
      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        mail: newUser.mail,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
