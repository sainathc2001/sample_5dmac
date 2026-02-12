import "./globals.css";
import { initializeDatabase } from "@/lib/initDb";

// Initialize database on app start (silently fail if not available)
initializeDatabase().catch(() => {
  console.warn("⚠️  Database initialization failed. Please ensure PostgreSQL is running on localhost:5432");
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-800">
        {children}
      </body>
    </html>
  );
}


// import "./globals.css";
// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";

// export const metadata = {
//   title: "Pharma eQMS",
//   description: "Pharma Quality Management System",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <div className="flex min-h-screen bg-gray-100">

//           {/* Sidebar */}
//           <Sidebar />

//           {/* Right Side Layout */}
//           <div className="flex-1 flex flex-col">

//             {/* Header */}
//             <Header />

//             {/* Page Content */}
//             <main className="flex-1 p-6">
//               {children}
//             </main>

//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }