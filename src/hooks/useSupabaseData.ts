import { useEffect, useRef, useState } from "react";

/**
 * Generic hook that fetches data from Supabase.
 * - Initialises with `fallback` (local data) so the page renders immediately.
 * - Replaces data with Supabase result once available.
 * - Silently falls back to local data on any error.
 */
export function useSupabaseData<T>(
  fetcher: () => Promise<T[]>,
  fallback: T[],
): { data: T[]; loading: boolean } {
  const [data, setData]       = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);
  const fetcherRef            = useRef(fetcher);
  fetcherRef.current          = fetcher;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetcherRef.current()
      .then((result) => {
        if (cancelled) return;
        if (result.length > 0) setData(result);
      })
      .catch(() => {
        // Silently keep local fallback on any Supabase error
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []); // runs once on mount; fetcherRef keeps the latest reference

  return { data, loading };
}
