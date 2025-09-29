'use server';

/**
 * @fileOverview Generates a video debriefing for a given flight.
 *
 * - generateFlightDebrief - A function that creates a flight summary video.
 * - GenerateFlightDebriefInput - The input type for the generateFlightDebrief function.
 * - GenerateFlightDebriefOutput - The return type for the generateFlightDebrief function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as fs from 'fs/promises';
import { join } from 'path';

const GenerateFlightDebriefInputSchema = z.object({
  flightNumber: z.string().describe('The flight number, e.g., "UA428".'),
  flightDate: z
    .string()
    .describe('The date of the flight in YYYY-MM-DD format.'),
});
export type GenerateFlightDebriefInput = z.infer<
  typeof GenerateFlightDebriefInputSchema
>;

const GenerateFlightDebriefOutputSchema = z.object({
  videoUrl: z
    .string()
    .describe('A data URI of the generated MP4 video.'),
  summary: z
    .string()
    .describe('A text summary of the key flight events.'),
});
export type GenerateFlightDebriefOutput = z.infer<
  typeof GenerateFlightDebriefOutputSchema
>;

export async function generateFlightDebrief(
  input: GenerateFlightDebriefInput
): Promise<GenerateFlightDebriefOutput> {
  return generateFlightDebriefFlow(input);
}

const generateFlightDebriefFlow = ai.defineFlow(
  {
    name: 'generateFlightDebriefFlow',
    inputSchema: GenerateFlightDebriefInputSchema,
    outputSchema: GenerateFlightDebriefOutputSchema,
  },
  async (input) => {
    // In a real app, you'd fetch real flight data here.
    const flightData = {
      route: 'EBB to JFK',
      departureTime: '08:00Z',
      arrivalTime: '22:00Z',
      events: [
        'on-time departure',
        'minor turbulence over the Atlantic',
        'smooth landing',
      ],
    };

    const textPrompt = `Create a short video debrief for flight ${input.flightNumber} on ${input.flightDate}. The flight was from ${flightData.route}. Key events included: ${flightData.events.join(', ')}. The video should have a professional, corporate feel, suitable for an aviation operations dashboard. Start with a title card showing the flight number and route. Show an animation of the flight path, and use icons or brief text overlays to highlight the key events.`;
    
    const summaryPrompt = `Provide a brief, professional summary for flight ${input.flightNumber} on ${input.flightDate} from ${flightData.route}. Key events: ${flightData.events.join(', ')}.`;


    // Generate video and summary in parallel.
    const [videoPromise, summaryPromise] = [
       ai.generate({
        model: 'googleai/veo-2.0-generate-001',
        prompt: textPrompt,
        config: {
            durationSeconds: 8,
            aspectRatio: '16:9',
        },
      }),
      ai.generate({
        prompt: summaryPrompt,
      }),
    ];

    let { operation } = await videoPromise;
    if (!operation) {
        throw new Error('Expected the model to return an operation');
    }

    // Wait for the video generation to complete
    while (!operation.done) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        operation = await ai.checkOperation(operation);
    }
    
    if (operation.error) {
        throw new Error('Failed to generate video: ' + operation.error.message);
    }

    const video = operation.output?.message?.content.find((p) => !!p.media);
     if (!video || !video.media?.url) {
      throw new Error('Failed to find the generated video in the operation result');
    }
    
    const summaryResult = await summaryPromise;

    return {
      videoUrl: video.media.url,
      summary: summaryResult.text,
    };
  }
);
