"use client"

import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"

const flightActivityData = [
    { time: "00:00", departures: 18, arrivals: 25 },
    { time: "02:00", departures: 30, arrivals: 40 },
    { time: "04:00", departures: 45, arrivals: 35 },
    { time: "06:00", departures: 70, arrivals: 85 },
    { time: "08:00", departures: 90, arrivals: 110 },
    { time: "10:00", departures: 120, arrivals: 130 },
    { time: "12:00", departures: 110, arrivals: 115 },
    { time: "14:00", departures: 95, arrivals: 100 },
    { time: "16:00", departures: 80, arrivals: 90 },
    { time: "18:00", departures: 100, arrivals: 120 },
    { time: "20:00", departures: 85, arrivals: 95 },
    { time: "22:00", departures: 50, arrivals: 60 },
]

const flightActivityChartConfig = {
  departures: {
    label: "Departures",
    color: "hsl(var(--chart-1))",
  },
  arrivals: {
    label: "Arrivals",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function FlightActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Flight Activity</CardTitle>
        <CardDescription>Departures and Arrivals at EBB</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={flightActivityChartConfig} className="h-64 w-full">
          <BarChart accessibilityLayer data={flightActivityData}>
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
             <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="departures" fill="var(--color-departures)" radius={4} />
            <Bar dataKey="arrivals" fill="var(--color-arrivals)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


const delayTrendsData = [
  { month: "January", delay: 18.2 },
  { month: "February", delay: 21.5 },
  { month: "March", delay: 17.9 },
  { month: "April", delay: 22.3 },
  { month: "May", delay: 20.1 },
  { month: "June", delay: 24.6 },
]

const delayTrendsChartConfig = {
  delay: {
    label: "Avg. Delay (min)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function DelayTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Delay Trends</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={delayTrendsChartConfig} className="h-48 w-full">
          <LineChart
            accessibilityLayer
            data={delayTrendsData}
            margin={{
              top: 5,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tickFormatter={(value) => `${value}m`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Line
              dataKey="delay"
              type="natural"
              stroke="var(--color-delay)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
