import { NextResponse } from "next/server";
import pool from "@/lib/db";

/* GET ALL */
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM documents ORDER BY id DESC"
    );
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("GET ERROR:", err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

/* CREATE */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, version, status, owner, effective_date } = body;

    if (!title || !version || !status || !owner || !effective_date) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO documents
       (title, version, status, owner, effective_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, version, status, owner, effective_date]
    );

    return NextResponse.json(result.rows[0], { status: 201 });

  } catch (err) {
    console.error("POST ERROR:", err);
    return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  }
}

/* UPDATE */
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, version, status, owner, effective_date } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Document ID required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `UPDATE documents
       SET title=$1, version=$2, status=$3, owner=$4, effective_date=$5
       WHERE id=$6
       RETURNING *`,
      [title, version, status, owner, effective_date, id]
    );

    return NextResponse.json(result.rows[0]);

  } catch (err) {
    console.error("PUT ERROR:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
