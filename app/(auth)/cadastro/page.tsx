"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signUp } from "@/app/actions/auth";
import type { AuthActionState } from "@/lib/auth/types";

const INITIAL_STATE: AuthActionState = {
  status: "idle",
};

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(signUp, INITIAL_STATE);
  const messageId = "sign-up-message";

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16 sm:px-10">
      <section
        aria-labelledby="sign-up-title"
        className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 shadow-sm sm:p-10"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
          Acesso
        </p>
        <h1
          id="sign-up-title"
          className="mt-3 text-3xl font-semibold tracking-tight text-slate-950"
        >
          Criar conta
        </h1>
        <p className="mt-3 leading-7 text-slate-600">
          Use um e-mail válido e uma senha com pelo menos oito caracteres.
        </p>

        <form
          action={formAction}
          aria-describedby={state.message ? messageId : undefined}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              className="text-sm font-medium text-slate-800"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              aria-describedby={
                state.fieldErrors?.email ? "sign-up-email-error" : undefined
              }
              aria-invalid={Boolean(state.fieldErrors?.email)}
              autoComplete="email"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none transition focus:border-slate-600 focus:ring-2 focus:ring-slate-200"
              id="email"
              name="email"
              required
              type="email"
            />
            {state.fieldErrors?.email ? (
              <p
                className="mt-2 text-sm text-red-700"
                id="sign-up-email-error"
              >
                {state.fieldErrors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-800"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              aria-describedby={
                state.fieldErrors?.password
                  ? "sign-up-password-error"
                  : "sign-up-password-help"
              }
              aria-invalid={Boolean(state.fieldErrors?.password)}
              autoComplete="new-password"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none transition focus:border-slate-600 focus:ring-2 focus:ring-slate-200"
              id="password"
              maxLength={128}
              minLength={8}
              name="password"
              required
              type="password"
            />
            <p
              className="mt-2 text-sm text-slate-500"
              id="sign-up-password-help"
            >
              Entre 8 e 128 caracteres.
            </p>
            {state.fieldErrors?.password ? (
              <p
                className="mt-2 text-sm text-red-700"
                id="sign-up-password-error"
              >
                {state.fieldErrors.password}
              </p>
            ) : null}
          </div>

          {state.message ? (
            <p
              className={
                state.status === "success"
                  ? "rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800"
                  : "rounded-lg bg-red-50 p-3 text-sm text-red-800"
              }
              id={messageId}
              role={state.status === "error" ? "alert" : "status"}
            >
              {state.message}
            </p>
          ) : null}

          <button
            className="w-full rounded-lg bg-slate-950 px-4 py-2.5 font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={pending}
            type="submit"
          >
            {pending ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Já possui uma conta?{" "}
          <Link
            className="font-medium text-slate-950 underline underline-offset-4"
            href="/login"
          >
            Entrar
          </Link>
        </p>
      </section>
    </main>
  );
}
