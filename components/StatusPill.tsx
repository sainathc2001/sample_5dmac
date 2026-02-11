export default function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Draft: "bg-gray-400",
    Submitted: "bg-yellow-500",
    Approved: "bg-green-600",
  };

  return (
    <span className={`text-white px-3 py-1 rounded text-xs ${map[status]}`}>
      {status}
    </span>
  );
}
