'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

interface FrontendLayoutProps {
  children: React.ReactNode;
}

export default function FrontendLayout({ children }: FrontendLayoutProps) {
  const pathname = usePathname();
  
  if (pathname.startsWith('/admin')) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
