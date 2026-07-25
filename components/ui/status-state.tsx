"use client";

import { useId } from "react";
import type { ReactNode } from "react";

export type StatusStateVariant = "loading" | "empty" | "error" | "success";

type StatusStateProps = Readonly<{
  children?: ReactNode;
  description: string;
  title: string;
  variant: StatusStateVariant;
}>;

const variantStyles: Record<
  StatusStateVariant,
  { border: string; marker: string; role: "alert" | "status" }
> = {
  loading: {
    border: "border-slate-200",
    marker: "bg-slate-400",
    role: "status",
  },
  empty: {
    border: "border-slate-200",
    marker: "bg-slate-400",
    role: "status",
  },
  error: {
    border: "border-red-200",
    marker: "bg-red-500",
    role: "alert",
  },
  success: {
    border: "border-emerald-200",
    marker: "bg-emerald-500",
    role: "status",
  },
};

export function StatusState({
  children,
  description,
  title,
  variant,
}: StatusStateProps) {
  const styles = variantStyles[variant];
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      aria-live={styles.role === "status" ? "polite" : "assertive"}
      className={`rounded-xl border bg-white p-5 ${styles.border}`}
      role={styles.role}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`mt-1.5 size-2.5 shrink-0 rounded-full ${styles.marker}`}
        />
        <div>
          <h2 className="text-base font-semibold text-slate-950" id={titleId}>
            {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {description}
          </p>
          {children ? <div className="mt-4">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
