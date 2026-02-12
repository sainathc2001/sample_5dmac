"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import Toolbar from "@/components/Toolbar";
import DocumentsTable from "@/components/DocumentsTable";
import Pagination from "@/components/Pagination";
import DocumentFormModal from "@/components/DocumentFormModal";

export interface DocumentType {
  id: number;
  title: string;
  version: string;
  status: "Draft" | "Submitted" | "Approved";
  owner: string;
  effective_date: string;
}

const ITEMS_PER_PAGE = 5;

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.replace("/login");
  }, [router]);

  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | DocumentType["status"]>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<DocumentType | null>(null);

  // Single fetchDocuments - called on mount and after mutations
  useEffect(() => {
    fetchDocuments();
  }, []);

const fetchDocuments = async () => {
  try {
    const res = await fetch("/api/documents");
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    const formatted = data.map((d: any) => ({
      id: d.id,
      title: d.title,
      version: d.version,
      status: d.status,
      owner: d.owner,
      effective_date: d.effective_date,
    }));

    setDocuments(formatted);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

  const createDocument = async (title: string) => {
    await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        version: "1.0",
        status: "Draft",
        owner: "John Doe",
        effective_date: new Date()
          .toISOString()
          .split("T")[0],
      }),
    });

    fetchDocuments();
  };

  // Filtering, search, pagination
  const filteredDocs = documents.filter((d) => {
    const matchesFilter = filter === "All" || d.status === filter;
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const paginatedDocs = filteredDocs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Single save handler for create/update
const saveDocument = async (
  doc: Omit<DocumentType, "id"> & { id?: number }
) => {
  try {
    const method = editing ? "PUT" : "POST";

    const body = editing
      ? {
          id: editing.id,
          ...doc,
        }
      : doc;

    const res = await fetch("/api/documents", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Save failed");

    setOpen(false);
    setEditing(null);
    fetchDocuments();
  } catch (error) {
    console.error("Save error:", error);
  }
};

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6">
          <PageTitle title="Documents" />

          <Toolbar
            search={search}
            onSearch={setSearch}
            filter={filter}
            onFilter={setFilter}
            onCreate={() => {
              setEditing(null);
              setOpen(true);
            }}
          />

          <DocumentsTable
            data={paginatedDocs}
            onEdit={(doc) => {
              setEditing(doc);
              setOpen(true);
            }}
          />

          <Pagination
            totalItems={filteredDocs.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>

      <DocumentFormModal
        open={open}
        initialData={editing}
        onClose={() => setOpen(false)}
        onSave={saveDocument}
      />
    </div>
  );
}
