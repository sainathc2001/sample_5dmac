"use client";

import { useState } from "react";
import { DocumentType } from "@/app/page";
import { Search } from "lucide-react";


interface Props {
  search: string;
  onSearch: (v: string) => void;
  filter: "All" | DocumentType["status"];
  onFilter: (v: "All" | DocumentType["status"]) => void;
  onCreate: (doc: DocumentType) => void;
}

export default function Toolbar({
  search,
  onSearch,
  filter,
  onFilter,
  onCreate,
}: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const createDoc = () => {
    if (!title.trim()) return;

    onCreate({
      id: `DOC-${Math.floor(Math.random() * 100000)}`,
      title,
      version: "1.0",
      status: "Draft",
      owner: "John Doe",
      date: new Date().toLocaleDateString(),
    });

    setTitle("");
    setOpen(false);
  };

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-sm flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium"
          >
            + Create Document
          </button>
          {/* <div className="bg-black-500 border" > */}
          <div className="flex items-center gap-1 text-sm w-180">
          <span className="text-slate-600 text-left">Filter:</span>

          <select
            value={filter}
            onChange={(e) => onFilter(e.target.value as any)}
            className="
              appearance-none
              bg-transparent
              pr-6
              text-blue-700
              font-medium
              cursor-pointer
              focus:outline-none
            "
          >
            <option value="All">All</option>
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
            <option value="Approved">Approved</option>
          </select>

          <svg
            className="w-4 h-4 text-blue-700 -ml-5 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* </div> */}

        <div className="relative w-64">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by ID or Title"
            className="border rounded-md pl-9 pr-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      </div>

      {/* Create Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-semibold mb-4">Create Document</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document Title"
              className="border w-full px-3 py-2 mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={createDoc}
                className="px-4 py-2 bg-blue-700 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
