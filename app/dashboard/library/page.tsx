import Link from "next/link";

import { CONTRACT_CATEGORIES } from "@/lib/docai/domain/contract-library";

export default function ContractLibraryPage() {
  return (
    <section
      aria-labelledby="contract-library-title"
      className="mx-auto w-full max-w-5xl"
    >
      <div className="max-w-2xl">
        <h1
          className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
          id="contract-library-title"
        >
          Biblioteca de Contratos
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
          Escolha uma categoria para consultar os modelos disponíveis.
        </p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CONTRACT_CATEGORIES.map((category) => (
          <li key={category.slug}>
            <Link
              className="group flex h-full min-h-44 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-900 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
              href={`/dashboard/library/${category.slug}`}
            >
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  {category.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {category.description}
                </p>
              </div>
              <span className="mt-5 text-sm font-semibold text-blue-900 group-hover:underline">
                Ver modelos
                <span aria-hidden="true"> →</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
