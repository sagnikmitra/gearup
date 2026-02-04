import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtext, trend, color = 'blue' }) => {
  const getColorClasses = () => {
    switch(color) {
      case 'green': return 'bg-emerald-50 border-emerald-100 text-emerald-900';
      case 'red': return 'bg-rose-50 border-rose-100 text-rose-900';
      case 'amber': return 'bg-amber-50 border-amber-100 text-amber-900';
      default: return 'bg-white border-slate-200 text-slate-800';
    }
  };

  return (
    <div className={`p-6 rounded-2xl border shadow-sm ${getColorClasses()} transition-all duration-200 hover:shadow-md`}>
      <h3 className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-2">{title}</h3>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      {subtext && (
        <div className="mt-3 text-sm opacity-80 flex items-center gap-1 font-medium">
          {subtext}
        </div>
      )}
    </div>
  );
};

export default MetricCard;