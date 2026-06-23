import { AuthLoadingCard } from '@/app/auth-loading-card';

export default function RegisterLoading() {
  return (
    <AuthLoadingCard
      titleWidth="w-44"
      descriptionWidth="w-60 max-w-full"
      footerWidth="w-40"
    />
  );
}
