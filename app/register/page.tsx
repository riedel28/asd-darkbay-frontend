import Link from 'next/link';
import { AnchorIcon } from 'lucide-react';
import { RegisterForm } from './register-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-sm bg-card/90">
        <CardHeader className="gap-2">
          <div className="mb-2 flex size-10 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
            <AnchorIcon className="size-5" aria-hidden="true" />
          </div>
          <CardTitle className="font-mono text-2xl">Create account</CardTitle>
          <CardDescription>
            Register to list auctions and place bids.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already registered?{' '}
            <Link
              className="font-medium text-primary hover:underline"
              href="/login"
            >
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
