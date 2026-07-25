"use client";

import type { RefObject } from "react";

import { signOut } from "@/app/actions/auth";

type HeaderProps = Readonly<{
  isNavigationOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  onMenuToggle: () => void;
}>;

export function Header({
  isNavigationOpen,
  menuButtonRef,
  onMenuToggle,
}: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex min-h-[4.5rem] items-center justify-between gap-4 px-4 sm:px-8 lg:px-10">
        <div className="flex min-w-0 items-center gap-3">
          <button
            aria-controls="authenticated-navigation"
            aria-expanded={isNavigationOpen}
            aria-label={
              isNavigationOpen ? "Fechar navegação" : "Abrir navegação"
            }
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 lg:hidden"
            onClick={onMenuToggle}
            ref={menuButtonRef}
            type="button"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              {isNavigationOpen ? "×" : "☰"}
            </span>
          </button>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-950">
              SaaS Starter Kit
            </p>
            <p className="truncate text-xs text-slate-500">
              Área autenticada
            </p>
          </div>
        </div>

        <form action={signOut}>
          <button
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            type="submit"
          >
            Sair
          </button>
        </form>
      </div>
    </header>
  );
}
