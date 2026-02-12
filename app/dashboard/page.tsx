"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import { FileText, CheckCircle2, Clock, FileStack, AlertCircle, Zap } from "lucide-react";
import { getMe } from "@/lib/getMe";

export default function Dashboard() {
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

  const stats = [
    { icon: <FileText className="w-6 h-6 text-white" />, label: "Total Documents", value: 25, color: "bg-blue-500" },
    { icon: <CheckCircle2 className="w-6 h-6 text-white" />, label: "Approved Documents", value: 18, color: "bg-green-500" },
    { icon: <Clock className="w-6 h-6 text-white" />, label: "Pending Approvals", value: 4, color: "bg-yellow-500" },
    { icon: <FileStack className="w-6 h-6 text-white" />, label: "Draft Documents", value: 3, color: "bg-gray-400" },
    { icon: <AlertCircle className="w-6 h-6 text-white" />, label: "Open Deviations", value: 2, color: "bg-red-500" },
    { icon: <Zap className="w-6 h-6 text-white" />, label: "CAPA Open", value: 1, color: "bg-purple-500" },
  ];

  const statusData = [
    { label: "Draft", value: 3, color: "bg-blue-500" },
    { label: "Submitted", value: 2, color: "bg-green-500" },
    { label: "Approved", value: 18, color: "bg-yellow-500" },
    { label: "Rejected", value: 1, color: "bg-red-500" },
  ];

  const pieData = [
    { label: "Draft", value: 3, color: "bg-gray-400" },
    { label: "Submitt", value: 2, color: "bg-yellow-400" },
    { label: "Approved", value: 18, color: "bg-green-500" },
    { label: "Rejected", value: 1, color: "bg-red-500" },
  ];

  const recentActivities = [
    { activity: "Document Approved", user: "Sainath", module: "Documents", date: "10 Feb" },
    { activity: "CAPA Created", user: "Raja", module: "CAPA", date: "09 Feb" },
    { activity: "Deviation Closed", user: "Admin", module: "Deviations", date: "08 Feb" },
    { activity: "Draft Document Created", user: "user2", module: "Documents", date: "07 Feb" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        {/* Status Cards */}
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-2">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Status Overview</h2>
            <BarChart data={statusData} maxValue={20} />
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Status Overview</h2>
            <PieChart
              data={[
                { label: "Draft", value: 3, color: "bg-gray-400" },
                { label: "Submitt", value: 2, color: "bg-yellow-400" },
                { label: "Approved", value: 18, color: "bg-green-500" },
                { label: "Rejected", value: 1, color: "bg-red-500" },
              ]}
              size={150}
            />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Activity Table */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">Show: Last 7 days</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="text-left py-2 px-2">Activity</th>
                  <th className="text-left py-2 px-2">User</th>
                  <th className="text-left py-2 px-2">Module</th>
                  <th className="text-left py-2 px-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {activity.activity}
                    </td>
                    <td className="py-3 px-2">{activity.user}</td>
                    <td className="py-3 px-2">{activity.module}</td>
                    <td className="py-3 px-2">{activity.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Activity List */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex justify-between items-start pb-4 border-b last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-800">{activity.activity}</p>
                      <p className="text-sm text-gray-600">{activity.module}</p>
                    </div>
                  </div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
