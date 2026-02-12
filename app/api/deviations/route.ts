import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status");
  const owner = searchParams.get("owner");
  const search = searchParams.get("search");

  let query = "SELECT * FROM deviations WHERE 1=1";
  const values: any[] = [];

  if (status && status !== "All") {
    values.push(status);
    query += ` AND status = $${values.length}`;
  }

  if (owner && owner !== "All") {
    values.push(owner);
    query += ` AND owner = $${values.length}`;
  }

  if (search) {
    values.push(`%${search}%`);
    query += ` AND title ILIKE $${values.length}`;
  }

  query += " ORDER BY created_at DESC";

  const result = await pool.query(query, values);
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, owner, due_date } = body;

  const result = await pool.query(
    `INSERT INTO deviations (title, description, owner, due_date)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [title, description, owner, due_date]
  );

  return NextResponse.json(result.rows[0]);
}