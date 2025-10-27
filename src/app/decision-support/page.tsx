import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/page-header';

const frameworkSteps = [
  {
    id: 'step1',
    title: '1. Identificar el Dilema',
    description:
      'Aclarar la tensión ética específica. ¿Qué valores están en conflicto? ¿Quiénes son los afectados?',
    checklist: [
      'He descrito el problema ético de forma clara y concisa.',
      'He identificado los valores fundamentales en conflicto (p. ej., privacidad vs. seguridad).',
      'He listado todas las partes interesadas (stakeholders) y cómo podrían ser afectadas.',
    ],
  },
  {
    id: 'step2',
    title: '2. Recopilar Información y Contexto',
    description:
      'Reunir todos los hechos relevantes, políticas de la empresa, y regulaciones legales aplicables.',
    checklist: [
      'He verificado los datos y separado los hechos de las suposiciones.',
      'He consultado las políticas internas de la empresa sobre ética y conducta.',
      'He investigado las leyes y regulaciones pertinentes (p. ej., GDPR, leyes de accesibilidad).',
      'He considerado el contexto cultural y social en el que se implementará la tecnología.',
    ],
  },
  {
    id: 'step3',
    title: '3. Evaluar Opciones y Consecuencias',
    description:
      'Analizar diferentes cursos de acción y sus posibles resultados, tanto positivos como negativos.',
    checklist: [
      'He generado al menos tres cursos de acción diferentes.',
      'Para cada opción, he analizado las consecuencias a corto y largo plazo.',
      'He considerado el impacto en cada uno de los stakeholders identificados.',
      'He evaluado cada opción contra principios éticos universales (justicia, equidad, no maleficencia).',
    ],
  },
  {
    id: 'step4',
    title: '4. Tomar una Decisión y Justificarla',
    description:
      'Elegir el curso de acción más ético y estar preparado para explicar el razonamiento detrás de la elección.',
    checklist: [
      'He seleccionado la opción que mejor alinea la acción técnica con los valores éticos.',
      'Puedo articular claramente por qué esta opción es la más justificable éticamente.',
      'He documentado mi proceso de toma de decisiones.',
    ],
  },
  {
    id: 'step5',
    title: '5. Implementar y Reflexionar',
    description:
      'Poner en práctica la decisión y observar sus efectos, estando abierto a corregir el rumbo si es necesario.',
    checklist: [
      'He comunicado la decisión y su justificación a las partes relevantes.',
      'He establecido un plan para monitorear el impacto de la decisión.',
      'Me he comprometido a reflexionar sobre el resultado y aprender de la experiencia.',
    ],
  },
];

export default function DecisionSupportPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <PageHeader
        title="Marco de Soporte para Decisiones Éticas"
        description="Una guía paso a paso para integrar valores morales en cada decisión tecnológica."
      />
      <Accordion type="single" collapsible className="w-full" defaultValue="step1">
        {frameworkSteps.map((step) => (
          <AccordionItem key={step.id} value={step.id}>
            <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
              {step.title}
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-6 text-muted-foreground">{step.description}</p>
              <div className="space-y-4">
                {step.checklist.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 rounded-md border p-4">
                    <Checkbox id={`${step.id}-item-${index}`} />
                    <Label htmlFor={`${step.id}-item-${index}`} className="flex-1">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
