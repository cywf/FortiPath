interface ProjectItem {
  id: string;
  title: string;
  status: string;
  labels: string[];
  url: string;
  createdAt: string;
}

interface Props {
  items: ProjectItem[];
}

export function DevelopmentBoard({ items }: Props) {
  const statuses = ['Todo', 'Doing', 'Done'];

  const itemsByStatus = statuses.reduce((acc, status) => {
    acc[status] = items.filter((item) => item.status === status);
    return acc;
  }, {} as Record<string, ProjectItem[]>);

  return (
    <div className="space-y-6">
      {/* Board controls */}
      <div className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>
          This is a read-only view of the project board. Visit GitHub to interact
          with issues.
        </span>
      </div>

      {/* Kanban board */}
      <div className="grid md:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <div key={status} className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
              <h2 className="text-xl font-bold">{status}</h2>
              <div className="badge badge-primary">{itemsByStatus[status].length}</div>
            </div>

            <div className="space-y-3">
              {itemsByStatus[status].length === 0 ? (
                <div className="p-4 bg-base-300 rounded-lg opacity-50 text-center">
                  No items
                </div>
              ) : (
                itemsByStatus[status].map((item) => (
                  <div
                    key={item.id}
                    className="card bg-base-200 shadow hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="card-body p-4">
                      <h3 className="font-semibold text-sm">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-hover"
                        >
                          {item.title}
                        </a>
                      </h3>
                      {item.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.labels
                            .filter((label) => !label.startsWith('status:'))
                            .slice(0, 3)
                            .map((label) => (
                              <span key={label} className="badge badge-xs">
                                {label}
                              </span>
                            ))}
                        </div>
                      )}
                      <div className="text-xs opacity-60 mt-2">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
