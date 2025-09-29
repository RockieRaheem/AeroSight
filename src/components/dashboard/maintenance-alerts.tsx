import { Wrench, Plane } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const alerts = [
  {
    id: 1,
    flight: 'UG522',
    model: 'Boeing 737',
    reason: 'Engine pressure anomaly detected',
  },
  {
    id: 2,
    flight: 'KQ414',
    model: 'Airbus A320',
    reason: 'Landing gear sensor fault',
  },
  {
    id: 3,
    flight: 'ET338',
    model: 'Boeing 787',
    reason: 'Hydraulic fluid levels low',
  },
];

export function MaintenanceAlerts() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Maintenance Alerts</CardTitle>
        <CardDescription>
          Aircraft requiring immediate attention.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-4 rounded-lg p-2 hover:bg-muted"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Plane className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="grid gap-1 flex-1">
              <p className="text-sm font-medium leading-none">
                {alert.flight} ({alert.model})
              </p>
              <p className="text-sm text-muted-foreground">{alert.reason}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardContent>
         <Button asChild size="sm" className="w-full">
          <Link href="/dashboard/maintenance">
            <Wrench className="mr-2 h-4 w-4" />
            View All Schedules
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
