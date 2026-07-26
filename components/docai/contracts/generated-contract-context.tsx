"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { ContractType } from "@/lib/docai/domain/contract-models";

export type GeneratedContract = Readonly<{
  output: string;
  title: string;
  type: ContractType;
}>;

type GeneratedContractContextValue = Readonly<{
  contract: GeneratedContract | null;
  setContract: (contract: GeneratedContract) => void;
}>;

const GeneratedContractContext = createContext<
  GeneratedContractContextValue | undefined
>(undefined);

export function GeneratedContractProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [contract, setContract] = useState<GeneratedContract | null>(null);

  return (
    <GeneratedContractContext.Provider value={{ contract, setContract }}>
      {children}
    </GeneratedContractContext.Provider>
  );
}

export function useGeneratedContract(): GeneratedContractContextValue {
  const context = useContext(GeneratedContractContext);

  if (!context) {
    throw new Error(
      "useGeneratedContract must be used within GeneratedContractProvider.",
    );
  }

  return context;
}
