"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateDeviationForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/deviations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        owner,
        due_date: dueDate,
      }),
    });

    router.refresh();
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        placeholder="Title"
        className="border p-2 rounded"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Owner"
        className="border p-2 rounded"
        onChange={(e) => setOwner(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 rounded"
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 rounded"
      >
        Create
      </button>
    </div>
  );
}