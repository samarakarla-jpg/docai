import { jsPDF } from "jspdf";

export type BrowserDocumentPdfInput = Readonly<{
  clientName?: string;
  content: string;
  createdAt: string;
  documentLabel: string;
  isProposal: boolean;
  professionName?: string;
  providerName?: string;
  serviceName?: string;
  serviceNames?: readonly string[];
  title: string;
}>;

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 18;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const BOTTOM_LIMIT = PAGE_HEIGHT - MARGIN;

export function createBrowserDocumentPdf(
  input: BrowserDocumentPdfInput,
): Blob {
  const pdf = new jsPDF({ format: "a4", unit: "mm" });
  let y = MARGIN;

  paintPageBackground(pdf);
  pdf.setTextColor(15, 23, 42);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.text(input.isProposal ? "PROPOSTA SALVA" : "CONTRATO SALVO", MARGIN, y);
  y += 9;

  pdf.setFontSize(19);
  y = writeWrappedText(pdf, input.title, y, 19, 8);
  y += 3;

  const metadata = [
    `Documento: ${input.documentLabel}`,
    ...(input.serviceNames && input.serviceNames.length > 0
      ? [
          `${input.serviceNames.length === 1 ? "Serviço" : "Serviços"}: ${input.serviceNames.join("; ")}`,
        ]
      : input.serviceName
        ? [`Serviço: ${input.serviceName}`]
        : []),
    ...(input.professionName ? [`Profissão: ${input.professionName}`] : []),
    ...(input.clientName ? [`Cliente: ${input.clientName}`] : []),
    ...(input.providerName ? [`Prestador: ${input.providerName}`] : []),
    `Data de criação: ${input.createdAt}`,
  ];
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  for (const line of metadata) {
    y = ensureSpace(pdf, y, 6);
    pdf.text(line, MARGIN, y);
    y += 5;
  }

  if (input.isProposal) {
    y = ensureSpace(pdf, y + 5, 25);
    pdf.setFillColor(255, 251, 235);
    pdf.setDrawColor(217, 119, 6);
    pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, 22, 2, 2, "FD");
    pdf.setFont("helvetica", "bold");
    pdf.text("Rascunho para revisão", MARGIN + 4, y + 6);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    const reviewLines = pdf.splitTextToSize(
      "Leia todo o conteúdo, confirme os dados e negocie os termos antes de enviar ou aceitar esta proposta.",
      CONTENT_WIDTH - 8,
    );
    pdf.text(reviewLines, MARGIN + 4, y + 12);
    y += 29;
  } else {
    y += 6;
  }

  y = ensureSpace(pdf, y, 15);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text(
    input.isProposal ? "Conteúdo da proposta" : "Conteúdo do contrato",
    MARGIN,
    y,
  );
  y += 8;
  pdf.setFont("helvetica", "normal");
  y = writeWrappedText(pdf, input.content, y, 10, 5.2);

  y = ensureSpace(pdf, y + 10, 56);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("Assinaturas", MARGIN, y);
  y += 20;
  pdf.setDrawColor(71, 85, 105);
  const columnWidth = (CONTENT_WIDTH - 12) / 2;
  pdf.line(MARGIN, y, MARGIN + columnWidth, y);
  pdf.line(MARGIN + columnWidth + 12, y, PAGE_WIDTH - MARGIN, y);
  pdf.setFontSize(9);
  pdf.text("Nome e assinatura", MARGIN + columnWidth / 2, y + 5, {
    align: "center",
  });
  pdf.text(
    "Nome e assinatura",
    MARGIN + columnWidth + 12 + columnWidth / 2,
    y + 5,
    { align: "center" },
  );
  pdf.setFont("helvetica", "bold");
  pdf.text(
    input.isProposal ? "CLIENTE (CONTRATANTE)" : "CONTRATANTE",
    MARGIN + columnWidth / 2,
    y + 11,
    { align: "center" },
  );
  pdf.text(
    input.isProposal
      ? "ELETRICISTA / PRESTADOR DO SERVIÇO (CONTRATADO)"
      : "CONTRATADO",
    MARGIN + columnWidth + 12 + columnWidth / 2,
    y + 11,
    { align: "center", maxWidth: columnWidth },
  );
  pdf.setFont("helvetica", "normal");
  pdf.line(MARGIN, y + 30, MARGIN + 65, y + 30);
  pdf.text("Data da assinatura", MARGIN + 32.5, y + 35, { align: "center" });

  return pdf.output("blob");
}

export function createDocumentPdfFileName(
  title: string,
  isProposal: boolean,
): string {
  const normalizedTitle = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
    .replace(/-+$/g, "");
  const prefix = isProposal ? "proposta" : "contrato";

  return `${prefix}-${normalizedTitle || "docai"}.pdf`;
}

function writeWrappedText(
  pdf: jsPDF,
  text: string,
  initialY: number,
  fontSize: number,
  lineHeight: number,
): number {
  pdf.setFontSize(fontSize);
  let y = initialY;

  for (const paragraph of text.split(/\r?\n/)) {
    if (!paragraph.trim()) {
      y += lineHeight;
      continue;
    }

    const lines = pdf.splitTextToSize(paragraph, CONTENT_WIDTH) as string[];
    for (const line of lines) {
      y = ensureSpace(pdf, y, lineHeight);
      pdf.text(line, MARGIN, y);
      y += lineHeight;
    }
  }

  return y;
}

function ensureSpace(pdf: jsPDF, y: number, requiredHeight: number): number {
  if (y + requiredHeight <= BOTTOM_LIMIT) return y;

  pdf.addPage();
  paintPageBackground(pdf);
  return MARGIN;
}

function paintPageBackground(pdf: jsPDF): void {
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, "F");
}
