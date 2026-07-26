"use server";

import { redirect } from "next/navigation";

import { createWritableAuthClient } from "@/lib/auth/server";
import type { AuthActionState } from "@/lib/auth/types";
import { validateCredentials } from "@/lib/auth/validation";

export async function signUp(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  console.log("[signUp] Server action started");

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
    console.log("[signUp] Creating Supabase auth client");
    const supabase = await createWritableAuthClient();
    console.log("[signUp] Before supabase.auth.signUp()");
    const signUpResult = await supabase.auth.signUp(validation.data);
    console.log("[signUp] After supabase.auth.signUp()", {
      hasError: Boolean(signUpResult.error),
      hasSession: Boolean(signUpResult.data.session),
      hasUser: Boolean(signUpResult.data.user),
    });

    const { data, error } = signUpResult;

    if (error) {
      console.log("[signUp] Complete Supabase error object", error);
      console.error("Supabase sign-up error", {
        status: error.status,
        code: error.code,
        message: error.message,
        error,
      });

      return {
        message:
          "Não foi possível criar a conta. Verifique os dados ou utilize outro e-mail.",
        status: "error",
      };
    }

    hasSession = Boolean(data.session);
  } catch (error) {
    console.error("Unexpected Supabase sign-up error", {
      status:
        error && typeof error === "object" && "status" in error
          ? error.status
          : undefined,
      code:
        error && typeof error === "object" && "code" in error
          ? error.code
          : undefined,
      message: error instanceof Error ? error.message : String(error),
      error,
    });

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
