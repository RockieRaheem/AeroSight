"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Map, Zap, Fuel, Info } from "lucide-react";

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
import { optimizeFlightRoute } from "@/ai/flows/optimize-flight-routes";
import type { OptimizeFlightRouteOutput } from "@/ai/flows/optimize-flight-routes";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const FormSchema = z.object({
  origin: z.string().min(3).max(3),
  destination: z.string().min(3).max(3),
  aircraftType: z.string(),
});

export default function RouteOptimizerPage() {
  const { toast } = useToast();
  const [optimization, setOptimization] =
    useState<OptimizeFlightRouteOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      origin: "EBB",
      destination: "ADD",
      aircraftType: "Boeing 787-9",
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
      console.error("Error optimizing route:", error);
      toast({
        title: "Optimization Failed",
        description: "Could not fetch route optimization. Please try again.",
        variant: "destructive",
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
                      <FormLabel>Origin Airport</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select origin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="EBB">
                            EBB - Entebbe (Kampala)
                          </SelectItem>
                          <SelectItem value="ADD">ADD - Addis Ababa</SelectItem>
                          <SelectItem value="NBO">NBO - Nairobi</SelectItem>
                          <SelectItem value="KGL">KGL - Kigali</SelectItem>
                          <SelectItem value="DAR">
                            DAR - Dar es Salaam
                          </SelectItem>
                          <SelectItem value="JRO">JRO - Kilimanjaro</SelectItem>
                          <SelectItem value="DXB">DXB - Dubai</SelectItem>
                          <SelectItem value="DOH">DOH - Doha</SelectItem>
                          <SelectItem value="IST">IST - Istanbul</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination Airport</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select destination" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ADD">ADD - Addis Ababa</SelectItem>
                          <SelectItem value="NBO">NBO - Nairobi</SelectItem>
                          <SelectItem value="KGL">KGL - Kigali</SelectItem>
                          <SelectItem value="DAR">
                            DAR - Dar es Salaam
                          </SelectItem>
                          <SelectItem value="JRO">JRO - Kilimanjaro</SelectItem>
                          <SelectItem value="DXB">DXB - Dubai</SelectItem>
                          <SelectItem value="DOH">DOH - Doha</SelectItem>
                          <SelectItem value="IST">IST - Istanbul</SelectItem>
                          <SelectItem value="LHR">
                            LHR - London Heathrow
                          </SelectItem>
                          <SelectItem value="AMS">AMS - Amsterdam</SelectItem>
                          <SelectItem value="BRU">BRU - Brussels</SelectItem>
                          <SelectItem value="JFK">
                            JFK - New York JFK
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an aircraft" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Boeing 787-9">
                          Boeing 787-9
                        </SelectItem>
                        <SelectItem value="Boeing 787-8">
                          Boeing 787-8
                        </SelectItem>
                        <SelectItem value="Boeing 777-300ER">
                          Boeing 777-300ER
                        </SelectItem>
                        <SelectItem value="Airbus A350-900">
                          Airbus A350-900
                        </SelectItem>
                        <SelectItem value="Airbus A330-300">
                          Airbus A330-300
                        </SelectItem>
                        <SelectItem value="Boeing 737-800">
                          Boeing 737-800
                        </SelectItem>
                        <SelectItem value="Boeing 737 MAX 8">
                          Boeing 737 MAX 8
                        </SelectItem>
                        <SelectItem value="Airbus A320neo">
                          Airbus A320neo
                        </SelectItem>
                        <SelectItem value="Airbus A220">Airbus A220</SelectItem>
                        <SelectItem value="Bombardier CRJ900">
                          Bombardier CRJ900
                        </SelectItem>
                        <SelectItem value="Embraer E190">
                          Embraer E190
                        </SelectItem>
                        <SelectItem value="ATR 72">ATR 72</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Optimizing..." : "Optimize Route"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Optimized Result</CardTitle>
            <CardDescription>
              The recommended route and its benefits.
            </CardDescription>
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
                <p className="text-muted-foreground">
                  Results will be displayed here.
                </p>
              </div>
            )}
            {optimization && (
              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Map className="h-4 w-4" /> Optimized Route
                  </h3>
                  <p className="text-lg font-mono p-2 bg-muted rounded-md mt-1">
                    {optimization.optimizedRoute}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <Fuel className="h-4 w-4" /> Est. Fuel Burn
                    </h3>
                    <p className="text-xl font-bold">
                      {optimization.estimatedFuelBurn.toLocaleString()} gal
                    </p>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <Zap className="h-4 w-4" /> Est. Fuel Cost
                    </h3>
                    <p className="text-xl font-bold">
                      ${optimization.fuelCostUSD.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Info className="h-4 w-4" /> Rationale
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
