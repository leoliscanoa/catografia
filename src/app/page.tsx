import {
  Cog,
  BarChart3,
  DollarSign,
  Heart,
  Handshake,
  Users,
  Globe,
  Building,
  Flag,
  Scale,
  User,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainHeartIcon, PuzzlePiecePersonIcon } from '@/components/icons';
import { PageHeader } from '@/components/page-header';

const forces = [
  {
    name: 'Exigencia Técnica y Económica',
    icons: [Cog, BarChart3, DollarSign],
    color: 'text-primary',
    position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full',
  },
  {
    name: 'Dimensión Humana y Ética',
    icons: [Heart, Handshake, Users],
    color: 'text-accent',
    position: 'bottom-0 -left-8',
  },
  {
    name: 'Contexto y Factores Externos',
    icons: [Globe, Building, Flag],
    color: 'text-amber-600',
    position: 'bottom-0 -right-8',
  },
];

const conditions = [
  {
    title: 'Epicentro de Presiones',
    text: 'El profesional como nodo central donde convergen las demandas del mercado, las necesidades del equipo y las presiones externas.',
  },
  {
    title: 'Visión Tecnócrata',
    text: 'Prioridad en la "utilidad" y la "competitividad" sobre la formación integral y el bienestar humano.',
  },
  {
    title: 'Impacto del Contexto',
    text: 'La burocracia, las leyes y la diversidad cultural (ej. LatAm) son factores determinantes que afectan la ejecución técnica.',
  },
];

const challenges = [
  {
    title: 'Evitar la Deshumanización',
    icon: PuzzlePiecePersonIcon,
    text: 'Riesgo de ver a los colaboradores y usuarios como "recursos intercambiables", causando la "pérdida de la dignidad humana".',
  },
  {
    title: 'Desarrollar la "Praxis"',
    icon: BrainHeartIcon,
    text: 'Integrar el conocimiento técnico con los valores morales en cada decisión. Ir más allá del simple "entrenamiento" hacia una formación ética.',
  },
  {
    title: 'Asumir la Responsabilidad',
    icon: Scale,
    text: 'Reconocer que cada acción tecnológica y decisión de liderazgo tiene un impacto directo en los derechos y la vida de los demás.',
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 overflow-x-hidden">
      <PageHeader
        title="El Profesional en la Encrucijada"
        description="La Tensión entre Técnica y Humanidad"
      />

      <section className="relative my-24 flex h-64 items-center justify-center py-16 md:my-32">
        <div className="absolute z-10 rounded-full border-4 border-muted bg-background p-6 shadow-lg">
          <User className="h-24 w-24 text-foreground" />
        </div>

        {forces.map((force, index) => (
          <div
            key={force.name}
            className={`absolute flex animate-in fade-in-0 flex-col items-center gap-2 duration-700 ${force.position}`}
            style={{ animationDelay: `${index * 200}ms`}}
          >
            <div className="flex gap-3">
              {force.icons.map((Icon, i) => (
                <div key={i} className="rounded-lg border bg-card p-2 shadow-sm">
                  <Icon className={`h-6 w-6 ${force.color}`} />
                </div>
              ))}
            </div>
            <h3 className="text-center text-sm font-semibold text-muted-foreground md:text-base">
              {force.name}
            </h3>
          </div>
        ))}
      </section>

      <section id="conditions" className="my-16">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Condiciones de la Práctica Profesional
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {conditions.map((condition, index) => (
            <Card key={condition.title} className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 150}ms`}}>
              <CardHeader>
                <CardTitle className="text-xl">{condition.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{condition.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="challenges" className="my-16">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Retos Fundamentales
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {challenges.map((challenge, index) => (
            <Card key={challenge.title} className="flex animate-in fade-in-0 slide-in-from-bottom-4 flex-col items-center text-center duration-500" style={{ animationDelay: `${500 + index * 150}ms`}}>
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <challenge.icon className="h-8 w-8" />
                </div>
                <CardTitle className="pt-4 text-xl">{challenge.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{challenge.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
