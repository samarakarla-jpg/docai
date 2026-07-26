"use client";

type ContractReviewProps = Readonly<{ title: string; output: string; onEdit: () => void }>;

export function ContractReview({ title, output, onEdit }: ContractReviewProps) {
  return <section aria-labelledby="contract-review-title" className="mt-8 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">Rascunho gerado</p><h2 className="mt-2 text-2xl font-semibold text-slate-950" id="contract-review-title">{title}</h2><p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm leading-6 text-amber-900" role="note">Este conteúdo foi gerado por IA e exige revisão humana. Não representa assinatura ou validade jurídica.</p><pre className="mt-6 max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-800">{output}</pre><button className="mt-6 rounded-lg border border-slate-300 px-4 py-2.5 font-medium text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2" onClick={onEdit} type="button">Editar dados e regenerar</button></section>;
}
