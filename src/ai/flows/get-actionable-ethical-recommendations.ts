// This file holds the Genkit flow for generating actionable ethical recommendations.

'use server';

/**
 * @fileOverview Provides an AI flow to generate actionable recommendations for resolving ethical dilemmas at work.
 *
 * - getActionableEthicalRecommendations - A function that takes an ethical dilemma as input and returns actionable recommendations.
 * - GetActionableEthicalRecommendationsInput - The input type for the getActionableEthicalRecommendations function.
 * - GetActionableEthicalRecommendationsOutput - The return type for the getActionableEthicalRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetActionableEthicalRecommendationsInputSchema = z.object({
  ethicalDilemma: z
    .string()
    .describe('A description of the ethical dilemma encountered at work.'),
});

export type GetActionableEthicalRecommendationsInput = z.infer<
  typeof GetActionableEthicalRecommendationsInputSchema
>;

const GetActionableEthicalRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe(
      'A list of actionable recommendations for resolving the ethical dilemma.'
    ),
});

export type GetActionableEthicalRecommendationsOutput = z.infer<
  typeof GetActionableEthicalRecommendationsOutputSchema
>;

export async function getActionableEthicalRecommendations(
  input: GetActionableEthicalRecommendationsInput
): Promise<GetActionableEthicalRecommendationsOutput> {
  return getActionableEthicalRecommendationsFlow(input);
}

const actionableEthicalRecommendationsPrompt = ai.definePrompt({
  name: 'actionableEthicalRecommendationsPrompt',
  input: {schema: GetActionableEthicalRecommendationsInputSchema},
  output: {schema: GetActionableEthicalRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide actionable recommendations for resolving ethical dilemmas in the workplace.  The goal is to translate abstract ethical principles into concrete, implementable steps.

  Given the following ethical dilemma, provide a list of actionable recommendations that the employee can take to resolve it. Each recommendation should be a specific, concrete action. Return the answer as a numbered list.

Ethical Dilemma: {{{ethicalDilemma}}} `,
});

const getActionableEthicalRecommendationsFlow = ai.defineFlow(
  {
    name: 'getActionableEthicalRecommendationsFlow',
    inputSchema: GetActionableEthicalRecommendationsInputSchema,
    outputSchema: GetActionableEthicalRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await actionableEthicalRecommendationsPrompt(input);
    return output!;
  }
);
