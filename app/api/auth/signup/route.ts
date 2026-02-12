import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    // check existing user
    const userCheck = await pool.query(
      "SELECT id FROM users WHERE email=$1",
      [email]
    );

    if (userCheck.rows.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name,email,password) VALUES ($1,$2,$3)",
      [name, email, hashedPassword]
    );

    return NextResponse.json({ message: "Signup successful" });

  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Signup failed" },
      { status: 500 }
    );
  }
}
