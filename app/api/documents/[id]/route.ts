import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const document_id = Number(params.id);
    if (!document_id) {
      return NextResponse.json({ error: "Document ID required" }, { status: 400 });
    }

    const result = await pool.query(
      "DELETE FROM documents WHERE document_id = $1 RETURNING *",
      [document_id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Document deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
