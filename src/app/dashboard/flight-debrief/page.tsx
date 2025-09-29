'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Video, Bot, Sparkles, AlertTriangle } from 'lucide-react';

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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { generateFlightDebrief } from '@/ai/flows/generate-flight-debrief';
import type { GenerateFlightDebriefOutput } from '@/ai/flows/generate-flight-debrief';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const FormSchema = z.object({
  flightNumber: z.string().min(3, { message: 'Enter a valid flight number.' }),
  flightDate: z.string().min(1, { message: 'Please select a date.' }),
});

export default function FlightDebriefPage() {
  const { toast } = useToast();
  const [debrief, setDebrief] = useState<GenerateFlightDebriefOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      flightNumber: 'UA428',
      flightDate: new Date().toISOString().split('T')[0], // Default to today
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setDebrief(null);
    try {
      const result = await generateFlightDebrief(data);
      setDebrief(result);
    } catch (error) {
      console.error('Error generating flight debrief:', error);
      toast({
        title: 'Generation Failed',
        description:
          'Could not generate the video debrief. This is an experimental feature and may face rate limits. Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>AI Flight Debrief</CardTitle>
          <CardDescription>
            Generate a video summary for any completed flight.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
               <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertTitle>Experimental Feature</AlertTitle>
                  <AlertDescription>
                    Video generation can take up to a minute. Please be patient.
                  </AlertDescription>
                </Alert>
              <FormField
                control={form.control}
                name="flightNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flight Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., UA428" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="flightDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flight Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Generating Video...' : 'Generate Debrief'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="md:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Generated Debrief</CardTitle>
            <CardDescription>
              AI-generated video and summary of the flight.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            {isLoading && (
              <div className="space-y-4 flex flex-col items-center justify-center text-center h-full">
                <div className="animate-pulse">
                  <Video className="h-16 w-16 text-primary" />
                </div>
                <p className="font-semibold">Generating video, please wait...</p>
                <p className="text-sm text-muted-foreground">This may take up to a minute.</p>
                <Skeleton className="h-4 w-3/4 mt-4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            )}
            {!isLoading && !debrief && (
              <div className="flex flex-col h-full items-center justify-center rounded-lg border border-dashed text-center p-8">
                <Video className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">
                  Your generated flight debrief video will appear here.
                </p>
              </div>
            )}
            {debrief && (
              <div className="space-y-4 h-full flex flex-col">
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                  <video
                    key={debrief.videoUrl}
                    controls
                    className="w-full h-full"
                    src={debrief.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Bot className="h-5 w-5 text-primary" />
                    AI Summary
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {debrief.summary}
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
