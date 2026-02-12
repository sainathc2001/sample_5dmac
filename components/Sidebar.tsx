"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  FileText,
  SquareSlash,
  SquareCheck,
  NotebookText,
  GraduationCap,
  History,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const menu = [
  { label: "Dashboard", icon: House, href: "/dashboard" },
  { label: "Documents", icon: FileText, href: "/" },
  { label: "Deviations", icon: SquareSlash, href: "/deviations" },
  { label: "CAPA", icon: SquareCheck, href: "/capa" },
  { label: "Change Control", icon: NotebookText, href: "/change-control" },
  { label: "Training", icon: GraduationCap, href: "/training" },
  { label: "Audit Trail", icon: History, href: "/audit-trail" },
  { label: "Admin", icon: Settings, href: "/admin" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen p-4 bg-gray-100 transition-all duration-300 ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      <div className="h-full bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col transition-all duration-300">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
          {!collapsed && (
            <h2 className="text-lg font-bold text-blue-700">
              Pharma eQMS
            </h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-6 space-y-2 text-sm">
          {menu.map(({ label, icon: Icon, href }) => {
            const active =
              pathname === href || pathname.startsWith(href + "/");

            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center ${
                  collapsed ? "justify-center" : "gap-3"
                } px-4 py-3 rounded-xl transition-all ${
                  active
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon
                  size={18}
                  className={active ? "text-blue-600" : "text-gray-500"}
                />

                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Help Section */}
        {!collapsed && (
          <div className="p-4">
            <div className="bg-gray-100 rounded-2xl p-4 text-sm">
              <p className="font-semibold text-gray-800">
                Help Center
              </p>
              <p className="text-gray-500 text-xs">
                Answers here
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}