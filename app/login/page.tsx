"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/");   // ✅ redirect
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Sign In
        </h1>
          <form onSubmit={submit} className="space-y-4">
            <input name="email"
             placeholder="Email" 
             onChange={handleChange}
             className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input name="password" 
                   type="password" 
                   placeholder="Password" 
                   onChange={handleChange}
                   className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          </form>
          <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
