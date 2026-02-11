"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/lib/getMe";

export default function Header() {

  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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

  return (
    <header className="h-14 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-end px-6 text-white text-sm">

      {user && <span>{user.name}</span>}
      <span className="mx-2">|</span>
      QA Manager
      <span className="mx-2">|</span>
      <button onClick={logout}>Logout</button>

    </header>
  );
}
