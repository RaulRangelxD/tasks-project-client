import type { Metadata } from 'next';
import RootLayout from '@/components/RootLayout';

export const metadata: Metadata = {
  title: 'Task Notifications',
  description: 'Create by RaulRangelxD',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es'>
      <body className='min-h-screen'>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
