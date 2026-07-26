"use client";

import { useEffect, useRef, useState } from "react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

type AuthenticatedLayoutProps = Readonly<{
  children: React.ReactNode;
  userEmail: string;
  userName: string;
}>;

export function AuthenticatedLayout({
  children,
  userEmail,
  userName,
}: AuthenticatedLayoutProps) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasNavigationOpen = useRef(false);

  useEffect(() => {
    if (isNavigationOpen) {
      closeButtonRef.current?.focus();
    } else if (wasNavigationOpen.current) {
      menuButtonRef.current?.focus();
    }

    wasNavigationOpen.current = isNavigationOpen;
  }, [isNavigationOpen]);

  useEffect(() => {
    if (!isNavigationOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsNavigationOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isNavigationOpen]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-950 focus:px-4 focus:py-2 focus:font-medium focus:text-white"
        href="#main-content"
      >
        Ir para o conteúdo principal
      </a>

      <Header
        isNavigationOpen={isNavigationOpen}
        menuButtonRef={menuButtonRef}
        onMenuToggle={() => setIsNavigationOpen((isOpen) => !isOpen)}
        userEmail={userEmail}
        userName={userName}
      />

      <div className="flex min-h-[calc(100vh-4.5rem)]">
        <Sidebar
          closeButtonRef={closeButtonRef}
          isOpen={isNavigationOpen}
          onClose={() => setIsNavigationOpen(false)}
        />

        <main
          className="min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-10 lg:px-10"
          id="main-content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
