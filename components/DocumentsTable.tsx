"use client";

import { useRouter } from "next/navigation";
import { DocumentType } from "@/app/page";
import StatusPill from "./StatusPill";

export default function DocumentsTable({
  data,
  onEdit,
  onDelete,
}: {
  data: DocumentType[];
  onEdit: (doc: DocumentType) => void;
  onDelete?: (id: number) => void;
}) {
  const router = useRouter();
  

  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            {[
              "Document ID",
              "Title",
              "Version",
              "Status",
              "Owner",
              "Effective Date",
              "Actions",
            ].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((doc) => (
            <tr
              key={doc.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="px-4 py-3">{doc.id}</td>
              <td className="px-4 py-3">{doc.title}</td>
              <td className="px-4 py-3">{doc.version}</td>
              <td className="px-4 py-3">
                <StatusPill status={doc.status} />
              </td>
              <td className="px-4 py-3">{doc.owner}</td>
              <td className="px-4 py-3">{doc.effective_date}</td>

              {/* ACTIONS */}
              <td className="px-4 py-3 flex gap-2">
                {/* VIEW */}
                <button
                  onClick={() => router.push(`/documents/${doc.id}`)}
                  className="border px-2 py-1 rounded hover:bg-slate-100"
                  title="View"
                >
                  👁
                </button>

                {/* EDIT */}
                <button
                  onClick={() => onEdit(doc)}
                  className="border px-2 py-1 rounded hover:bg-slate-100"
                  title="Edit"
                >
                  ✏️
                </button>
                {/* <button
                    onClick={() => onDelete && onDelete(doc.id)}
                    className="border px-2 py-1 rounded hover:bg-red-100 text-red-600"
                    title="Delete"
                  >
                    🗑️
                  </button> */}
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="text-center py-6 text-slate-500"
              >
                No documents found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
