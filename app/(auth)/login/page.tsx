"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

import { signIn } from "@/app/actions/auth";
import type { AuthActionState } from "@/lib/auth/types";

const INITIAL_STATE: AuthActionState = {
  status: "idle",
};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signIn, INITIAL_STATE);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const messageId = "login-message";

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16 sm:px-10">
      <section
        aria-labelledby="login-title"
        className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 shadow-sm sm:p-10"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
          Acesso
        </p>
        <h1
          id="login-title"
          className="mt-3 text-3xl font-semibold tracking-tight text-slate-950"
        >
          Entrar
        </h1>
        <p className="mt-3 leading-7 text-slate-600">
          Informe suas credenciais para acessar a área protegida.
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
                state.fieldErrors?.email ? "login-email-error" : undefined
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
              <p className="mt-2 text-sm text-red-700" id="login-email-error">
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
            <div className="relative mt-2">
              <input
                aria-describedby={
                  state.fieldErrors?.password
                    ? "login-password-error"
                    : undefined
                }
                aria-invalid={Boolean(state.fieldErrors?.password)}
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-24 text-slate-950 outline-none transition focus:border-slate-600 focus:ring-2 focus:ring-slate-200"
                id="password"
                maxLength={128}
                minLength={8}
                name="password"
                required
                type={isPasswordVisible ? "text" : "password"}
              />
              <button
                aria-label={
                  isPasswordVisible ? "Ocultar senha" : "Mostrar senha"
                }
                className="absolute inset-y-0 right-3 text-sm font-medium text-slate-700 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                type="button"
              >
                {isPasswordVisible ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {state.fieldErrors?.password ? (
              <p
                className="mt-2 text-sm text-red-700"
                id="login-password-error"
              >
                {state.fieldErrors.password}
              </p>
            ) : null}
          </div>

          {state.message ? (
            <p
              className="rounded-lg bg-red-50 p-3 text-sm text-red-800"
              id={messageId}
              role="alert"
            >
              {state.message}
            </p>
          ) : null}

          <button
            className="w-full rounded-lg bg-slate-950 px-4 py-2.5 font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={pending}
            type="submit"
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Ainda não possui uma conta?{" "}
          <Link
            className="font-medium text-slate-950 underline underline-offset-4"
            href="/cadastro"
          >
            Criar conta
          </Link>
        </p>
      </section>
    </main>
  );
}
