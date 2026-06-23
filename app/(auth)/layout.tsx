export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-1 items-center justify-center py-10">
      {children}
    </section>
  );
}
