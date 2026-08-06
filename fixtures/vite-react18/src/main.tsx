import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Dialog, Progress } from 'dangf-ui';
import { ImageWithFallback } from 'dangf-ui/media';
import { EmptyState } from 'dangf-ui/patterns';
import { GlowCard } from 'dangf-ui/patterns/marketing';
import 'dangf-ui/styles.css';
import 'dangf-ui/themes/warm.css';

function App() {
  const [open, setOpen] = useState(false);
  return (
    <main className="dgf-theme-warm" style={{ margin: '3rem auto', maxWidth: 720 }}>
      <GlowCard>
        <h1>React 18 + Vite smoke fixture</h1>
        <Progress value={64} showValue />
        <ImageWithFallback src={null} alt="Fallback sample" wrapperClassName="dgf:h-32" />
        <EmptyState title="Ready to consume" />
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
      </GlowCard>
      <Dialog open={open} onOpenChange={setOpen} title="Tarball import works">
        This fixture installs the packed package instead of importing source files.
      </Dialog>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
);
