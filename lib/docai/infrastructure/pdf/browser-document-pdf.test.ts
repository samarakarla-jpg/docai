import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const requireModule = createRequire(import.meta.url);
const {
  createBrowserDocumentPdf,
  createDocumentPdfFileName,
}: typeof import("./browser-document-pdf") = requireModule(
  "./browser-document-pdf.ts",
);

describe("browser document PDF", () => {
  it("creates a valid proposal PDF blob", async () => {
    const blob = createBrowserDocumentPdf({
      clientName: "Cliente Exemplo",
      content: "Instalação elétrica conforme a proposta.",
      createdAt: "30/07/2026 10:00",
      documentLabel: "Proposta comercial",
      isProposal: true,
      professionName: "Eletricista",
      providerName: "Prestador Exemplo",
      serviceNames: ["Instalação de plafon", "Troca de tomada"],
      title: "Proposta Comercial com Aceite",
    });
    const signature = new TextDecoder().decode(
      new Uint8Array(await blob.arrayBuffer()).slice(0, 5),
    );

    assert.equal(blob.type, "application/pdf");
    assert.equal(signature, "%PDF-");
    assert.ok(blob.size > 500);
  });

  it("creates stable proposal and legacy contract file names", () => {
    assert.equal(
      createDocumentPdfFileName("Proposta Elétrica", true),
      "proposta-proposta-eletrica.pdf",
    );
    assert.equal(
      createDocumentPdfFileName("Prestação de Serviços", false),
      "contrato-prestacao-de-servicos.pdf",
    );
  });
});
