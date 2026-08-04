"use client";

import { useState } from "react";

import type { BrowserDocumentPdfInput } from "@/lib/docai/infrastructure/pdf/browser-document-pdf";

type DocumentActionsProps = Readonly<{
  document: BrowserDocumentPdfInput;
}>;

type ActiveAction = "download" | "share" | null;

export function DocumentActions({ document }: DocumentActionsProps) {
  const [activeAction, setActiveAction] = useState<ActiveAction>(null);
  const [message, setMessage] = useState<
    Readonly<{ text: string; variant: "error" | "info" }> | undefined
  >();

  async function preparePdf() {
    const { createBrowserDocumentPdf, createDocumentPdfFileName } =
      await import(
        "@/lib/docai/infrastructure/pdf/browser-document-pdf"
      );

    return {
      blob: createBrowserDocumentPdf(document),
      fileName: createDocumentPdfFileName(document.title, document.isProposal),
    };
  }

  async function handleDownload() {
    if (activeAction) return;

    setActiveAction("download");
    setMessage(undefined);
    try {
      const pdf = await preparePdf();
      downloadBlob(pdf.blob, pdf.fileName);
    } catch {
      setMessage({
        text: "Não foi possível gerar o PDF. Tente novamente.",
        variant: "error",
      });
    } finally {
      setActiveAction(null);
    }
  }

  async function handleShare() {
    if (activeAction) return;

    setActiveAction("share");
    setMessage(undefined);
    try {
      const pdf = await preparePdf();
      const file = new File([pdf.blob], pdf.fileName, {
        type: "application/pdf",
      });
      const canShareFile =
        typeof navigator.share === "function" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] });

      if (canShareFile) {
        await navigator.share({
          files: [file],
          text: document.isProposal
            ? "Segue a proposta em PDF."
            : "Segue o documento em PDF.",
          title: document.title,
        });
        return;
      }

      downloadBlob(pdf.blob, pdf.fileName);
      setMessage({
        text: "O PDF foi baixado. Para enviar pelo WhatsApp, anexe o arquivo à conversa com o cliente.",
        variant: "info",
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;

      setMessage({
        text: "Não foi possível compartilhar o PDF. Baixe o arquivo e envie-o manualmente.",
        variant: "error",
      });
    } finally {
      setActiveAction(null);
    }
  }

  return (
    <div className="flex max-w-xl flex-col items-stretch gap-3 sm:items-end">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
        <button
          className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-wait disabled:bg-slate-600"
          disabled={activeAction !== null}
          onClick={handleDownload}
          type="button"
        >
          {activeAction === "download" ? "Gerando PDF..." : "Baixar PDF"}
        </button>
        <button
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-wait disabled:text-slate-500"
          disabled={activeAction !== null}
          onClick={handleShare}
          type="button"
        >
          {activeAction === "share" ? "Preparando..." : "Compartilhar"}
        </button>
        <button
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          onClick={() => window.print()}
          type="button"
        >
          Imprimir
        </button>
      </div>

      {message ? (
        <p
          className={
            message.variant === "error"
              ? "max-w-xl text-sm leading-6 text-red-700"
              : "max-w-xl text-sm leading-6 text-blue-800"
          }
          role={message.variant === "error" ? "alert" : "status"}
        >
          {message.text}
        </p>
      ) : null}
    </div>
  );
}

function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
