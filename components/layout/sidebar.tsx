"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { RefObject } from "react";

import { signOut } from "@/app/actions/auth";

type SidebarProps = Readonly<{
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  isOpen: boolean;
  onClose: () => void;
}>;

const navigationItems = [
  {
    href: "/dashboard/library",
    label: "Biblioteca de Contratos",
  },
  {
    href: "/dashboard/contracts",
    label: "Meus contratos",
  },
] as const;

export function Sidebar({
  closeButtonRef,
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={`lg:block lg:h-[calc(100dvh-4.5rem)] lg:shrink-0 ${isOpen ? "block" : "hidden"}`}
      id="authenticated-navigation"
    >
      <button
        aria-label="Fechar navegação"
        className="fixed inset-0 z-20 bg-slate-950/30 lg:hidden"
        onClick={onClose}
        type="button"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex h-dvh w-72 flex-col overflow-hidden border-r border-slate-200 bg-white pt-[4.5rem] transition-transform lg:static lg:z-auto lg:h-full lg:w-64 lg:translate-x-0 lg:pt-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 lg:hidden">
          <p className="text-sm font-semibold text-slate-950">Navegação</p>
          <button
            aria-label="Fechar navegação"
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ×
            </span>
          </button>
        </div>

        <nav
          aria-label="Navegação principal"
          className="min-h-0 flex-1 overflow-y-auto px-3 py-5"
        >
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Área principal
          </p>
          <Link
            className="mb-3 block w-full rounded-lg border border-amber-300 bg-amber-200 px-3 py-2.5 text-center text-sm font-semibold text-slate-950 transition hover:border-amber-400 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            href="/dashboard/contracts/new"
            onClick={onClose}
          >
            Novo contrato
          </Link>
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const isCurrent =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href}>
                  <Link
                    aria-current={isCurrent ? "page" : undefined}
                    className={
                      isCurrent
                        ? "block rounded-lg bg-slate-100 px-3 py-2.5 text-sm font-semibold text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                        : "block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                    }
                    href={item.href}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative z-10 mt-auto shrink-0 border-t border-slate-200 bg-white p-3">
          <form action={signOut}>
            <button
              className="w-full rounded-lg bg-slate-950 px-3 py-2.5 text-left text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              type="submit"
            >
              Sair
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}
