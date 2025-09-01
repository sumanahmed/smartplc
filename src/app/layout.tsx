// src/app/layout.tsx
import type { Metadata } from 'next';
// import { GeistSans, GeistMono } from 'geist/font';
import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';
import './globals.css';

const OG_URL = 'https://smartplcbd.com';

export const metadata: Metadata = {
  title: 'SmartPLCBD',
  description: 'Your one-stop solution for home electrical Service',
  keywords: ['Delta', 'Omron', 'Mitsubishi', 'Keyence'],
  authors: [{ name: 'Smart PLC BD Team', url: OG_URL }],
  creator: 'Smart PC BD',
  publisher: 'Smart PLC BD Technologies Ltd.',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Header />
        <main className="min-h-screen container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}