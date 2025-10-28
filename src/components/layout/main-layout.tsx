'use client';

import * as React from 'react';
import { Cog } from 'lucide-react';
import { cn } from '@/lib/utils';

function AppHeader() {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4'
      )}
    >
      <div className="flex items-center gap-2 font-semibold">
        <Cog
          className="h-6 w-6 shrink-0 animate-spin text-primary"
          style={{ animationDuration: '5s' }}
        />
        <span className="truncate">Ethical Tech Compass</span>
      </div>
    </header>
  );
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
