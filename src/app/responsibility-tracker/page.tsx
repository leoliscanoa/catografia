'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2, PlusCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const formSchema = z.object({
  action: z.string().min(1, 'La acción no puede estar vacía.'),
  impact: z.string().min(1, 'El impacto no puede estar vacío.'),
});

type FormData = z.infer<typeof formSchema>;

interface TrackedItem extends FormData {
  id: string;
  date: string;
}

export default function ResponsibilityTrackerPage() {
  const [items, setItems] = useState<TrackedItem[]>([]);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      action: '',
      impact: '',
    },
  });

  function onSubmit(values: FormData) {
    const newItem: TrackedItem = {
      id: uuidv4(),
      ...values,
      date: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
    setItems((prev) => [newItem, ...prev]);
    form.reset();
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <PageHeader
        title="Seguimiento de Responsabilidad"
        description="Registra tus decisiones tecnológicas y su impacto directo en los derechos y la vida de las personas para fomentar la conciencia y la rendición de cuentas."
      />

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Añadir Nueva Entrada
          </CardTitle>
          <CardDescription>
            Documenta una acción y su impacto asociado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="action"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Acción Tecnológica o Decisión</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Lanzamiento del nuevo algoritmo de recomendación"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="impact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Impacto Directo Observado o Previsto</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: Aumentó la polarización del contenido mostrado a un segmento de usuarios."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Guardar Entrada</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{item.action}</CardTitle>
                  <CardDescription>Registrado el {item.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-foreground">Impacto:</p>
                  <p className="text-muted-foreground">{item.impact}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive ml-auto"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar entrada</span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <p>Aún no hay entradas registradas.</p>
            <p>Usa el formulario de arriba para empezar a seguir tu impacto.</p>
          </div>
        )}
      </div>
    </div>
  );
}
