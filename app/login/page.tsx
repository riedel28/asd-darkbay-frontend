import Link from 'next/link';
import { AnchorIcon } from 'lucide-react';
import { LoginForm } from './login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-53px)] items-center justify-center bg-muted/30 px-4 py-10">
      <Card className="w-full max-w-sm bg-background">
        <CardHeader className="gap-2">
          <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary-foreground">
            <AnchorIcon className="size-5 text-primary" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl">Log in</CardTitle>
          <CardDescription>
            Enter your details to access Dark Bay.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />

          <p className="mt-5 text-center text-sm text-muted-foreground">
            New here?{' '}
            <Link
              className="font-medium text-primary hover:underline"
              href="/register"
            >
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
