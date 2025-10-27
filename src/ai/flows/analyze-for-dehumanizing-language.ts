'use server';
/**
 * @fileOverview Analyzes text for language that could lead to dehumanization.
 *
 * - analyzeForDehumanizingLanguage - A function that analyzes text for dehumanizing language.
 * - AnalyzeForDehumanizingLanguageInput - The input type for the analyzeForDehumanizingLanguage function.
 * - AnalyzeForDehumanizingLanguageOutput - The return type for the analyzeForDehumanizingLanguage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeForDehumanizingLanguageInputSchema = z.object({
  text: z
    .string()
    .describe(
      'The text to analyze for language that could lead to dehumanization.'
    ),
});
export type AnalyzeForDehumanizingLanguageInput = z.infer<
  typeof AnalyzeForDehumanizingLanguageInputSchema
>;

const AnalyzeForDehumanizingLanguageOutputSchema = z.object({
  hasDehumanizingLanguage: z
    .boolean()
    .describe(
      'Whether or not the text contains language that could lead to dehumanization.'
    ),
  dehumanizingLanguageExamples: z
    .array(z.string())
    .describe(
      'Examples of language that could lead to dehumanization, if any.'
    ),
});
export type AnalyzeForDehumanizingLanguageOutput = z.infer<
  typeof AnalyzeForDehumanizingLanguageOutputSchema
>;

export async function analyzeForDehumanizingLanguage(
  input: AnalyzeForDehumanizingLanguageInput
): Promise<AnalyzeForDehumanizingLanguageOutput> {
  return analyzeForDehumanizingLanguageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeForDehumanizingLanguagePrompt',
  input: {schema: AnalyzeForDehumanizingLanguageInputSchema},
  output: {schema: AnalyzeForDehumanizingLanguageOutputSchema},
  prompt: `You are an AI expert in identifying language that could lead to dehumanization in project documentation and team communications.

  Analyze the following text and determine if it contains language that could lead to the dehumanization of team members or end-users. Provide specific examples if possible.

  Text: {{{text}}}

  Respond in the following JSON format:
  {
    "hasDehumanizingLanguage": true or false,
    "dehumanizingLanguageExamples": ["example 1", "example 2", ...]
  }`,
});

const analyzeForDehumanizingLanguageFlow = ai.defineFlow(
  {
    name: 'analyzeForDehumanizingLanguageFlow',
    inputSchema: AnalyzeForDehumanizingLanguageInputSchema,
    outputSchema: AnalyzeForDehumanizingLanguageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
