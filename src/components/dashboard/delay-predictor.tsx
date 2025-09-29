'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { predictFlightDelay } from '@/ai/flows/predict-flight-delays';
import type { PredictFlightDelayOutput } from '@/ai/flows/predict-flight-delays';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const FormSchema = z.object({
  flightNumber: z.string().min(2, {
    message: 'Flight number must be at least 2 characters.',
  }),
});

export function DelayPredictor() {
  const { toast } = useToast();
  const [prediction, setPrediction] = useState<PredictFlightDelayOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      flightNumber: 'KQ414',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await predictFlightDelay({
        flightNumber: data.flightNumber,
        airportCode: 'EBB',
        currentDateTime: new Date().toISOString(),
      });
      setPrediction(result);
    } catch (error) {
      console.error('Error predicting flight delay:', error);
      toast({
        title: 'Prediction Failed',
        description: 'Could not fetch delay prediction. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Flight Delay Prediction</CardTitle>
        <CardDescription>
          Enter a flight number to predict potential delays at EBB.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="flightNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flight Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., UK202" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Predicting...' : 'Predict Delay'}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {(isLoading || prediction) && (
        <CardContent className="border-t pt-6">
            {isLoading && (
                <div className="space-y-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            )}
            {prediction && (
                <div className="space-y-4">
                    <div className='flex items-baseline gap-2'>
                        <h3 className="text-2xl font-bold text-primary">
                            {Math.round(prediction.delayProbability * 100)}%
                        </h3>
                        <p className="text-sm text-muted-foreground">chance of delay</p>
                    </div>
                    <p className="font-medium">
                        Estimated Delay: {prediction.estimatedDelayTimeMinutes} minutes
                    </p>
                    <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Explanation: </span> 
                        {prediction.explanation}
                    </p>
                </div>
            )}
        </CardContent>
      )}
    </Card>
  );
}
