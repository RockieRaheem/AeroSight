'use server';

/**
 * @fileOverview Assesses aircraft damage based on an image and description.
 *
 * - assessDamage - A function that analyzes an image of aircraft damage.
 * - AssessDamageInput - The input type for the assessDamage function.
 * - AssessDamageOutput - The return type for the assessDamage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AssessDamageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the aircraft damage, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('A text description of the damage, including location and size.'),
});
export type AssessDamageInput = z.infer<typeof AssessDamageInputSchema>;

const AssessDamageOutputSchema = z.object({
  damageType: z.string().describe('The type of damage identified (e.g., "Dent", "Scratch", "Corrosion", "Crack").'),
  severity: z.enum(['Low', 'Medium', 'High']).describe('The assessed severity level of the damage.'),
  analysis: z.string().describe('A detailed analysis of the damage based on the image and description.'),
  recommendations: z.string().describe('Actionable recommendations for maintenance or further inspection.'),
});
export type AssessDamageOutput = z.infer<typeof AssessDamageOutputSchema>;


export async function assessDamage(input: AssessDamageInput): Promise<AssessDamageOutput> {
  return assessDamageFlow(input);
}


const prompt = ai.definePrompt({
  name: 'assessDamagePrompt',
  input: { schema: AssessDamageInputSchema },
  output: { schema: AssessDamageOutputSchema },
  prompt: `You are an expert aircraft maintenance engineer specializing in structural damage assessment. Your task is to analyze an image and description of damage on an aircraft and provide a professional assessment.

**User Input:**
- **Description:** {{{description}}}
- **Photo:** {{media url=photoDataUri}}

**Your Task:**
1.  **Identify Damage Type:** Classify the damage from the image and description (e.g., "Dent," "Scratch," "Corrosion," "Crack," "Puncture").
2.  **Assess Severity:** Determine the severity level as 'Low', 'Medium', or 'High'. Consider the type, size, and location of the damage described. For example, a crack in a critical structural component is 'High' severity, while a minor scratch on a non-critical panel is 'Low'.
3.  **Provide Analysis:** Give a brief but detailed analysis. Explain what you see in the image and how it relates to the description. Mention potential causes or implications.
4.  **Recommend Actions:** Suggest clear, actionable next steps. This could range from "Clean and monitor" for low-severity issues to "Requires immediate inspection by a qualified structural engineer as per AMM chapter X" for high-severity issues. Be specific if possible.

Generate a structured response based on the defined output schema.
`,
});

const assessDamageFlow = ai.defineFlow(
  {
    name: 'assessDamageFlow',
    inputSchema: AssessDamageInputSchema,
    outputSchema: AssessDamageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
