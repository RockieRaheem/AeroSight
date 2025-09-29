import {
  Activity,
  AlertTriangle,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
} from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { DelayPredictor } from '@/components/dashboard/delay-predictor';
import { FlightActivityChart, DelayTrendsChart } from '@/components/dashboard/charts';
import { MaintenanceAlerts } from '@/components/dashboard/maintenance-alerts';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid gap-4 md:gap-8 lg:col-span-2 xl:col-span-3">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <StatsCard
            title="On-Time Departures"
            value="98.2%"
            icon={CheckCircle}
            change="+2.5% from last month"
          />
          <StatsCard
            title="Average Delay"
            value="12 min"
            icon={Clock}
            change="-5.2% from last month"
            changeType="positive"
          />
          <StatsCard
            title="Fuel Saved (Est.)"
            value="$125,430"
            icon={DollarSign}
            change="+15% from last month"
          />
          <StatsCard
            title="Active Alerts"
            value="3"
            icon={AlertTriangle}
            changeType="negative"
          />
        </div>
      </div>

      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1 xl:col-span-1">
        <DelayPredictor />
      </div>

      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1 xl:col-span-2">
        <FlightActivityChart />
        <div className="grid gap-4 sm:grid-cols-2">
            <DelayTrendsChart />
            <MaintenanceAlerts />
        </div>
      </div>
    </div>
  );
}
