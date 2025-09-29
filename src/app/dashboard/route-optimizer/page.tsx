'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Map, Zap, Fuel, Info } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { optimizeFlightRoute } from '@/ai/flows/optimize-flight-routes';
import type { OptimizeFlightRouteOutput } from '@/ai/flows/optimize-flight-routes';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const FormSchema = z.object({
  origin: z.string().min(3).max(3),
  destination: z.string().min(3).max(3),
  aircraftType: z.string(),
});

export default function RouteOptimizerPage() {
  const { toast } = useToast();
  const [optimization, setOptimization] = useState<OptimizeFlightRouteOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      origin: 'EBB',
      destination: 'JFK',
      aircraftType: 'Boeing 787',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setOptimization(null);
    try {
      const result = await optimizeFlightRoute({
        ...data,
        currentDateTime: new Date().toISOString(),
      });
      setOptimization(result);
    } catch (error) {
      console.error('Error optimizing route:', error);
      toast({
        title: 'Optimization Failed',
        description: 'Could not fetch route optimization. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Route Optimizer</CardTitle>
          <CardDescription>
            Find the most fuel-efficient and cost-effective flight path.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origin</FormLabel>
                      <FormControl>
                        <Input placeholder="EBB" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="JFK" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                        <SelectItem value="Boeing 787">Boeing 787</SelectItem>
                        <SelectItem value="Airbus A350">Airbus A350</SelectItem>
                        <SelectItem value="Boeing 737">Boeing 737</SelectItem>
                        <SelectItem value="Airbus A320">Airbus A320</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Optimizing...' : 'Optimize Route'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Optimized Result</CardTitle>
            <CardDescription>The recommended route and its benefits.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
                 <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            )}
            {!isLoading && !optimization && (
              <div className="flex h-48 items-center justify-center">
                <p className="text-muted-foreground">Results will be displayed here.</p>
              </div>
            )}
            {optimization && (
              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Map className="h-4 w-4"/> Optimized Route
                  </h3>
                  <p className="text-lg font-mono p-2 bg-muted rounded-md mt-1">
                    {optimization.optimizedRoute}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                            <Fuel className="h-4 w-4"/> Est. Fuel Burn
                        </h3>
                        <p className="text-xl font-bold">{optimization.estimatedFuelBurn.toLocaleString()} gal</p>
                    </div>
                     <div>
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                            <Zap className="h-4 w-4"/> Est. Fuel Cost
                        </h3>
                        <p className="text-xl font-bold">${optimization.fuelCostUSD.toLocaleString()}</p>
                    </div>
                </div>

                <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                        <Info className="h-4 w-4"/> Rationale
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        {optimization.explanation}
                    </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
