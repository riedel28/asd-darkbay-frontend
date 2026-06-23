import type { Metadata } from 'next';
import { Geist, Geist_Mono, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { AnchorIcon } from 'lucide-react';
import Link from 'next/link';
import { getCurrentUsername, isAuthenticated } from '@/lib/auth';
import { logoutAction } from '@/lib/authActions';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-sans'
});

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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authenticated = await isAuthenticated();
  const currentUsername = authenticated ? await getCurrentUsername() : null;

  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'dark',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        ibmPlexSans.variable
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <header className="border-b border-border/80 bg-background/92 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary shadow-[0_0_24px_oklch(0.734_0.118_200.34_/_0.18)]">
                <AnchorIcon className="size-4" aria-hidden="true" />
              </span>
              <span className="font-mono text-base font-semibold text-foreground">
                Dark Bay
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              {authenticated ? (
                <>
                  {currentUsername && (
                    <span className="max-w-32 truncate px-2 py-1 font-mono text-xs font-semibold">
                      {currentUsername}
                    </span>
                  )}
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="rounded-sm border border-primary/45 bg-primary/15 px-2 py-1 font-medium text-primary transition hover:bg-primary/25"
                    >
                      Log out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-sm px-2 py-1 font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    Log in
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
