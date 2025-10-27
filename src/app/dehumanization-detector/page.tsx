'use client';
import { useFormState } from 'react-dom';
import { analyzeForDehumanizingLanguage } from '@/ai/flows/analyze-for-dehumanizing-language';
import type { AnalyzeForDehumanizingLanguageOutput } from '@/ai/flows/analyze-for-dehumanizing-language';
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
import { AlertCircle, CheckCircle2 } from 'lucide-react';

type FormState = {
  result: AnalyzeForDehumanizingLanguageOutput | null;
  error: string | null;
};

async function analyzeAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const text = formData.get('text') as string;
  if (!text) {
    return { result: null, error: 'El texto no puede estar vacío.' };
  }
  try {
    const result = await analyzeForDehumanizingLanguage({ text });
    return { result, error: null };
  } catch (e) {
    console.error(e);
    return { result: null, error: 'Ocurrió un error al analizar el texto.' };
  }
}

const initialState: FormState = {
  result: null,
  error: null,
};

export default function DehumanizationDetectorPage() {
  const [state, formAction] = useFormState(analyzeAction, initialState);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <PageHeader
        title="Detector de Lenguaje Deshumanizante"
        description="Analiza documentación de proyectos, comunicaciones y otros textos para identificar lenguaje que podría deshumanizar a los miembros del equipo o a los usuarios finales."
      />

      <Card>
        <CardHeader>
          <CardTitle>Analizar Texto</CardTitle>
          <CardDescription>
            Pega el texto que deseas analizar en el siguiente campo y haz clic en "Analizar".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Textarea
              name="text"
              placeholder="Ej: 'Los usuarios son solo un recurso para extraer datos.'..."
              className="min-h-[200px]"
              required
            />
            <SubmitButton>Analizar Texto</SubmitButton>
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

      {state.result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Resultados del Análisis</CardTitle>
          </CardHeader>
          <CardContent>
            {state.result.hasDehumanizingLanguage ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Riesgo Detectado</AlertTitle>
                <AlertDescription>
                  El texto contiene lenguaje que podría ser interpretado como
                  deshumanizante.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Sin Riesgo Inmediato</AlertTitle>
                <AlertDescription>
                  No se encontró lenguaje claramente deshumanizante en el texto
                  proporcionado.
                </AlertDescription>
              </Alert>
            )}

            {state.result.hasDehumanizingLanguage &&
              state.result.dehumanizingLanguageExamples.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Ejemplos Encontrados:
                  </h3>
                  <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                    {state.result.dehumanizingLanguageExamples.map(
                      (example, index) => (
                        <li key={index} className="rounded-md border p-3">
                          "{example}"
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
