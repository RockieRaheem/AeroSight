'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Droplets, DollarSign } from 'lucide-react';

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
import { calculateFuelCost } from '@/ai/flows/calculate-fuel-cost';
import type { CalculateFuelCostOutput } from '@/ai/flows/calculate-fuel-cost';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';

const FormSchema = z.object({
  route: z.string().min(5, { message: 'Route must be descriptive.' }),
  aircraftType: z.string().min(5, { message: 'Aircraft type is required.' }),
  currentFuelPrice: z.coerce.number().positive({ message: 'Price must be positive.' }),
  atmosphericConditions: z.string().min(10, { message: 'Describe conditions.' }),
});

export default function FuelCostPage() {
  const { toast } = useToast();
  const [calculation, setCalculation] = useState<CalculateFuelCostOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      route: 'EBB to JFK',
      aircraftType: 'Boeing 787',
      currentFuelPrice: 3.50,
      atmosphericConditions: 'Standard day, 15kt headwind at cruise altitude.',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setCalculation(null);
    try {
      const result = await calculateFuelCost(data);
      setCalculation(result);
    } catch (error) {
      console.error('Error calculating fuel cost:', error);
      toast({
        title: 'Calculation Failed',
        description: 'Could not calculate fuel cost. Please try again.',
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
          <CardTitle>Fuel Cost Calculator</CardTitle>
          <CardDescription>
            Estimate fuel burn and cost for a given flight leg.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="route"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Route</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., EBB to LHR" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="aircraftType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aircraft Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Boeing 787" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentFuelPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fuel Price (USD/gal)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="atmosphericConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Atmospheric Conditions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Headwind, temperature..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Calculating...' : 'Calculate Cost'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Estimated Costs</CardTitle>
            <CardDescription>Breakdown of estimated fuel burn and total cost.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full">
            {isLoading && (
              <div className="space-y-6 text-center">
                <Skeleton className="h-10 w-48 mx-auto" />
                <Skeleton className="h-10 w-48 mx-auto" />
              </div>
            )}
            {!isLoading && !calculation && (
                <p className="text-muted-foreground">Results will be displayed here.</p>
            )}
            {calculation && (
              <div className="space-y-8 text-center">
                <div>
                  <h3 className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Droplets className="h-4 w-4"/> Estimated Fuel Burn
                  </h3>
                  <p className="text-4xl font-bold tracking-tight">
                    {calculation.estimatedFuelBurn.toLocaleString()}
                    <span className="text-xl text-muted-foreground font-medium ml-2">gal</span>
                  </p>
                </div>
                <div>
                  <h3 className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
                    <DollarSign className="h-4 w-4"/> Estimated Total Cost
                  </h3>
                  <p className="text-4xl font-bold tracking-tight text-primary">
                    ${calculation.estimatedCost.toLocaleString()}
                    <span className="text-xl text-muted-foreground font-medium ml-2">USD</span>
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
