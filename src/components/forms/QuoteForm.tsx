import { useState, useRef, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2, ArrowRight, Search, ChevronDown,
} from "lucide-react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import Button from "@/components/ui/Button";
import { destinations } from "@/data/destinations";
import { saveQuote } from "@/utils/storage";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function flagEmoji(code: string): string {
  try {
    return [...code.toUpperCase()]
      .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
      .join("");
  } catch {
    return "";
  }
}

// ─── Country data (built once at module load) ─────────────────────────────────

const nameOf = new Intl.DisplayNames(["en"], { type: "region" });

interface CountryItem {
  code: string;
  name: string;
  dial: string;
  flag: string;
}

const ALL_COUNTRIES: CountryItem[] = getCountries()
  .flatMap((code) => {
    try {
      const name = nameOf.of(code);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dial = String(getCountryCallingCode(code as any));
      if (!name || !dial) return [];
      return [{ code, name, dial, flag: flagEmoji(code) }];
    } catch {
      return [];
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const COUNTRY_MAP = new Map<string, CountryItem>(
  ALL_COUNTRIES.map((c) => [c.code, c])
);

// ─── Static options ───────────────────────────────────────────────────────────

const BUDGETS = [
  "Under $1,500 pp",
  "$1,500–$3,000 pp",
  "$3,000–$5,000 pp",
  "$5,000–$8,000 pp",
  "$8,000+ pp",
];

const todayStr = new Date().toISOString().split("T")[0];

// ─── Validation schema ────────────────────────────────────────────────────────

const schema = z
  .object({
    name:       z.string().min(2, "Full name is required"),
    email:      z.string().email("Enter a valid email address"),
    phone:      z
      .string()
      .min(1, "Phone number is required")
      .refine((v) => /^\+\d{6,15}$/.test(v.replace(/[\s\-()]/g, "")), {
        message: "Enter a valid phone number",
      }),
    country:    z.string().min(1, "Please select your country"),
    travelers:  z.string().min(1, "Number of travelers is required"),
    startDate:  z
      .string()
      .min(1, "Start date is required")
      .refine((d) => d >= todayStr, { message: "Start date cannot be in the past" }),
    endDate:    z.string().min(1, "End date is required"),
    destination: z.string().min(1, "Please select a destination"),
    budget:     z.string().min(1, "Please select a budget"),
    message:    z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date cannot be before start date",
        path: ["endDate"],
      });
    }
  });

type FormValues = z.infer<typeof schema>;

// ─── Phone Field ──────────────────────────────────────────────────────────────

