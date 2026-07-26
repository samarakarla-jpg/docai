import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { createReadOnlyAuthClient } from "@/lib/auth/server";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createReadOnlyAuthClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const userMetadata = claims?.user_metadata;
  const userName =
    userMetadata &&
    typeof userMetadata === "object" &&
    "name" in userMetadata &&
    typeof userMetadata.name === "string"
      ? userMetadata.name
      : "Usuário";
  const userEmail =
    typeof claims?.email === "string" ? claims.email : "E-mail indisponível";

  return (
    <AuthenticatedLayout userEmail={userEmail} userName={userName}>
      {children}
    </AuthenticatedLayout>
  );
}
