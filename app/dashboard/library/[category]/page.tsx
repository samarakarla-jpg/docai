import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getContractCategory,
  listContractModelsByCategory,
} from "@/lib/docai/domain/contract-library";

type ContractCategoryPageProps = Readonly<{
  params: Promise<{
    category: string;
  }>;
}>;

export default async function ContractCategoryPage({
  params,
}: ContractCategoryPageProps) {
  const { category: requestedCategory } = await params;
  const category = getContractCategory(requestedCategory);

  if (!category) {
    notFound();
  }

  const models = listContractModelsByCategory(category.slug);

  return (
    <section
      aria-labelledby="contract-category-title"
      className="mx-auto w-full max-w-5xl"
    >
      <Link
        className="inline-flex items-center rounded-lg px-1 py-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        href="/dashboard/library"
      >
        <span aria-hidden="true" className="mr-2">
          ←
        </span>
        Biblioteca de Contratos
      </Link>

      <div className="mt-5 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-900">
          Categoria
        </p>
        <h1
          className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
          id="contract-category-title"
        >
          {category.name}
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
          {category.description}
        </p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {models.map((model) => (
          <li
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            key={model.id}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Modelo da biblioteca
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">
              {model.name}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {model.description}
            </p>
            <h3 className="mt-5 text-sm font-semibold text-slate-950">
              Estrutura prevista
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-slate-600">
              {model.structure.map((section) => (
                <li className="flex gap-2" key={section}>
                  <span aria-hidden="true" className="text-blue-900">
                    •
                  </span>
                  <span>{section}</span>
                </li>
              ))}
            </ul>
            <Link
              className="mt-6 inline-flex rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              href={{
                pathname: `/dashboard/contracts/new/${model.contractType}`,
                query: {
                  category: model.categorySlug,
                  model: model.id,
                  name: model.name,
                },
              }}
            >
              Usar este modelo
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
