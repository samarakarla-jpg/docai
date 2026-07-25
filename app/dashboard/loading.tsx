import { StatusState } from "@/components/ui/status-state";

export default function DashboardLoading() {
  return (
    <StatusState
      description="A área autenticada está sendo preparada."
      title="Carregando conteúdo"
      variant="loading"
    />
  );
}