function PhoneField({
  value,
  onChange,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
}) {
  const [selectedCode, setSelectedCode] = useState("KE");
  const [localNumber,  setLocalNumber]  = useState("");
  const [pickerOpen,   setPickerOpen]   = useState(false);
  const [pickerQuery,  setPickerQuery]  = useState("");
  const wrapRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const country = COUNTRY_MAP.get(selectedCode) ?? ALL_COUNTRIES[0];

  // Sync full number to parent
  useEffect(() => {
    const full = localNumber.trim()
      ? `+${country.dial}${localNumber.trim()}`
      : "";
    onChange(full);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCode, localNumber]);

  // Reset local state when form resets (value becomes "")
  useEffect(() => {
    if (!value) { setLocalNumber(""); setSelectedCode("KE"); }
  }, [value]);

  // Close picker on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
        setPickerQuery("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredDialCountries = useMemo(() => {
    const q = pickerQuery.toLowerCase();
    return ALL_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
    ).slice(0, 120);
  }, [pickerQuery]);

  return (
    <div ref={wrapRef} className="relative">
      {/* Input row */}
      <div
        className={`flex w-full overflow-hidden rounded border bg-white transition
          focus-within:border-primary focus-within:ring-2 focus-within:ring-secondary/20
          ${hasError ? "border-red-400 bg-red-50" : "border-sand-300"}`}
      >
        {/* Country code toggle */}
        <button
          type="button"
          onClick={() => {
            setPickerOpen((o) => !o);
            setPickerQuery("");
          }}
          className="flex shrink-0 items-center gap-1.5 border-r border-sand-200
            bg-slate-50 px-3 py-3 text-sm transition-colors hover:bg-slate-100"
        >
          <span className="text-lg leading-none">{country.flag}</span>
          <span className="font-mono text-xs text-muted">+{country.dial}</span>
          <ChevronDown
            className={`h-3 w-3 text-muted/60 transition-transform ${
              pickerOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Number input */}
        <input
          ref={inputRef}
          type="tel"
          inputMode="tel"
          value={localNumber}
          onChange={(e) =>
            setLocalNumber(e.target.value.replace(/[^\d\s\-()]/g, ""))
          }
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-ink outline-none"
        />
      </div>

      {/* Country picker dropdown */}
      {pickerOpen && (
        <div
          className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded border
            border-sand-200 bg-white shadow-xl"
        >
          {/* Search */}
          <div className="border-b border-sand-100 p-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted/50" />
              <input
                type="text"
                autoFocus
                value={pickerQuery}
                onChange={(e) => setPickerQuery(e.target.value)}
                placeholder="Search country or code…"
                className="w-full rounded border border-sand-200 bg-slate-50 py-2
                  pl-8 pr-3 text-sm outline-none
                  focus:border-primary focus:ring-1 focus:ring-secondary/20"
              />
            </div>
          </div>

          {/* List */}
          <ul className="max-h-48 overflow-y-auto">
            {filteredDialCountries.length === 0 ? (
              <li className="px-4 py-3 text-sm text-muted">No countries found</li>
            ) : (
              filteredDialCountries.map((c) => (
                <li
                  key={c.code}
                  onMouseDown={() => {
                    setSelectedCode(c.code);
                    setPickerOpen(false);
                    setPickerQuery("");
                    inputRef.current?.focus();
                  }}
                  className={`flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm
                    transition-colors hover:bg-secondary/10
                    ${
                      selectedCode === c.code
                        ? "bg-secondary/10 font-medium text-primary"
                        : "text-ink"
                    }`}
                >
                  <span className="w-6 shrink-0 text-center text-base leading-none">
                    {c.flag}
                  </span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="shrink-0 font-mono text-xs text-muted">+{c.dial}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Country Combobox ─────────────────────────────────────────────────────────

function CountryCombobox({
  value,
  onChange,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
}) {
  const [query,  setQuery]  = useState(value ?? "");
  const [open,   setOpen]   = useState(false);
  const wrapRef             = useRef<HTMLDivElement>(null);

  const q = (query ?? "").toLowerCase();

  const filtered = useMemo(
    () =>
      ALL_COUNTRIES.filter(
        (c) => c.name && c.name.toLowerCase().includes(q)
      ).slice(0, 100),
    [q]
  );

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery(value || "");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [value]);

  // Sync when form resets
  useEffect(() => { setQuery(value || ""); }, [value]);

  return (
    <div ref={wrapRef} className="relative">
      {/* Input */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/50" />
        <input
          type="text"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange("");
            setOpen(true);
          }}
          onFocus={() => {
            setQuery("");
            setOpen(true);
          }}
          className={`input-field pl-9 pr-8 ${
            hasError ? "border-red-400 bg-red-50" : ""
          }`}
        />
        <ChevronDown
          className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2
            text-muted/60 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown — left-0 right-0 keeps it exactly as wide as the parent */}
      {open && (
        <ul
          className="absolute left-0 right-0 z-50 mt-1 max-h-52 overflow-y-auto
            rounded border border-sand-200 bg-white shadow-xl"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-sm text-muted">No countries found</li>
          ) : (
            filtered.map((c) => (
              <li
                key={c.code}
                onMouseDown={() => {
                  onChange(c.name);
                  setQuery(c.name);
                  setOpen(false);
                }}
                className={`cursor-pointer px-4 py-2.5 text-sm transition-colors
                  hover:bg-secondary/10
                  ${
                    value === c.name
                      ? "bg-secondary/10 font-medium text-primary"
                      : "text-ink"
                  }`}
              >
                {c.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

// ─── Quote Form ───────────────────────────────────────────────────────────────

export default function QuoteForm({
  defaultDestination,
}: {
  defaultDestination?: string;
}) {
  const [sent,        setSent]        = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      destination: defaultDestination ?? "",
      country: "",
      phone: "",
      startDate: "",
      endDate: "",
    },
  });

  const watchedStartDate = watch("startDate");

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    try {
      await saveQuote({
        name:               data.name,
        email:              data.email,
        phone:              data.phone,
        country:            data.country,
        travelers:          data.travelers,
        travel_start_date:  data.startDate,
        travel_end_date:    data.endDate,
        destination:        data.destination,
        budget:             data.budget,
        message:            data.message,
      });
      setSent(true);
      reset();
      setTimeout(() => setSent(false), 7000);
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-secondary/30 bg-secondary/5 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-secondary" />
        <h3 className="mt-4 font-display text-2xl font-bold text-primary">
          Request received!
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted">
          Thank you. Our travel designers are already reviewing your request and
          will send a tailored, no-obligation proposal within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label">Full Name</label>
          <input
            className={`input-field ${errors.name ? "border-red-400 bg-red-50" : ""}`}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-accent-dark">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="field-label">Email Address</label>
          <input
            type="email"
            className={`input-field ${errors.email ? "border-red-400 bg-red-50" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-accent-dark">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone + Country */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label">Phone Number</label>
          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange } }) => (
              <PhoneField
                value={value}
                onChange={onChange}
                hasError={!!errors.phone}
              />
            )}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-accent-dark">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className="field-label">Country</label>
          <Controller
            name="country"
            control={control}
            render={({ field: { value, onChange } }) => (
              <CountryCombobox
                value={value}
                onChange={onChange}
                hasError={!!errors.country}
              />
            )}
          />
          {errors.country && (
            <p className="mt-1 text-xs text-accent-dark">{errors.country.message}</p>
          )}
        </div>
      </div>

      {/* Travelers + Budget */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label">No. of Travelers</label>
          <input
            type="number"
            min={1}
            className={`input-field ${errors.travelers ? "border-red-400 bg-red-50" : ""}`}
            {...register("travelers")}
          />
          {errors.travelers && (
            <p className="mt-1 text-xs text-accent-dark">{errors.travelers.message}</p>
          )}
        </div>
        <div>
          <label className="field-label">Budget (pp)</label>
          <select
            className={`input-field ${errors.budget ? "border-red-400 bg-red-50" : ""}`}
            {...register("budget")}
            defaultValue=""
          >
            <option value="" disabled />
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.budget && (
            <p className="mt-1 text-xs text-accent-dark">{errors.budget.message}</p>
          )}
        </div>
      </div>

      {/* Travel Start Date + End Date */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label">Travel Start Date</label>
          <input
            type="date"
            min={todayStr}
            className={`input-field ${errors.startDate ? "border-red-400 bg-red-50" : ""}`}
            {...register("startDate")}
          />
          {errors.startDate && (
            <p className="mt-1 text-xs text-accent-dark">{errors.startDate.message}</p>
          )}
        </div>
        <div>
          <label className="field-label">Travel End Date</label>
          <input
            type="date"
            min={watchedStartDate || todayStr}
            className={`input-field ${errors.endDate ? "border-red-400 bg-red-50" : ""}`}
            {...register("endDate")}
          />
          {errors.endDate && (
            <p className="mt-1 text-xs text-accent-dark">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {/* Destination */}
      <div>
        <label className="field-label">Preferred Destination</label>
        <select
          className={`input-field ${errors.destination ? "border-red-400 bg-red-50" : ""}`}
          {...register("destination")}
          defaultValue={defaultDestination ?? ""}
        >
          <option value="" disabled />
          {destinations.map((d) => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
          <option value="Multiple / Not sure yet">Multiple / Not sure yet</option>
        </select>
        {errors.destination && (
          <p className="mt-1 text-xs text-accent-dark">{errors.destination.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="field-label">
          Tell us about your dream trip{" "}
          <span className="normal-case font-normal">(optional)</span>
        </label>
        <textarea
          rows={4}
          className="input-field resize-none"
          {...register("message")}
        />
      </div>

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting…" : "Request My Free Quote"}{" "}
        <ArrowRight className="h-4 w-4" />
      </Button>

      {submitError && (
        <p className="text-center text-sm text-red-500">{submitError}</p>
      )}

      <p className="text-center text-xs text-muted">
        No payment required. We typically respond within 24 hours.
      </p>
    </form>
  );
}
