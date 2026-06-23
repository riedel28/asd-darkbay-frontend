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
      <body className="relative flex min-h-full w-full flex-col overflow-x-hidden">
        <header className="sticky top-0 z-40 shrink-0 border-b border-border/80 bg-background/92 backdrop-blur">
          <div className="mx-auto flex min-h-[50px] max-w-6xl items-center justify-between gap-3 px-4 py-2">
            <Link href="/" className="flex min-w-0 items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary shadow-[0_0_24px_oklch(0.734_0.118_200.34_/_0.18)]">
                <AnchorIcon className="size-4" aria-hidden="true" />
              </span>
              <span className="truncate font-mono text-base font-semibold text-foreground">
                Dark Bay
              </span>
            </Link>
            <nav className="flex min-w-0 items-center gap-2 text-sm">
              {authenticated ? (
                <>
                  {currentUsername && (
                    <span className="hidden max-w-32 truncate px-1 font-mono text-xs font-semibold text-muted-foreground sm:inline">
                      {currentUsername}
                    </span>
                  )}
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-background/80 px-2.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:bg-muted hover:text-primary"
                    >
                      Log out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-background/80 px-2.5 font-semibold text-foreground transition hover:border-primary/50 hover:bg-muted hover:text-primary"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex h-8 items-center justify-center rounded-sm border border-primary bg-primary px-2.5 font-semibold text-primary-foreground shadow-[0_0_24px_oklch(0.734_0.118_200.34_/_0.18)] transition hover:border-primary/85 hover:bg-primary/85"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
        <main className="flex w-full min-w-0 max-w-full flex-1 flex-col overflow-x-hidden px-4 py-6 sm:px-6 lg:py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
