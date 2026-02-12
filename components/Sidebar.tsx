"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  FileText,
  SquareSlash ,
  SquareCheck ,
  NotebookText,
  GraduationCap,
  History,
  Settings,
} from "lucide-react";

const menu = [
  { label: "Dashboard", icon: House, href: "/dashboard" },
  { label: "Documents", icon: FileText, href: "/documents" },
  { label: "Deviations", icon: SquareSlash, href: "/deviations" },
  { label: "CAPA", icon: SquareCheck, href: "/capa" },
  { label: "Change Control", icon: NotebookText, href: "/change-control" },
  { label: "Training", icon: GraduationCap, href: "/training" },
  { label: "Audit Trail", icon: History, href: "/audit-trail" },
  { label: "Admin", icon: Settings, href: "/admin" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <div className="px-6 py-4 text-xl font-semibold border-b border-blue-700">
        Pharma eQMS
      </div>

      <nav className="mt-4 space-y-1 px-3 text-sm">
        {menu.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer transition-colors ${
              pathname === href || pathname.startsWith(href + "/")
                ? "bg-blue-700"
                : "hover:bg-blue-700/60"
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
