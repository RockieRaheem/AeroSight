"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Droplets, DollarSign, Lightbulb, Activity } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateFuelCost } from "@/ai/flows/calculate-fuel-cost";
import type { CalculateFuelCostOutput } from "@/ai/flows/calculate-fuel-cost";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const FormSchema = z.object({
  route: z.string().min(5, { message: "Route must be descriptive." }),
  aircraftType: z.string().min(5, { message: "Aircraft type is required." }),
  currentFuelPrice: z.coerce
    .number()
    .positive({ message: "Price must be positive." }),
  atmosphericConditions: z
    .string()
    .min(10, { message: "Describe conditions." }),
});

export default function FuelCostPage() {
  const { toast } = useToast();
  const [calculation, setCalculation] =
    useState<CalculateFuelCostOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      route: "EBB to ADD", // Kampala to Addis Ababa - common route
      aircraftType: "Boeing 787-9",
      currentFuelPrice: 3.5,
      atmosphericConditions:
        "East African conditions: Standard day, 10kt tailwind, typical seasonal weather patterns.",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setCalculation(null);
    try {
      const result = await calculateFuelCost(data);
      setCalculation(result);
    } catch (error) {
      console.error("Error calculating fuel cost:", error);
      toast({
        title: "Calculation Failed",
        description: "Could not calculate fuel cost. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <Card className="md:col-span-1">
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select aircraft" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Boeing 787-9">
                            Boeing 787-9
                          </SelectItem>
                          <SelectItem value="Boeing 787-8">
                            Boeing 787-8
                          </SelectItem>
                          <SelectItem value="Airbus A350-900">
                            Airbus A350-900
                          </SelectItem>
                          <SelectItem value="Boeing 777-300ER">
                            Boeing 777-300ER
                          </SelectItem>
                          <SelectItem value="Boeing 737-800">
                            Boeing 737-800
                          </SelectItem>
                          <SelectItem value="Airbus A320neo">
                            Airbus A320neo
                          </SelectItem>
                          <SelectItem value="Bombardier CRJ900">
                            Bombardier CRJ900
                          </SelectItem>
                          <SelectItem value="ATR 72-600">ATR 72-600</SelectItem>
                          <SelectItem value="Embraer E190">
                            Embraer E190
                          </SelectItem>
                          <SelectItem value="Boeing 737 MAX 8">
                            Boeing 737 MAX 8
                          </SelectItem>
                          <SelectItem value="Airbus A220-300">
                            Airbus A220-300
                          </SelectItem>
                          <SelectItem value="De Havilland Dash 8">
                            De Havilland Dash 8
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Textarea
                        placeholder="e.g., Headwind, temperature..."
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
                {isLoading ? "Calculating..." : "Calculate Cost"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="md:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Cost & Consumption Analysis</CardTitle>
            <CardDescription>
              Breakdown of estimated fuel burn, cost, and optimization insights.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center h-full">
            {isLoading && (
              <div className="space-y-6">
                <div className="flex justify-around">
                  <Skeleton className="h-12 w-48" />
                  <Skeleton className="h-12 w-48" />
                </div>
                <Separator />
                <div className="space-y-4 px-6">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="space-y-4 px-6">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            )}
            {!isLoading && !calculation && (
              <p className="text-center text-muted-foreground">
                Results will be displayed here.
              </p>
            )}
            {calculation && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                  <div>
                    <h3 className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
                      <Droplets className="h-4 w-4" /> Estimated Fuel Burn
                    </h3>
                    <p className="text-4xl font-bold tracking-tight">
                      {calculation.estimatedFuelBurn.toLocaleString()}
                      <span className="text-xl text-muted-foreground font-medium ml-2">
                        gal
                      </span>
                    </p>
                  </div>
                  <div>
                    <h3 className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
                      <DollarSign className="h-4 w-4" /> Estimated Total Cost
                    </h3>
                    <p className="text-4xl font-bold tracking-tight text-primary">
                      ${calculation.estimatedCost.toLocaleString()}
                      <span className="text-xl text-muted-foreground font-medium ml-2">
                        USD
                      </span>
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4 px-2 sm:px-6">
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold">
                      <Activity className="h-5 w-5 text-primary" />
                      Analysis
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {calculation.analysis}
                    </p>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      Recommendations
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {calculation.recommendations}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
