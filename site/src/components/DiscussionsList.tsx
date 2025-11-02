import { useState } from 'react';

interface Discussion {
  title: string;
  author: string;
  url: string;
  createdAt: string;
  category: string;
  commentCount: number;
}

interface Props {
  discussions: Discussion[];
}

export function DiscussionsList({ discussions }: Props) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = Array.from(
    new Set(discussions.map((d) => d.category))
  );

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch =
      search === '' ||
      discussion.title.toLowerCase().includes(search.toLowerCase()) ||
      discussion.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || discussion.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search discussions..."
          className="input input-bordered flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <div className="text-sm opacity-70">
        Showing {filteredDiscussions.length} of {discussions.length} discussions
      </div>

      {/* Discussions list */}
      <div className="space-y-4">
        {filteredDiscussions.length === 0 ? (
          <div className="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>No discussions found matching your criteria.</span>
          </div>
        ) : (
          filteredDiscussions.map((discussion) => (
            <div
              key={discussion.url}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="card-body">
                <h3 className="card-title">
                  <a
                    href={discussion.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-hover"
                  >
                    {discussion.title}
                  </a>
                </h3>
                <div className="flex flex-wrap gap-2 items-center text-sm opacity-70">
                  <div className="badge badge-outline">{discussion.category}</div>
                  <span>by {discussion.author}</span>
                  <span>•</span>
                  <span>
                    {new Date(discussion.createdAt).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span>{discussion.commentCount} comments</span>
                </div>
                <div className="card-actions justify-end">
                  <a
                    href={discussion.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    View Discussion →
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
