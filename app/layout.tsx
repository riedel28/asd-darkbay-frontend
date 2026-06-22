import type { Metadata } from 'next';
import { Geist, Geist_Mono, Figtree } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { AnchorIcon } from 'lucide-react';
import Link from 'next/link';

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Dark Bay',
  description: 'An underground auction marketplace.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        figtree.variable
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <header className="flex px-4 py-2 border-0 border-b bg-primary text-white">
          <Link href="/" className="flex gap-2 items-center">
            <AnchorIcon className="size-4" aria-hidden="true" />
            <span className="font-semibold text-lg">Dark Bay</span>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
