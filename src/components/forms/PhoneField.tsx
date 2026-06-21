import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input";

type CountryCode = ReturnType<typeof getCountries>[number];
import en from "react-phone-number-input/locale/en.json";
import { cn } from "@/utils/cn";

// ─── static lookup tables (built once at module load) ─────────────────────────

const LABELS       = en as Record<string, string>;
const ALL_COUNTRIES = getCountries();

const POPULAR: CountryCode[] = ["KE", "IN", "US", "GB", "AE", "TZ", "UG", "ZA"];
const REST: CountryCode[]    = ALL_COUNTRIES
  .filter((c) => !POPULAR.includes(c))
  .sort((a, b) => (LABELS[a] ?? a).localeCompare(LABELS[b] ?? b));

interface CountryOption {
  code: CountryCode;
  name: string;
  dial: string; // "+254"
  flag: string; // "🇰🇪"
}

function toFlag(code: string) {
  return [...code.toUpperCase()]
    .map((ch) => String.fromCodePoint(ch.charCodeAt(0) + 127397))
    .join("");
}

function buildOption(code: CountryCode): CountryOption {
  return {
    code,
    name: LABELS[code] ?? code,
    dial: "+" + getCountryCallingCode(code),
    flag: toFlag(code),
  };
}

const POPULAR_OPTIONS = POPULAR.map(buildOption);
const REST_OPTIONS    = REST.map(buildOption);
const ALL_OPTIONS     = [...POPULAR_OPTIONS, ...REST_OPTIONS];

// ─── detect country from browser locale ──────────────────────────────────────

function detectCountry(): CountryCode {
  try {
    const region = new Intl.Locale(navigator.language).region?.toUpperCase();
    if (region && (ALL_COUNTRIES as string[]).includes(region)) {
      return region as CountryCode;
    }
  } catch {
    // very old browser — fall through
  }
  return "KE";
}

// ─── PhoneField ───────────────────────────────────────────────────────────────

interface PhoneFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  error?: string;
}

