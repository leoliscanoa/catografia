'use client';
import { useFormState } from 'react-dom';
import { getActionableEthicalRecommendations } from '@/ai/flows/get-actionable-ethical-recommendations';
import type { GetActionableEthicalRecommendationsOutput } from '@/ai/flows/get-actionable-ethical-recommendations';
import { PageHeader } from '@/components/page-header';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SubmitButton } from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ListChecks } from 'lucide-react';

type FormState = {
  result: GetActionableEthicalRecommendationsOutput | null;
  error: string | null;
};

async function getRecommendationsAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const ethicalDilemma = formData.get('dilemma') as string;
  if (!ethicalDilemma) {
    return { result: null, error: 'La descripción del dilema no puede estar vacía.' };
  }
  try {
    const result = await getActionableEthicalRecommendations({ ethicalDilemma });
    return { result, error: null };
  } catch (e) {
    console.error(e);
    return {
      result: null,
      error: 'Ocurrió un error al generar las recomendaciones.',
    };
  }
}

const initialState: FormState = {
  result: null,
  error: null,
};

export default function RecommendationsPage() {
  const [state, formAction] = useFormState(getRecommendationsAction, initialState);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <PageHeader
        title="Recomendaciones Éticas Accionables"
        description="Transforma principios éticos abstractos en pasos claros y ejecutables para resolver dilemas complejos en el trabajo."
      />

      <Card>
        <CardHeader>
          <CardTitle>Describe tu Dilema Ético</CardTitle>
          <CardDescription>
            Explica la situación que enfrentas. La IA te proporcionará
            sugerencias de acciones concretas que puedes tomar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Textarea
              name="dilemma"
              placeholder="Ej: 'Mi jefe me pidió que implemente una función que recopila datos de usuarios sin su consentimiento explícito...'"
              className="min-h-[200px]"
              required
            />
            <SubmitButton>Obtener Recomendaciones</SubmitButton>
          </form>
        </CardContent>
      </Card>

      {state.error && (
        <Alert variant="destructive" className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.result && state.result.recommendations.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <ListChecks className="h-6 w-6 text-primary" />
              Pasos a Seguir Sugeridos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-4 pl-6 text-muted-foreground">
              {state.result.recommendations.map((rec, index) => (
                <li key={index} className="pl-2 leading-relaxed">
                  {rec}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
