import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - SmartPLC',
  description: 'Administrative dashboard for SmartPLC system',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="bg-gray-100">
        {children}
      </div>
  );
}
