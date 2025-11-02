import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface Props {
  diagrams: Array<{
    name: string;
    content: string;
  }>;
}

export function MermaidViewer({ diagrams }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      themeVariables: {
        darkMode: true,
        background: '#0a0f1e',
        primaryColor: '#3b82f6',
        primaryTextColor: '#fff',
        primaryBorderColor: '#60a5fa',
        lineColor: '#60a5fa',
        secondaryColor: '#8b5cf6',
        tertiaryColor: '#ec4899',
      },
    });
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current || diagrams.length === 0) return;

    const renderDiagram = async () => {
      const container = containerRef.current;
      if (!container) return;

      const diagram = diagrams[currentIndex];
      const uniqueId = `mermaid-${Date.now()}`;

      try {
        container.innerHTML = '';
        const { svg } = await mermaid.render(uniqueId, diagram.content);
        container.innerHTML = svg;
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        container.innerHTML = `
          <div class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error rendering diagram: ${diagram.name}</span>
          </div>
        `;
      }
    };

    renderDiagram();
  }, [mounted, currentIndex, diagrams]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (diagrams.length === 0) {
    return (
      <div className="alert alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>No diagrams found.</span>
      </div>
    );
  }

  const currentDiagram = diagrams[currentIndex];

  return (
    <div className="space-y-6">
      {/* Diagram selector */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <label className="label">
                <span className="label-text font-semibold">Select Diagram</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={currentIndex}
                onChange={(e) => setCurrentIndex(Number(e.target.value))}
              >
                {diagrams.map((diagram, index) => (
                  <option key={index} value={index}>
                    {diagram.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-circle"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev > 0 ? prev - 1 : diagrams.length - 1
                  )
                }
                disabled={diagrams.length <= 1}
              >
                ←
              </button>
              <button
                className="btn btn-circle"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev < diagrams.length - 1 ? prev + 1 : 0
                  )
                }
                disabled={diagrams.length <= 1}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Diagram display */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{currentDiagram.name}</h2>
          <div
            ref={containerRef}
            className="mermaid-container overflow-x-auto p-4"
            style={{ minHeight: '400px' }}
          />
        </div>
      </div>

      {/* View on GitHub */}
      <div className="text-center">
        <a
          href={`https://github.com/cywf/FortiPath/blob/main/mermaid/${currentDiagram.name}.mmd`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          View Source on GitHub
        </a>
      </div>
    </div>
  );
}
