'use client';

import { useFormStatus } from 'react-dom';
import { Button, type ButtonProps } from './ui/button';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function SubmitButton({ children, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button {...props} disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}
