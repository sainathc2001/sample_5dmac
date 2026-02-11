"use client";

import { DocumentType } from "@/app/page";
import { Search } from "lucide-react";

interface Props {
  search: string;
  onSearch: (v: string) => void;
  filter: "All" | DocumentType["status"];
  onFilter: (v: "All" | DocumentType["status"]) => void;
  onCreate: () => void;
}

export default function Toolbar({
  search,
  onSearch,
  filter,
  onFilter,
  onCreate,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm flex justify-between items-center mb-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onCreate}
          className="bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium"
        >
          + Create Document
        </button>

        <div className="flex items-center gap-1 text-sm">
          <span className="text-slate-600">Filter:</span>

          <select
            value={filter}
            onChange={(e) => onFilter(e.target.value as any)}
            className="bg-transparent text-blue-700 font-medium focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
      </div>

      <div className="relative w-64">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by title"
          className="border rounded-md pl-9 pr-3 py-2 text-sm w-full"
        />
      </div>
    </div>
  );
}