import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { DocumentActions } from "@/components/docai/contracts/download-pdf-button";
import { createReadOnlyAuthClient } from "@/lib/auth/server";
import type { ContractType } from "@/lib/docai/domain/contract-models";
import { createSupabaseContractRepository } from "@/lib/docai/infrastructure/persistence/supabase-contract-repository";

const contractTypeLabels: Record<ContractType, string> = {
  services: "Prestação de Serviços",
  sale: "Compra e Venda",
  rental: "Aluguel",
  loan: "Empréstimo",
};

type ContractPageProps = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;

export default async function ContractPage({ params }: ContractPageProps) {
  const supabase = await createReadOnlyAuthClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims.sub;

  if (error || typeof userId !== "string" || !userId.trim()) {
    redirect("/login");
  }

  const repository = await createSupabaseContractRepository();
  const { id } = await params;
  const contract = await repository.findByIdForUser(id, userId);

  if (!contract) {
    notFound();
  }

  const isProposal = contract.documentKind === "proposal";
  const serviceNames =
    contract.serviceNames ?? (contract.serviceName ? [contract.serviceName] : []);

  return (
    <section
      aria-labelledby="saved-contract-title"
      className="mx-auto w-full max-w-5xl"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <Link
          className="inline-flex items-center self-start rounded-lg px-1 py-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          href="/dashboard/contracts"
        >
          <span aria-hidden="true" className="mr-2">
            ←
          </span>
          Propostas e contratos
        </Link>

        <DocumentActions
          document={{
            ...(contract.clientName ? { clientName: contract.clientName } : {}),
            content: contract.content,
            createdAt: formatDate(contract.createdAt),
            documentLabel: isProposal
              ? "Proposta comercial"
              : contractTypeLabels[contract.type],
            isProposal,
            ...(contract.professionName
              ? { professionName: contract.professionName }
              : {}),
            ...(contract.providerName
              ? { providerName: contract.providerName }
              : {}),
            ...(serviceNames.length > 0 ? { serviceNames } : {}),
            title: contract.title,
          }}
        />
      </div>

      <div id="printable-contract">
        <header className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              {isProposal ? "Proposta criada" : "Contrato salvo"}
            </p>
          </div>

          <div className="p-5 sm:p-8">
            <h1
              className="break-words text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
              id="saved-contract-title"
            >
              {contract.title}
            </h1>

            <dl
              className={
                isProposal
                  ? "mt-6 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2 lg:grid-cols-3"
                  : "mt-6 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:gap-10"
              }
            >
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {isProposal ? "Documento" : "Tipo"}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-blue-900">
                  {isProposal
                    ? "Proposta comercial"
                    : contractTypeLabels[contract.type]}
                </dd>
              </div>
              {isProposal && serviceNames.length > 0 ? (
                <MetadataItem
                  label={serviceNames.length === 1 ? "Serviço" : "Serviços"}
                  value={serviceNames.join(" · ")}
                />
              ) : null}
              {isProposal && contract.professionName ? (
                <MetadataItem
                  label="Profissão"
                  value={contract.professionName}
                />
              ) : null}
              {isProposal && contract.clientName ? (
                <MetadataItem label="Cliente" value={contract.clientName} />
              ) : null}
              {isProposal && contract.providerName ? (
                <MetadataItem label="Prestador" value={contract.providerName} />
              ) : null}
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Data de criação
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-700">
                  <time dateTime={contract.createdAt}>
                    {formatDate(contract.createdAt)}
                  </time>
                </dd>
              </div>
            </dl>
          </div>
        </header>

        {isProposal ? (
          <aside
            aria-labelledby="proposal-review-title"
            className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950 shadow-sm sm:p-6"
          >
            <h2 className="text-sm font-semibold" id="proposal-review-title">
              Confira antes de enviar
            </h2>
            <p className="mt-2 text-sm leading-6">
              Leia toda a proposta e confira nomes, valores, serviços e datas.
              Combine as condições com o cliente antes de enviar. Procure
              orientação jurídica profissional quando necessário.
            </p>
          </aside>
        ) : null}

        <article
          aria-labelledby="contract-content-title"
          className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 px-5 py-4 sm:px-8">
            <h2
              className="text-sm font-semibold text-slate-950"
              id="contract-content-title"
            >
              {isProposal ? "Conteúdo da proposta" : "Conteúdo do contrato"}
            </h2>
          </div>
          <div className="whitespace-pre-wrap break-words px-5 py-7 text-base leading-8 text-slate-800 sm:px-8 sm:py-9 lg:px-12 lg:py-10">
            {contract.content}
          </div>
        </article>

        <section
          aria-labelledby="contract-signatures-title"
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <h2
            className="text-sm font-semibold text-slate-950"
            id="contract-signatures-title"
          >
            Assinaturas
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-8">
            <div>
              <div className="h-12 border-b border-slate-500" />
              <p className="mt-3 text-center text-sm text-slate-600">
                Nome e assinatura
              </p>
              <p className="mt-1 text-center text-sm font-semibold text-slate-800">
                {isProposal ? "Cliente" : "Contratante"}
              </p>
            </div>
            <div>
              <div className="h-12 border-b border-slate-500" />
              <p className="mt-3 text-center text-sm text-slate-600">
                Nome e assinatura
              </p>
              <p className="mt-1 text-center text-sm font-semibold text-slate-800">
                {isProposal
                  ? "Eletricista responsável"
                  : "Contratado"}
              </p>
            </div>
          </div>
          <div className="mt-10 max-w-xs">
            <div className="h-10 border-b border-slate-500" />
            <p className="mt-3 text-center text-sm font-medium text-slate-700">
              Data da assinatura
            </p>
          </div>
        </section>
      </div>

      <style>{`
        @page {
          size: A4;
          margin: 16mm;
        }

        @media print {
          html,
          body {
            min-width: 0;
            background: #ffffff !important;
          }

          body > header,
          body header {
            display: none !important;
          }

          #authenticated-navigation {
            display: none !important;
          }

          #main-content {
            display: block !important;
            padding: 0 !important;
          }

          #main-content > section {
            max-width: none !important;
          }

          #main-content > section > :not(#printable-contract) {
            display: none !important;
          }

          #printable-contract {
            width: 100%;
            max-width: none;
            color: #172033;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          #printable-contract * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          #printable-contract > header {
            display: block !important;
            margin-top: 0;
            break-inside: avoid;
            box-shadow: none;
          }

          #printable-contract > article {
            margin-top: 8mm;
            overflow: visible;
            box-shadow: none;
          }

          #printable-contract > section {
            margin-top: 8mm;
            box-shadow: none;
            break-inside: avoid;
          }
        }
      `}</style>
    </section>
  );
}

function MetadataItem({
  label,
  value,
}: Readonly<{ label: string; value: string }>) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-slate-700">{value}</dd>
    </div>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
