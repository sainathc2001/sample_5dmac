import "./globals.css";
import { initializeDatabase } from "@/lib/initDb";

// Initialize database on app start
initializeDatabase().catch(console.error);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-800">
        {children}
      </body>
    </html>
  );
}
