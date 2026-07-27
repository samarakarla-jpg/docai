"use client";

import { useState } from "react";

type DownloadPdfButtonProps = Readonly<{
  contractTitle: string;
}>;

export function DownloadPdfButton({
  contractTitle,
}: DownloadPdfButtonProps) {
  const [isPreparing, setIsPreparing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleDownload() {
    if (isPreparing) {
      return;
    }

    setIsPreparing(true);
    setErrorMessage(null);

    const previousDocumentTitle = document.title;
    document.title = createPdfFileName(contractTitle);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        try {
          window.print();
        } catch {
          setErrorMessage(
            "Não foi possível preparar o PDF. Tente novamente.",
          );
        } finally {
          document.title = previousDocumentTitle;
          setIsPreparing(false);
        }
      });
    });
  }

  return (
    <div className="flex flex-col items-stretch gap-2 sm:items-end">
      <button
        aria-describedby={
          errorMessage
            ? "pdf-export-help pdf-export-error"
            : "pdf-export-help"
        }
        className="inline-flex w-full items-center justify-center rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-wait disabled:bg-slate-600 sm:w-auto"
        disabled={isPreparing}
        onClick={handleDownload}
        type="button"
      >
        {isPreparing ? "Preparando PDF..." : "Imprimir / Salvar como PDF"}
      </button>

      <p className="max-w-xs text-xs leading-5 text-slate-500" id="pdf-export-help">
        No macOS, escolha “PDF → Salvar como PDF” na janela de impressão.
      </p>

      {errorMessage ? (
        <p className="text-sm text-red-700" id="pdf-export-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

function createPdfFileName(contractTitle: string): string {
  const normalizedTitle = contractTitle
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
    .replace(/-+$/g, "");

  return normalizedTitle ? `contrato-${normalizedTitle}` : "contrato-docai";
}
