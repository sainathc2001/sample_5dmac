import { NextResponse } from "next/server";
import pool from "@/lib/db";

/* GET ALL */
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM documents ORDER BY document_id DESC"
    );
    return NextResponse.json(result.rows);
  } catch (err) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

/* CREATE */
export async function POST(req: Request) {
  const body = await req.json();

  const { title, version, status, owner, effective_date } = body;

  try {
    const result = await pool.query(
      `INSERT INTO documents
       (title,version,status,owner,effective_date)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [title, version, status, owner, effective_date]
    );

    return NextResponse.json(result.rows[0]);
  } catch {
    return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  }
}

/* UPDATE */
export async function PUT(req: Request) {
  const body = await req.json();

  const { document_id, title, version, status, owner, effective_date } = body;

  try {
    await pool.query(
      `UPDATE documents
       SET title=$1, version=$2, status=$3, owner=$4, effective_date=$5
       WHERE document_id=$6`,
      [title, version, status, owner, effective_date, document_id]
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
