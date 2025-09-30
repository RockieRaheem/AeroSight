'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wrench } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { provideMaintenanceSchedules } from '@/ai/flows/provide-maintenance-schedules';
import type { ProvideMaintenanceSchedulesOutput } from '@/ai/flows/provide-maintenance-schedules';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

const FormSchema = z.object({
  aircraftType: z.string().min(1, { message: 'Please select an aircraft type.' }),
  airlinePreferences: z.string().min(10, { message: 'Please describe maintenance preferences.' }),
});

export default function MaintenancePage() {
  const { toast } = useToast();
  const [schedule, setSchedule] = useState<ProvideMaintenanceSchedulesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      aircraftType: 'Boeing 787-9',
      airlinePreferences: 'Uganda Airlines maintenance standards: Prioritize component lifecycle checks and minimize ground time. Focus on engine and avionics systems for East African operations.',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setSchedule(null);
    try {
      const result = await provideMaintenanceSchedules({
        ...data,
        incomingAircraftData: 'Simulated stream of sensor data: engine pressure normal, hydraulic levels at 85%, avionics software v2.1.3',
      });
      setSchedule(result);
    } catch (error) {
      console.error('Error providing maintenance schedule:', error);
      toast({
        title: 'Scheduling Failed',
        description: 'Could not generate maintenance schedule. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Maintenance Scheduler</CardTitle>
          <CardDescription>
            Generate predictive maintenance schedules based on aircraft data and preferences.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="aircraftType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aircraft Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an aircraft" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Boeing 787-9">Boeing 787-9</SelectItem>
                        <SelectItem value="Boeing 787-8">Boeing 787-8</SelectItem>
                        <SelectItem value="Airbus A350-900">Airbus A350-900</SelectItem>
                        <SelectItem value="Boeing 777-300ER">Boeing 777-300ER</SelectItem>
                        <SelectItem value="Boeing 737-800">Boeing 737-800</SelectItem>
                        <SelectItem value="Airbus A320neo">Airbus A320neo</SelectItem>
                        <SelectItem value="Bombardier CRJ900">Bombardier CRJ900</SelectItem>
                        <SelectItem value="ATR 72-600">ATR 72-600</SelectItem>
                        <SelectItem value="Embraer E190">Embraer E190</SelectItem>
                        <SelectItem value="Boeing 737 MAX 8">Boeing 737 MAX 8</SelectItem>
                        <SelectItem value="Airbus A220-300">Airbus A220-300</SelectItem>
                        <SelectItem value="De Havilland Dash 8">De Havilland Dash 8</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="airlinePreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maintenance Preferences</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Prioritize engine checks, minimize downtime..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Schedule'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Generated Schedule</CardTitle>
            <CardDescription>
              The AI-recommended maintenance plan for the selected aircraft.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            )}
            {!isLoading && !schedule && (
              <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">Schedule details will be displayed here.</p>
              </div>
            )}
            {schedule && schedule.maintenanceSchedule.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Task</TableHead>
                    <TableHead className="w-1/4">Interval</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.maintenanceSchedule.map((task, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{task.task}</TableCell>
                      <TableCell>{task.interval}</TableCell>
                      <TableCell className="text-muted-foreground">{task.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
