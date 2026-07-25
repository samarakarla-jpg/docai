"use client";

import { StatusState } from "@/components/ui/status-state";

type DashboardErrorProps = {
  reset: () => void;
};

export default function DashboardError({ reset }: DashboardErrorProps) {
  return (
    <StatusState
      description="Não foi possível carregar esta área. Tente novamente."
      title="Algo deu errado"
      variant="error"
    >
      <button
        className="rounded-lg bg-slate-950 px-4 py-2.5 font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        onClick={reset}
        type="button"
      >
        Tentar novamente
      </button>
    </StatusState>
  );
}
