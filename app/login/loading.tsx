import { AuthLoadingCard } from '@/app/auth-loading-card';

export default function LoginLoading() {
  return (
    <AuthLoadingCard
      titleWidth="w-20"
      descriptionWidth="w-72 max-w-full"
      footerWidth="w-44"
    />
  );
}
