import {
  House,
  FileText,
  SquareSlash,
  SquareCheck,
  NotebookText,
  GraduationCap,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  MessageSquareText,
  ChevronRight as ArrowRight
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
    <aside 
      className={`h-screen bg-white border-r border-gray-100 transition-all duration-300 flex flex-col relative ${
        isOpen ? "w-72" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-12 bg-white border border-gray-200 rounded-md p-0.5 hover:bg-gray-50 transition-colors z-50 text-blue-600 shadow-sm"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Header / Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#0055D4] rounded flex items-center justify-center shrink-0">
          <div className="flex gap-0.5">
            <div className="w-1 h-4 bg-white/40 -skew-x-12"></div>
            <div className="w-1 h-4 bg-white -skew-x-12"></div>
          </div>
        </div>
        {isOpen && (
          <span className="font-bold text-[#003B95] text-xl tracking-tight uppercase">
           PHARMA EQMS
          </span>
        )}
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

      {/* Help Center Box */}
      {isOpen && (
        <div className="m-4 p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-slate-100 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-full text-blue-500 shadow-sm">
              <MessageSquareText size={20} fill="currentColor" className="text-blue-100" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Help Center</p>
              <p className="text-xs text-slate-400">Answers here</p>
            </div>
          </div>
          <ArrowRight size={20} className="text-slate-900" />
        </div>
      )}
    </aside>
  );
}