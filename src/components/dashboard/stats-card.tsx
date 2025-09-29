import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'positive',
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={cn(
              'text-xs text-muted-foreground',
              changeType === 'positive' && 'text-emerald-500',
              changeType === 'negative' && 'text-red-500'
            )}
          >
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
