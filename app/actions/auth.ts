"use server";

import { redirect } from "next/navigation";

import { createWritableAuthClient } from "@/lib/auth/server";
import type { AuthActionState } from "@/lib/auth/types";
import { validateCredentials } from "@/lib/auth/validation";

export async function signUp(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const validation = validateCredentials(formData);

  if (!validation.valid) {
    return {
      fieldErrors: validation.fieldErrors,
      message: "Revise os campos indicados.",
      status: "error",
    };
  }

  let hasSession = false;

  try {
    const supabase = await createWritableAuthClient();
    const { data, error } = await supabase.auth.signUp(validation.data);

    if (error) {
      return {
        message:
          "Não foi possível criar a conta. Verifique os dados ou utilize outro e-mail.",
        status: "error",
      };
    }

    hasSession = Boolean(data.session);
  } catch {
    return {
      message:
        "O serviço de autenticação está indisponível. Tente novamente mais tarde.",
      status: "error",
    };
  }

  if (hasSession) {
    redirect("/dashboard");
  }

  return {
    message:
      "Conta criada. Confirme seu e-mail antes de entrar no ambiente de produção.",
    status: "success",
  };
}

export async function signIn(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const validation = validateCredentials(formData);

  if (!validation.valid) {
    return {
      fieldErrors: validation.fieldErrors,
      message: "Revise os campos indicados.",
      status: "error",
    };
  }

  let authenticated = false;

  try {
    const supabase = await createWritableAuthClient();
    const { error } = await supabase.auth.signInWithPassword(validation.data);

    authenticated = !error;
  } catch {
    return {
      message:
        "O serviço de autenticação está indisponível. Tente novamente mais tarde.",
      status: "error",
    };
  }

  if (!authenticated) {
    return {
      message: "E-mail ou senha inválidos.",
      status: "error",
    };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createWritableAuthClient();
  const { error } = await supabase.auth.signOut({ scope: "local" });

  if (error) {
    redirect("/dashboard?logout=error");
  }

  redirect("/login");
}
