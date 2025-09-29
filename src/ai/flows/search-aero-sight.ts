'use server';

/**
 * @fileOverview This file defines a Genkit flow for searching across AeroSight data.
 *
 * - searchAeroSight - A function that searches flight routes, maintenance schedules, and other data.
 * - SearchAeroSightInput - The input type for the searchAeroSight function.
 * - SearchAeroSightOutput - The return type for the searchAeroSight function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchResultItemSchema = z.object({
  type: z.string().describe('The type of the result, e.g., "Flight Route", "Maintenance Task", "Fuel Cost Record".'),
  title: z.string().describe('A descriptive title for the search result item.'),
  summary: z.string().describe('A brief summary of the search result item.'),
  link: z.string().describe('A URL link to the relevant page within the application.'),
});

const SearchAeroSightInputSchema = z.object({
  query: z.string().describe('The user\'s search query.'),
});
export type SearchAeroSightInput = z.infer<typeof SearchAeroSightInputSchema>;

const SearchAeroSightOutputSchema = z.object({
  results: z.array(SearchResultItemSchema).describe('An array of search results.'),
});
export type SearchAeroSightOutput = z.infer<typeof SearchAeroSightOutputSchema>;


export async function searchAeroSight(
  input: SearchAeroSightInput
): Promise<SearchAeroSightOutput> {
  return searchAeroSightFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchAeroSightPrompt',
  input: {schema: SearchAeroSightInputSchema},
  output: {schema: SearchAeroSightOutputSchema},
  prompt: `You are a search expert for the AeroSight aviation operations application. Your task is to find relevant information based on a user's query.

You have access to the following data sources:
- Flight Routes (e.g., EBB to JFK, optimized routes)
- Maintenance Schedules (e.g., tasks for Boeing 787, component checks)
- Fuel Cost Calculations (e.g., cost for a specific route)
- Flight Delay Predictions

Based on the user's query, search across all these data sources and return a list of relevant results. For each result, provide the type, a title, a summary, and a link to the relevant page in the dashboard.

Available pages are:
- /dashboard/route-optimizer
- /dashboard/maintenance
- /dashboard/fuel-cost
- /dashboard (for general flight info like delays)

Search Query: {{{query}}}

Example for query "Boeing 787 maintenance":
- Type: "Maintenance Task", Title: "Boeing 787 - Engine and Avionics Systems Check", Summary: "Scheduled maintenance focusing on component lifecycle checks for the Boeing 787 fleet.", Link: "/dashboard/maintenance"
- Type: "Fuel Cost", Title: "Fuel Cost: EBB to JFK (Boeing 787)", Summary: "Estimated fuel cost and burn for a flight from EBB to JFK using a Boeing 787.", Link: "/dashboard/fuel-cost"

Generate realistic but simulated data for the search results.
`,
});

const searchAeroSightFlow = ai.defineFlow(
  {
    name: 'searchAeroSightFlow',
    inputSchema: SearchAeroSightInputSchema,
    outputSchema: SearchAeroSightOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
