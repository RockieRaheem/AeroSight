import { Wrench, Plane } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const alerts = [
  {
    id: 1,
    flight: "UR522", // Uganda Airlines
    airline: "Uganda Airlines",
    model: "Bombardier CRJ900",
    reason: "Engine pressure anomaly detected",
  },
  {
    id: 2,
    flight: "ET714", // Ethiopian Airlines
    airline: "Ethiopian Airlines",
    model: "Boeing 787",
    reason: "Landing gear sensor fault",
  },
  {
    id: 3,
    flight: "KQ414", // Kenya Airways
    airline: "Kenya Airways",
    model: "Boeing 737",
    reason: "Hydraulic fluid levels low",
  },
  {
    id: 4,
    flight: "WB205", // RwandAir
    airline: "RwandAir",
    model: "Airbus A330",
    reason: "Avionics system update required",
  },
  {
    id: 5,
    flight: "EK728", // Emirates
    airline: "Emirates",
    model: "Boeing 777",
    reason: "Tire pressure warning",
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
                {alert.flight} - {alert.airline}
              </p>
              <p className="text-xs text-muted-foreground">{alert.model}</p>
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
