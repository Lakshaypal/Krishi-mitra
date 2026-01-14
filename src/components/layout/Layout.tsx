import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="relative z-10 pt-24 pb-12">
        {children}
      </main>
    </div>
  );
}
