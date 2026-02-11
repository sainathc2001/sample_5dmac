interface PageProps {
  params: {
    id: string;
  };
}

export default async function DocumentDetails({ params }: PageProps) {
  const { id } = params;
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="bg-white rounded-md shadow p-6">
        <h1 className="text-2xl font-semibold mb-2">
          Document: {id}
        </h1>

        <p className="text-sm text-slate-600 mb-4">
          Document details, version history, approvals, and attachments go here.
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Status:</strong> Draft
          </div>
          <div>
            <strong>Owner:</strong> Alice Smith
          </div>
          <div>
            <strong>Version:</strong> 1.0
          </div>
          <div>
            <strong>Effective Date:</strong> 04/20/2024
          </div>
        </div>
      </div>
    </div>
  );
}
