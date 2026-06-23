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
    <Card className="w-full max-w-sm bg-card/90">
      <CardHeader className="gap-2">
        <div className="mb-2 flex size-10 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary-foreground">
          <AnchorIcon className="size-5 text-primary" aria-hidden="true" />
        </div>
        <CardTitle className="font-mono text-2xl">Log in</CardTitle>
        <CardDescription>
          Enter your username and password to access Dark Bay.
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
  );
}
