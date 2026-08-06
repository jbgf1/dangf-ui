'use client';

import { useState } from 'react';
import { Button, Dialog, Progress } from 'dangf-ui';
import { ImageWithFallback } from 'dangf-ui/media';
import { EmptyState } from 'dangf-ui/patterns';
import { GlowCard } from 'dangf-ui/patterns/marketing';

export function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <main className="dgf-theme-warm" style={{ margin: '3rem auto', maxWidth: 720 }}>
      <GlowCard>
        <h1>React 19 + Next.js smoke fixture</h1>
        <Progress value={82} showValue />
        <ImageWithFallback src={null} alt="Fallback sample" wrapperClassName="dgf:h-32" />
        <EmptyState title="SSR-safe package import" />
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
      </GlowCard>
      <Dialog open={open} onOpenChange={setOpen} title="App Router works">
        Interactive entry points retain the client boundary after packaging.
      </Dialog>
    </main>
  );
}
