import { redirect } from "next/navigation";

import { createReadOnlyAuthClient } from "@/lib/auth/server";

export default async function Home() {
  const supabase = await createReadOnlyAuthClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims.sub;

  if (error || typeof userId !== "string" || !userId.trim()) {
    redirect("/login");
  }

  redirect("/dashboard");
}
