'use server';

/**
 * @fileOverview This file defines a Genkit flow for calculating the estimated fuel burn and monetary cost of a flight.
 *
 * - calculateFuelCost - A function that calculates the fuel cost based on atmospheric conditions and route.
 * - CalculateFuelCostInput - The input type for the calculateFuelCost function.
 * - CalculateFuelCostOutput - The return type for the calculateFuelCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateFuelCostInputSchema = z.object({
  route: z.string().describe('The flight route (e.g., EBB to JFK).'),
  aircraftType: z.string().describe('The type of aircraft (e.g., Boeing 787).'),
  currentFuelPrice: z
    .number()
    .describe('The current fuel price in USD per gallon.'),
  atmosphericConditions: z
    .string()
    .describe('Description of atmospheric conditions (e.g., wind speed and direction, temperature).'),
});
export type CalculateFuelCostInput = z.infer<typeof CalculateFuelCostInputSchema>;

const CalculateFuelCostOutputSchema = z.object({
  estimatedFuelBurn: z
    .number()
    .describe('The estimated fuel burn in US gallons.'),
  estimatedCost: z.number().describe('The estimated fuel cost in USD.'),
  route: z.string().describe('The flight route (e.g., EBB to JFK).'),
});
export type CalculateFuelCostOutput = z.infer<typeof CalculateFuelCostOutputSchema>;

export async function calculateFuelCost(
  input: CalculateFuelCostInput
): Promise<CalculateFuelCostOutput> {
  return calculateFuelCostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'calculateFuelCostPrompt',
  input: {schema: CalculateFuelCostInputSchema},
  output: {schema: CalculateFuelCostOutputSchema},
  prompt: `You are a flight operations expert. Calculate the estimated fuel burn and cost for the provided flight route, aircraft type, current fuel price, and atmospheric conditions.

Route: {{{route}}}
Aircraft Type: {{{aircraftType}}}
Current Fuel Price (USD per gallon): {{{currentFuelPrice}}}
Atmospheric Conditions: {{{atmosphericConditions}}}

Provide the estimated fuel burn in US gallons and the estimated fuel cost in USD.
`,
});

const calculateFuelCostFlow = ai.defineFlow(
  {
    name: 'calculateFuelCostFlow',
    inputSchema: CalculateFuelCostInputSchema,
    outputSchema: CalculateFuelCostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
