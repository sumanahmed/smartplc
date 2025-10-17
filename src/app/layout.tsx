// src/app/layout.tsx
import type { Metadata } from 'next';
// import { GeistSans, GeistMono } from 'geist/font';
import FrontendLayout from '@/components/frontend/FrontendLayout';
import './globals.css';
import ToastProvider from "./common/ToastProvider";

const OG_URL = 'http://smart-plc-ec-system.test/';

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
        <FrontendLayout>
          {children}
        </FrontendLayout>
        <ToastProvider />
      </body>
    </html>
  );
}