export default function PhoneField<T extends FieldValues>({
  control,
  name,
  error,
}: PhoneFieldProps<T>) {
  const [country, setCountry] = useState<CountryCode>(() => detectCountry());
  const [isOpen, setIsOpen]   = useState(false);
  const [search, setSearch]   = useState("");
  const [dropPos, setDropPos] = useState({ top: 0, left: 0, width: 240 });

  const triggerRef  = useRef<HTMLButtonElement>(null);
  const listRef     = useRef<HTMLDivElement>(null);
  const searchRef   = useRef<HTMLInputElement>(null);

  const dialCode = "+" + getCountryCallingCode(country);
  const flagEmoji = toFlag(country);

  // ── position the portal relative to the trigger ───────────────────────────
  const calcPos = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setDropPos({
      top:   r.bottom + 4,
      left:  r.left,
      // wider than the trigger so country names fit; min 240px
      width: Math.max(r.width * 2.8, 240),
    });
  }, []);

  const open = () => {
    calcPos();
    setIsOpen(true);
  };

  const close = useCallback(() => {
    setIsOpen(false);
    setSearch("");
  }, []);

  // close on outside click, Escape, or scroll/resize (reposition)
  useEffect(() => {
    if (!isOpen) return;

    const onPointer = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || listRef.current?.contains(t)) return;
      close();
    };
    const onKey    = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    const onScroll = () => calcPos();

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", calcPos);

    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", calcPos);
    };
  }, [isOpen, close, calcPos]);

  // auto-focus the search box after portal renders
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => searchRef.current?.focus(), 40);
    return () => clearTimeout(t);
  }, [isOpen]);

  // filtered country list (null = show grouped default)
  const filtered = useMemo<CountryOption[] | null>(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return ALL_OPTIONS.filter(
      (o) => o.name.toLowerCase().includes(q) || o.dial.includes(q)
    );
  }, [search]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const stored      = (value as string) ?? "";
        const localDigits = stored.startsWith(dialCode)
          ? stored.slice(dialCode.length)
          : stored.replace(/^\+\d{1,4}/, "");

        function handleSelect(code: CountryCode) {
          const nextDial = "+" + getCountryCallingCode(code);
          setCountry(code);
          onChange(localDigits ? nextDial + localDigits : "");
          close();
        }

        function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
          const raw = e.target.value.replace(/[^\d\s\-()]/g, "");
          onChange(raw ? dialCode + raw : "");
        }

        return (
          <>
            {/* ── field row ─────────────────────────────────────────────── */}
            <div
              className={cn(
                "flex overflow-hidden rounded border bg-white transition",
                error
                  ? "border-red-400 bg-red-50"
                  : "border-sand-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-secondary/20"
              )}
            >
              {/* Country trigger — 35% */}
              <button
                ref={triggerRef}
                type="button"
                onClick={open}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className="flex w-[35%] shrink-0 items-center gap-1.5 border-r border-sand-200 bg-sand/60 px-2.5 py-3 text-left transition hover:bg-sand/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              >
                <span className="select-none text-base leading-none" aria-hidden>
                  {flagEmoji}
                </span>
                <span className="text-xs font-semibold text-ink">{dialCode}</span>
                <span
                  className="ml-auto text-[9px] text-muted transition-transform"
                  style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                >
                  ▾
                </span>
              </button>

              {/* Number input — 65% */}
              <input
                type="tel"
                inputMode="numeric"
                value={localDigits}
                onChange={handleNumberChange}
                className="w-[65%] border-0 bg-transparent px-3 py-3 text-sm text-ink outline-none"
                aria-label="Phone number"
              />
            </div>

            {/* ── dropdown portal ───────────────────────────────────────── */}
            {/*
              Rendered into document.body so it is NEVER clipped by any
              parent overflow:hidden (modal card, scroll containers, etc.).
              Uses position:fixed so it aligns to the trigger regardless of
              scroll position. z-index:9999 places it above the modal.
            */}
            {isOpen &&
              createPortal(
                <div
                  ref={listRef}
                  role="listbox"
                  aria-label="Select country code"
                  style={{
                    position: "fixed",
                    top:      dropPos.top,
                    left:     dropPos.left,
                    width:    dropPos.width,
                    zIndex:   9999,
                  }}
                  className="overflow-hidden rounded-lg border border-sand-200 bg-white shadow-2xl"
                >
                  {/* Search input */}
                  <div className="border-b border-sand-100 p-2">
                    <input
                      ref={searchRef}
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search country…"
                      className="w-full rounded border border-sand-200 px-2.5 py-1.5 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  {/* Option list — max-height 200px, scrollable */}
                  <div className="overflow-y-auto" style={{ maxHeight: 200 }}>
                    {filtered !== null ? (
                      /* ── search results ─────────────────────────── */
                      filtered.length > 0 ? (
                        filtered.map((o) => (
                          <OptionRow
                            key={o.code}
                            option={o}
                            selected={country === o.code}
                            onSelect={handleSelect}
                          />
                        ))
                      ) : (
                        <p className="py-5 text-center text-xs text-muted">
                          No results for &ldquo;{search}&rdquo;
                        </p>
                      )
                    ) : (
                      /* ── grouped default list ───────────────────── */
                      <>
                        <GroupLabel>Popular</GroupLabel>
                        {POPULAR_OPTIONS.map((o) => (
                          <OptionRow
                            key={o.code}
                            option={o}
                            selected={country === o.code}
                            onSelect={handleSelect}
                          />
                        ))}
                        <GroupLabel>All countries</GroupLabel>
                        {REST_OPTIONS.map((o) => (
                          <OptionRow
                            key={o.code}
                            option={o}
                            selected={country === o.code}
                            onSelect={handleSelect}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </div>,
                document.body
              )}
          </>
        );
      }}
    />
  );
}

// ─── helper sub-components ────────────────────────────────────────────────────

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-0 z-10 bg-white/95 px-3 pb-0.5 pt-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted/60">
      {children}
    </div>
  );
}

function OptionRow({
  option,
  selected,
  onSelect,
}: {
  option: CountryOption;
  selected: boolean;
  onSelect: (code: CountryCode) => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={() => onSelect(option.code)}
      className={cn(
        "flex w-full items-center gap-2.5 px-3 py-2 text-left transition hover:bg-sand/70 focus:outline-none focus-visible:bg-sand/70",
        selected && "bg-sand"
      )}
    >
      <span className="shrink-0 text-base leading-none">{option.flag}</span>
      <span className="min-w-0 flex-1 truncate text-xs text-ink">{option.name}</span>
      <span className="shrink-0 text-xs font-semibold text-muted">{option.dial}</span>
    </button>
  );
}
