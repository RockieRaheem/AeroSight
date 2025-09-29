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
  type: z.string().describe('The type of the result, e.g., "Flight Route", "Maintenance Task", "Fuel Cost Record", "Flight Delay"'),
  title: z.string().describe('A descriptive title for the search result item.'),
  summary: z.string().describe('A brief summary of the search result item.'),
  link: z.string().describe('A URL link to the relevant page within the application, if applicable.'),
  data: z.any().optional().describe('Structured data associated with the result, if any.'),
});

const SearchAeroSightInputSchema = z.object({
  query: z.string().describe('The user\'s natural language search query.'),
});
export type SearchAeroSightInput = z.infer<typeof SearchAeroSightInputSchema>;

const SearchAeroSightOutputSchema = z.object({
  summary: z.string().describe('A concise, conversational summary of the findings.'),
  results: z.array(SearchResultItemSchema).describe('An array of structured search results.'),
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
  prompt: `You are a sophisticated search assistant for the AeroSight aviation operations application. Your task is to understand a user's natural language query and provide a direct, comprehensive answer by synthesizing information from various data sources.

You have access to the following data domains:
- Flight Routes (e.g., optimized routes between airports like EBB and JFK)
- Maintenance Schedules (e.g., tasks for specific aircraft like Boeing 787)
- Fuel Cost Calculations (e.g., cost analysis for routes)
- Flight Delay Predictions (e.g., probability of delay for a given flight number)

**Instructions:**
1.  **Synthesize a Summary:** First, create a conversational summary that directly answers the user's query. This should be your primary output.
2.  **Provide Structured Results:** Then, provide a list of structured data items that support your summary. For each item, specify its type, title, a brief summary, and a relevant link to a page in the application. If no specific data is relevant, you can return an empty array for the results.
3.  **Simulate Realistic Data:** Generate realistic but simulated data for your answers.

**Available Application Pages:**
- /dashboard/route-optimizer
- /dashboard/maintenance
- /dashboard/fuel-cost
- /dashboard (for general flight info like delays)

**Search Query:** {{{query}}}

**Example for query "Boeing 787 maintenance status":**
- **Summary:** "I found two upcoming maintenance tasks for the Boeing 787 fleet. The primary one is a scheduled 'Engine and Avionics Systems Check' to review component lifecycles. There is also a 'Fuel System Inspection' recommended for the next A-Check."
- **Results:**
  - Type: "Maintenance Task", Title: "Boeing 787 - Engine and Avionics Systems Check", Summary: "Scheduled maintenance focusing on component lifecycle checks for the Boeing 787 fleet.", Link: "/dashboard/maintenance"
  - Type: "Maintenance Task", Title: "Boeing 787 - Fuel System Inspection", Summary: "Recommended inspection of the fuel delivery system during the next A-Check.", Link: "/dashboard/maintenance"

**Example for query "delays for flight KQ414":**
- **Summary:** "Flight KQ414 currently has a 35% probability of a delay, with an estimated delay time of 20 minutes due to projected runway congestion."
- **Results:**
  - Type: "Flight Delay", Title: "Delay Prediction: KQ414", Summary: "35% chance of a 20-minute delay.", Link: "/dashboard"

Your goal is to be a helpful assistant, not just a search index. Provide clear, direct answers.
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
