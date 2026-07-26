"use client";

import type { RefObject } from "react";

type HeaderProps = Readonly<{
  isNavigationOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  onMenuToggle: () => void;
  userEmail: string;
  userName: string;
}>;

export function Header({
  isNavigationOpen,
  menuButtonRef,
  onMenuToggle,
  userEmail,
  userName,
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
              Dashboard
            </p>
            <p className="truncate text-xs text-slate-500">
              Área autenticada
            </p>
          </div>
        </div>

        <div className="min-w-0 text-right">
          <p className="truncate text-sm font-semibold text-slate-950">
            {userName}
          </p>
          <p className="truncate text-xs text-slate-500">{userEmail}</p>
        </div>
      </div>
    </header>
  );
}
