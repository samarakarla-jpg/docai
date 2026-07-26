import { GeneratedContractProvider } from "@/components/docai/contracts/generated-contract-context";

export default function ContractsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <GeneratedContractProvider>{children}</GeneratedContractProvider>;
}
