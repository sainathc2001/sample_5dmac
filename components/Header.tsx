"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/lib/getMe";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    getMe()
      .then(setUser)
      .catch(() => router.push("/login"));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || "";

  return (
    <header className="w-full bg-gray-100 px-8 py-4 flex items-center justify-between border-b">
      
      {/* LEFT SIDE */}
      <div>
        <h1 className="text-2xl font-semibold text-black">
          Welcome, {user?.name}.
        </h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 cursor-pointer"
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700">
            {initials}
          </div>

          {/* Name + Email */}
          <div className="text-right">
            <p className="font-semibold text-black">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          <ChevronDown size={18} className="text-gray-600" />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}