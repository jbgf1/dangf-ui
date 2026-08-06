import type { ReactNode } from 'react';

import 'dangf-ui/styles.css';
import 'dangf-ui/themes/warm.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
