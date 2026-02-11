export async function getMe() {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/user/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}
