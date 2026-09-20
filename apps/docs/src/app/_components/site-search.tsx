"use client";

import { useRouter } from "next/navigation";
import { useId, useMemo, useState, type FormEvent } from "react";
import type { CatalogItem } from "../../lib/catalog";

export function SiteSearch({ items, placeholder = "Search documentation" }: { items: Pick<CatalogItem, "name" | "slug" | "responsibility">[]; placeholder?: string }) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return [];
    return items.filter((item) => `${item.name} ${item.responsibility}`.toLocaleLowerCase().includes(term)).slice(0, 6);
  }, [items, query]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (matches[0]) router.push(`/components/${matches[0].slug}`);
  }

  return <form className="site-search" role="search" onSubmit={submit}>
    <label htmlFor={listId} className="sr-only">{placeholder}</label>
    <input id={listId} type="search" role="combobox" aria-autocomplete="list" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} autoComplete="off" aria-controls={`${listId}-results`} aria-expanded={matches.length > 0} />
    {matches.length > 0 ? <ul id={`${listId}-results`} aria-label="Search results">
      {matches.map((item) => <li key={item.slug}><a href={`/components/${item.slug}`}>{item.name}<small>{item.responsibility}</small></a></li>)}
    </ul> : null}
  </form>;
}
