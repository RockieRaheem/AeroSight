
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
    <div className="flex flex-col gap-4 md:gap-8">
       <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to AeroSight</h1>
        <p className="text-muted-foreground">Your central hub for intelligent aviation operations.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <StatsCard
            title="On-Time Departures"
            value="98.2%"
            icon={CheckCircle}
            change="+2.5% from last month"
            changeType='positive'
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
            changeType='positive'
          />
          <StatsCard
            title="Active Alerts"
            value="3"
            icon={AlertTriangle}
            changeType="negative"
          />
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        <div className="lg:col-span-2">
            <FlightActivityChart />
        </div>
        <div className="lg:col-span-1">
            <DelayPredictor />
        </div>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
         <div className="lg:col-span-2">
           <DelayTrendsChart />
        </div>
        <div className="lg:col-span-1">
           <MaintenanceAlerts />
        </div>
      </div>
    </div>
  );
}
