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
  { label: "Dashboard", icon: House },
  { label: "Documents", icon: FileText },
  { label: "Deviations", icon: SquareSlash },
  { label: "CAPA", icon: SquareCheck },
  { label: "Change Control", icon: NotebookText },
  { label: "Training", icon: GraduationCap },
  { label: "Audit Trail", icon: History },
  { label: "Admin", icon: Settings },
];

export default function Sidebar() {
  const active = "Documents"; // later: derive from route

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <div className="px-6 py-4 text-xl font-semibold border-b border-blue-700">
        Pharma eQMS
      </div>

      <nav className="mt-4 space-y-1 px-3 text-sm">
        {menu.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer ${
              label === active
                ? "bg-blue-700"
                : "hover:bg-blue-700/60"
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
