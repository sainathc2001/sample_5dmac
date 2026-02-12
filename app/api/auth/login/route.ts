import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Find user
    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // 2. Check password
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 3. Sign token WITH identity
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // 4. Return token
    return NextResponse.json({ token });

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Login failed" },
      { status: 500 }
    );
  }
}
