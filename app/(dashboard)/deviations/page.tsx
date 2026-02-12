import pool  from "@/lib/db";

export default async function DeviationsPage() {
  const result = await pool.query(
    "SELECT * FROM deviations ORDER BY created_at DESC"
  );

  const deviations = result.rows;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Deviations</h1>

      <div className="grid grid-cols-2 gap-4">
        {deviations.map((dev) => (
          <div
            key={dev.id}
            className="bg-white shadow rounded p-4"
          >
            <div className="flex justify-between">
              <span className="font-semibold">{dev.title}</span>
              <span className="text-sm bg-gray-200 px-2 py-1 rounded">
                {dev.status}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Owner: {dev.owner}
            </p>

            <p className="text-xs mt-2">
              Due: {dev.due_date?.toString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}