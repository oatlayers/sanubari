// components/PaginationClient.jsx
"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PaginationClient = ({ page, limit, totalPages, start, end }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pushPage = (targetPage) => {
    if (targetPage === page) return; // no-op

    const params = new URLSearchParams(
      Array.from(searchParams?.entries?.() ?? []),
    );
    params.set("page", String(targetPage));
    if (!params.has("limit")) params.set("limit", String(limit));

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="btn-group">
        <button
          type="button"
          className={`btn ${page <= 1 ? "btn-disabled" : "btn-ghost"}`}
          onClick={() => pushPage(Math.max(1, page - 1))}
          disabled={page <= 1}
          aria-disabled={page <= 1}
          aria-label="Previous page"
        >
          «
        </button>

        {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
          (p) => (
            <button
              key={p}
              type="button"
              className={`btn ${p === page ? "btn-active" : "btn-ghost"}`}
              onClick={() => pushPage(p)}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          className={`btn ${page >= totalPages ? "btn-disabled" : "btn-ghost"}`}
          onClick={() => pushPage(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          aria-disabled={page >= totalPages}
          aria-label="Next page"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default PaginationClient;
