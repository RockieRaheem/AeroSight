'use server';

/**
 * @fileOverview Optimizes flight routes based on weather and traffic.
 *
 * - optimizeFlightRoute - A function that provides optimized flight routes and fuel costs.
 * - OptimizeFlightRouteInput - The input type for the optimizeFlightRoute function.
 * - OptimizeFlightRouteOutput - The return type for the optimizeFlightRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeFlightRouteInputSchema = z.object({
  origin: z.string().describe('The origin airport code.'),
  destination: z.string().describe('The destination airport code.'),
  currentDateTime: z.string().describe('The current date and time.'),
  aircraftType: z.string().describe('The type of aircraft.'),
  airlinePreferences: z
    .string()
    .optional()
    .describe(
      'Optional preferences of the airline regarding route optimization.'
    ),
});
export type OptimizeFlightRouteInput = z.infer<
  typeof OptimizeFlightRouteInputSchema
>;

const OptimizeFlightRouteOutputSchema = z.object({
  optimizedRoute: z.string().describe('The optimized flight route.'),
  estimatedFuelBurn: z.number().describe('Estimated fuel burn in US gallons.'),
  fuelCostUSD: z.number().describe('Fuel cost in USD.'),
  explanation: z.string().describe('Explanation of why this route is optimal'),
});
export type OptimizeFlightRouteOutput = z.infer<
  typeof OptimizeFlightRouteOutputSchema
>;

export async function optimizeFlightRoute(
  input: OptimizeFlightRouteInput
): Promise<OptimizeFlightRouteOutput> {
  return optimizeFlightRouteFlow(input);
}

const optimizeFlightRoutePrompt = ai.definePrompt({
  name: 'optimizeFlightRoutePrompt',
  input: {schema: OptimizeFlightRouteInputSchema},
  output: {schema: OptimizeFlightRouteOutputSchema},
  prompt: `You are a flight route optimization expert. Given the origin, destination, current time, aircraft type, and any airline preferences, provide the optimal flight route, estimated fuel burn in US gallons, and the fuel cost in USD.  Consider weather conditions, traffic patterns, and airline preferences to minimize fuel consumption and operational expenses.

Origin: {{{origin}}}
Destination: {{{destination}}}
Current Date and Time: {{{currentDateTime}}}
Aircraft Type: {{{aircraftType}}}
Airline Preferences: {{{airlinePreferences}}}

Ensure that the optimizedRoute is a concise and practical route description, and the estimatedFuelBurn and fuelCostUSD are realistic estimates.
Explain why the route is optimal in the explanation field.`,
});

const optimizeFlightRouteFlow = ai.defineFlow(
  {
    name: 'optimizeFlightRouteFlow',
    inputSchema: OptimizeFlightRouteInputSchema,
    outputSchema: OptimizeFlightRouteOutputSchema,
  },
  async input => {
    const {output} = await optimizeFlightRoutePrompt(input);
    return output!;
  }
);
