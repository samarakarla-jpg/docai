"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  generateContract,
  type GenerateContractActionState,
} from "@/app/actions/generate-contract";
import { ContractForm } from "@/components/docai/contracts/contract-form";
import { useGeneratedContract } from "@/components/docai/contracts/generated-contract-context";
import type { ContractType } from "@/lib/docai/domain/contract-models";

type ContractDetailsFormProps = Readonly<{
  type: ContractType;
}>;

const INITIAL_STATE: GenerateContractActionState = {
  status: "idle",
};

export function ContractDetailsForm({ type }: ContractDetailsFormProps) {
  const router = useRouter();
  const { setContract } = useGeneratedContract();
  const [state, formAction, pending] = useActionState(
    generateContract,
    INITIAL_STATE,
  );

  useEffect(() => {
    if (state.status === "success" && state.result) {
      setContract(state.result);
      router.push("/dashboard/contracts/result");
    }
  }, [router, setContract, state]);

  return (
    <form
      action={formAction}
      className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <input name="type" type="hidden" value={type} />
      <ContractForm
        disabled={pending}
        fieldErrors={state.fieldErrors}
        type={type}
      />
      {state.message ? (
        <p
          className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-800"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}
      <button
        className="mt-8 w-full rounded-lg bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        {pending ? "Gerando contrato..." : "Gerar contrato"}
      </button>
    </form>
  );
}
