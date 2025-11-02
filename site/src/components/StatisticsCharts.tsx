import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Props {
  stats: {
    stars: number;
    forks: number;
    watchers: number;
    openIssues: number;
    languages: Record<string, number>;
    recentCommits: Array<{
      sha: string;
      message: string;
      author: string;
      date: string;
    }>;
  };
}

export function StatisticsCharts({ stats }: Props) {
  const languagesChartRef = useRef<HTMLCanvasElement>(null);
  const commitsChartRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !languagesChartRef.current || !commitsChartRef.current) return;

    // Languages chart
    const languagesCtx = languagesChartRef.current.getContext('2d');
    if (languagesCtx) {
      const languagesChart = new Chart(languagesCtx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(stats.languages),
          datasets: [
            {
              data: Object.values(stats.languages),
              backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(251, 191, 36, 0.8)',
              ],
              borderColor: [
                'rgb(59, 130, 246)',
                'rgb(139, 92, 246)',
                'rgb(236, 72, 153)',
                'rgb(34, 197, 94)',
                'rgb(251, 191, 36)',
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: 'rgba(255, 255, 255, 0.8)',
                padding: 15,
              },
            },
            title: {
              display: true,
              text: 'Languages',
              color: 'rgba(255, 255, 255, 0.9)',
              font: {
                size: 16,
                weight: 'bold',
              },
            },
          },
        },
      });

      // Commits timeline
      const commitsByWeek = new Map<string, number>();
      const now = new Date();
      
      // Initialize last 12 weeks
      for (let i = 0; i < 12; i++) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - (i * 7));
        const weekKey = weekStart.toISOString().split('T')[0].slice(0, 7);
        commitsByWeek.set(weekKey, 0);
      }

      // Count commits per week
      stats.recentCommits.forEach((commit) => {
        const commitDate = new Date(commit.date);
        const weekKey = commitDate.toISOString().split('T')[0].slice(0, 7);
        commitsByWeek.set(weekKey, (commitsByWeek.get(weekKey) || 0) + 1);
      });

      const sortedWeeks = Array.from(commitsByWeek.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .slice(-12);

      const commitsCtx = commitsChartRef.current.getContext('2d');
      if (commitsCtx) {
        new Chart(commitsCtx, {
          type: 'line',
          data: {
            labels: sortedWeeks.map(([week]) => week),
            datasets: [
              {
                label: 'Commits',
                data: sortedWeeks.map(([, count]) => count),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                tension: 0.4,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: 'Commit Activity (Last 12 Weeks)',
                color: 'rgba(255, 255, 255, 0.9)',
                font: {
                  size: 16,
                  weight: 'bold',
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)',
                  precision: 0,
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
              },
              x: {
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
              },
            },
          },
        });
      }

      return () => {
        languagesChart.destroy();
      };
    }
  }, [mounted, stats]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-200">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
          <div className="stat-title">Stars</div>
          <div className="stat-value text-primary">{stats.stars}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div className="stat-title">Forks</div>
          <div className="stat-value text-secondary">{stats.forks}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <div className="stat-title">Watchers</div>
          <div className="stat-value text-accent">{stats.watchers}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="stat-title">Open Issues</div>
          <div className="stat-value text-info">{stats.openIssues}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <canvas ref={languagesChartRef}></canvas>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <canvas ref={commitsChartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
