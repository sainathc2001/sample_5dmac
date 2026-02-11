"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import Toolbar from "@/components/Toolbar";
import DocumentsTable from "@/components/DocumentsTable";
import Pagination from "@/components/Pagination";
import DocumentFormModal from "@/components/DocumentFormModal";

export interface DocumentType {
  id: string;
  title: string;
  version: string;
  status: "Draft" | "Submitted" | "Approved";
  owner: string;
  date: string;
}

const ITEMS_PER_PAGE = 5;

const initialDocs: DocumentType[] = [
  {
    id: "SOP-000001",
    title: "Manufacturing SOP",
    version: "1.0",
    status: "Draft",
    owner: "Alice Smith",
    date: "04/20/2024",
  },
  {
    id: "FORM-00001",
    title: "Annual Report",
    version: "1.1",
    status: "Submitted",
    owner: "Rani",
    date: "03/26/2024",
  },
  {
    id: "SOP-000111",
    title: "Deviation Report",
    version: "1.0",
    status: "Draft",
    owner: "Raja",
    date: "04/20/2025",
  },
  {
    id: "FORM-00111",
    title: "Validation Report",
    version: "1.1",
    status: "Approved",
    owner: "Sainath",
    date: "03/26/2024",
  },
  {
    id: "SOP-011111",
    title: "Training Report",
    version: "1.0",
    status: "Submitted",
    owner: "Raja",
    date: "04/20/2025",
  },
  {
    id: "FORM-11111",
    title: "Audit Report",
    version: "1.1",
    status: "Approved",
    owner: "Sainath",
    date: "03/26/2024",
  },
];

export default function Page() {
  const [documents, setDocuments] = useState<DocumentType[]>(initialDocs);
  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<"All" | DocumentType["status"]>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<DocumentType | null>(null);

  // 🔹 FILTER + SEARCH
  const filteredDocs = documents.filter((d) => {
    const matchesFilter = filter === "All" || d.status === filter;
    const matchesSearch =
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // 🔹 RESET PAGE ON FILTER / SEARCH
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  // 🔹 PAGINATION SLICE
  const paginatedDocs = filteredDocs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const saveDocument = (doc: DocumentType) => {
    setDocuments((prev) => {
      const exists = prev.find((d) => d.id === doc.id);
      return exists
        ? prev.map((d) => (d.id === doc.id ? doc : d))
        : [doc, ...prev];
    });
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
