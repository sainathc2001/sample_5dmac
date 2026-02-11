"use client";

import { useState, useEffect } from "react";
import { DocumentType } from "@/app/page";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (doc: DocumentType) => void;
  initialData?: DocumentType | null;
}

export default function DocumentFormModal({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [form, setForm] = useState<DocumentType>({
    id: "",
    title: "",
    version: "",
    status: "Draft",
    owner: "",
    date: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        id: `DOC-${Math.floor(Math.random() * 100000)}`,
        title: "",
        version: "",
        status: "Draft",
        owner: "",
        date: "",
      });
    }
  }, [initialData, open]);

  if (!open) return null;

  const update = (key: keyof DocumentType, value: string) =>
    setForm({ ...form, [key]: value });

  const save = () => {
    if (!form.title || !form.owner || !form.date) return;
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Document" : "Create Document"}
        </h2>

        <div className="space-y-3 text-sm">
          <input
            className="border w-full px-3 py-2 rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />

          <input
            className="border w-full px-3 py-2 rounded"
            placeholder="Version"
            value={form.version}
            onChange={(e) => update("version", e.target.value)}
          />

          <select
            className="border w-full px-3 py-2 rounded"
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
          >
            <option>Draft</option>
            <option>Submitted</option>
            <option>Approved</option>
          </select>

          <input
            className="border w-full px-3 py-2 rounded"
            placeholder="Owner"
            value={form.owner}
            onChange={(e) => update("owner", e.target.value)}
          />

          <input
            type="date"
            className="border w-full px-3 py-2 rounded"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={save}
            className="px-4 py-2 bg-blue-700 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
