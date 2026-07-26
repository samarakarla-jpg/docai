"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { createContract, type ContractActionState } from "@/app/actions/contracts";
import type { ContractType } from "@/lib/docai/domain/contract-models";
import { ContractForm } from "./contract-form";
import { ContractReview } from "./contract-review";
import { ContractTypeSelector } from "./contract-type-selector";

const INITIAL_STATE: ContractActionState = { status: "idle" };

export function ContractFlow() {
  const [type, setType] = useState<ContractType | "">("");
  const [state, formAction, pending] = useActionState(createContract, INITIAL_STATE);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "error") formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }, [state.status, state.fieldErrors]);

  return <div className="mx-auto w-full max-w-3xl"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">DocAI</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Criar contrato</h1><p className="mt-4 text-base leading-7 text-slate-600">Preencha os dados para gerar um rascunho revisável.</p></div><form action={formAction} className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" ref={formRef}><ContractTypeSelector error={state.fieldErrors?.type} onChange={setType} value={type} /><div className="mt-6"><ContractForm disabled={pending} fieldErrors={state.fieldErrors} type={type} /></div>{state.message ? <p aria-live="assertive" className={state.status === "error" ? "mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-800" : "mt-6 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800"} role={state.status === "error" ? "alert" : "status"}>{state.message}</p> : null}<button className="mt-6 w-full rounded-lg bg-slate-950 px-4 py-3 font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60" disabled={pending || type === ""} type="submit">{pending ? "Gerando rascunho..." : state.result ? "Regenerar rascunho" : "Gerar rascunho"}</button></form>{state.result ? <ContractReview onEdit={() => formRef.current?.querySelector<HTMLElement>("input")?.focus()} output={state.result.output} title={state.result.title} /> : null}</div>;
}
