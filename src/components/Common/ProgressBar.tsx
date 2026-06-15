import { useProgress } from '@/hooks/useProgress';

interface ProgressBarProps {
  total: number;
  showLabel?: boolean;
}

export const ProgressBar = ({ total, showLabel = true }: ProgressBarProps) => {
  const { completionPercentage, completedCount } = useProgress();
  const percentage = completionPercentage(total);
  const completed = completedCount();
  const isDone = percentage === 100;

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {completed} / {total} lessons
          </span>
          <span
            className="text-xs font-bold tabular-nums"
            style={{ color: isDone ? '#22C55E' : '#339933' }}
          >
            {percentage}%
          </span>
        </div>
      )}

      <div className="relative w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            background: isDone
              ? 'linear-gradient(90deg, #22C55E, #4ade80)'
              : 'linear-gradient(90deg, #339933, #4caf4c)',
          }}
        />
      </div>

      {showLabel && isDone && (
        <p className="text-xs font-semibold" style={{ color: '#22C55E' }}>
          ✓ Module complete!
        </p>
      )}
    </div>
  );
};
