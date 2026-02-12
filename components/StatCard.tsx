import React, { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  color: string;
}

export default function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md flex items-center gap-4 min-w-max">
      <div className={`${color} p-3 rounded-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
