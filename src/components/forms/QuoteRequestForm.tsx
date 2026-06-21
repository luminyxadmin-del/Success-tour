import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import { saveQuoteRequest } from "@/utils/storage";

const todayStr = new Date().toISOString().split("T")[0];

const BUDGET_OPTIONS = [
  { label: "Under $2,000",     value: "under_2000" },
  { label: "$2,000 – $3,500",  value: "2000_3500" },
  { label: "$3,500 – $5,000",  value: "3500_5000" },
  { label: "Above $5,000",     value: "above_5000" },
  { label: "Others",           value: "others" },
];

const schema = z
  .object({
    name:         z.string().min(2, "Please enter your name"),
    email:        z.string().email("Enter a valid email"),
    travelers:    z.string().min(1, "Required").refine((v) => Number(v) >= 1, { message: "At least 1 traveler" }),
    startDate:    z.string().min(1, "Start date is required").refine((d) => d >= todayStr, { message: "Start date cannot be in the past" }),
    endDate:      z.string().min(1, "End date is required"),
    budget:       z.string().min(1, "Please select a budget"),
    customBudget: z.string().optional(),
    message:      z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "End date cannot be before start date", path: ["endDate"] });
    }
    if (data.budget === "others" && !data.customBudget?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please enter your custom budget", path: ["customBudget"] });
    }
  });

type FormValues = z.infer<typeof schema>;

export default function QuoteRequestForm({
  packageName,
  onSuccess,
}: {
  packageName: string;
  onSuccess?: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const watchedBudget    = watch("budget");
  const watchedStartDate = watch("startDate");

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    try {
      await saveQuoteRequest({
        name:              data.name,
        email:             data.email,
        package_name:      packageName,
        travelers:         data.travelers,
        travel_start_date: data.startDate,
        travel_end_date:   data.endDate,
        budget_range:      data.budget,
        custom_budget:     data.budget === "others" ? data.customBudget : undefined,
        message:           data.message,
      });
      setSent(true);
      reset();
      setTimeout(() => { setSent(false); onSuccess?.(); }, 3000);
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-secondary/30 bg-secondary/5 p-6 text-center">
        <CheckCircle2 className="h-9 w-9 text-secondary" />
        <p className="mt-3 text-sm font-semibold text-primary">Quote request sent!</p>
        <p className="mt-1 text-xs text-muted">We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input type="hidden" value={packageName} readOnly />

      {/* Name */}
      <div>
        <label className="field-label">Name</label>
        <input className={`input-field ${errors.name ? "border-red-400 bg-red-50" : ""}`} {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-accent-dark">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="field-label">Email</label>
        <input type="email" className={`input-field ${errors.email ? "border-red-400 bg-red-50" : ""}`} {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-accent-dark">{errors.email.message}</p>}
      </div>

      {/* Travelers */}
      <div>
        <label className="field-label">No. of Travelers</label>
        <input type="number" min={1} className={`input-field ${errors.travelers ? "border-red-400 bg-red-50" : ""}`} {...register("travelers")} />
        {errors.travelers && <p className="mt-1 text-xs text-accent-dark">{errors.travelers.message}</p>}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="field-label">Travel Start Date</label>
          <input type="date" min={todayStr} className={`input-field ${errors.startDate ? "border-red-400 bg-red-50" : ""}`} {...register("startDate")} />
          {errors.startDate && <p className="mt-1 text-xs text-accent-dark">{errors.startDate.message}</p>}
        </div>
        <div>
          <label className="field-label">Travel End Date</label>
          <input type="date" min={watchedStartDate || todayStr} className={`input-field ${errors.endDate ? "border-red-400 bg-red-50" : ""}`} {...register("endDate")} />
          {errors.endDate && <p className="mt-1 text-xs text-accent-dark">{errors.endDate.message}</p>}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="field-label">Budget <span className="normal-case font-normal text-muted">(per person)</span></label>
        <select className={`input-field ${errors.budget ? "border-red-400 bg-red-50" : ""}`} {...register("budget")}>
          <option value="">Select your budget range</option>
          {BUDGET_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {errors.budget && <p className="mt-1 text-xs text-accent-dark">{errors.budget.message}</p>}
      </div>

      {/* Custom budget — only when "Others" selected */}
      {watchedBudget === "others" && (
        <div>
          <label className="field-label">Enter your budget (USD)</label>
          <input
            type="text"
            placeholder="e.g. 4,200"
            className={`input-field ${errors.customBudget ? "border-red-400 bg-red-50" : ""}`}
            {...register("customBudget")}
          />
          {errors.customBudget && <p className="mt-1 text-xs text-accent-dark">{errors.customBudget.message}</p>}
        </div>
      )}

      {/* Message */}
      <div>
        <label className="field-label">Message <span className="normal-case font-normal text-muted">(optional)</span></label>
        <textarea rows={3} className="input-field resize-none" {...register("message")} />
      </div>

      <Button type="submit" variant="primary" size="md" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send Quote Request"} <Send className="h-4 w-4" />
      </Button>

      {submitError && <p className="text-center text-xs text-red-500">{submitError}</p>}
    </form>
  );
}
