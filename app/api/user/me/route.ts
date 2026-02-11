import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function GET(req: Request) {

  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { message: "No token" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };

    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id=$1",
      [decoded.id]
    );

    return NextResponse.json(result.rows[0]);

  } catch {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }
}
