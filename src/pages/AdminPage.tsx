import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard, FileText, MessageSquare, Phone,
  LogOut, Trash2, ChevronDown, ChevronUp, CheckCircle,
  RefreshCw, Shield, Lock, Bell,
  TrendingUp, Calendar, Menu, X, KeyRound,
  ArrowRight, Mail,
} from "lucide-react";
import {
  getInquiries, getContacts, getQuoteRequests,
  updateStatus, deleteSubmission,
  type InquirySubmission, type ContactSubmission, type QuoteRequestSubmission,
} from "@/utils/storage";
import { supabase } from "@/lib/supabase";

type Tab = "inquiries" | "contacts" | "quote_requests";
type Submission = InquirySubmission | ContactSubmission | QuoteRequestSubmission;
type StatusType = "new" | "contacted" | "resolved";

const statusConfig: Record<StatusType, { label: string; dot: string; badge: string }> = {
  new: {
    label: "New",
    dot: "bg-blue-400",
    badge: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  },
  contacted: {
    label: "Contacted",
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  resolved: {
    label: "Resolved",
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
};

function StatusBadge({ status }: { status: StatusType }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${cfg.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, gradient, sub }: {
  label: string; value: number; icon: React.ElementType; gradient: string; sub?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-lg ${gradient}`}>
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
      <div className="absolute -bottom-6 -right-2 h-16 w-16 rounded-full bg-white/10" />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">{label}</p>
            <p className="mt-1 text-4xl font-bold">{value}</p>
            {sub && <p className="mt-1 text-xs text-white/60">{sub}</p>}
          </div>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
            <Icon className="h-5 w-5" />
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}

// ─── Action Buttons ───────────────────────────────────────────────────────────
function ActionBar({ id, email, type, onRefresh }: {
  id: string; email: string; type: Submission["type"]; onRefresh: () => void;
}) {
  const setStatus = async (s: StatusType) => { await updateStatus(type, id, s); onRefresh(); };
  const del = async () => {
    if (confirm("Delete this submission? This cannot be undone.")) {
      await deleteSubmission(type, id); onRefresh();
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
      <button onClick={() => setStatus("contacted")}
        className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100 active:scale-95">
        <Phone className="h-3.5 w-3.5" /> Mark Contacted
      </button>
      <button onClick={() => setStatus("resolved")}
        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 active:scale-95">
        <CheckCircle className="h-3.5 w-3.5" /> Mark Resolved
      </button>
      <button onClick={() => setStatus("new")}
        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 active:scale-95">
        <RefreshCw className="h-3.5 w-3.5" /> Reset New
      </button>
      <a href={`mailto:${email}`}
        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">
        <Mail className="h-3.5 w-3.5" /> Reply via Email
      </a>
      <button onClick={del}
        className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 active:scale-95">
        <Trash2 className="h-3.5 w-3.5" /> Delete
      </button>
    </div>
  );
}

// ─── Inquiry Row ──────────────────────────────────────────────────────────────
function InquiryRow({ q, onRefresh }: { q: InquirySubmission; onRefresh: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md
      ${q.status === "new" ? "border-blue-200" : "border-slate-200"}`}>
      <button className="flex w-full items-center gap-4 px-5 py-4 text-left" onClick={() => setOpen(!open)}>
        <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm text-white
          ${q.status === "new" ? "bg-[#F59E0B]" : "bg-slate-400"}`}>
          {q.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-semibold text-slate-900">{q.name}</p>
            {q.status === "new" && <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
          </div>
          <p className="truncate text-xs text-slate-500">{q.email} · {q.package_name}</p>
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <p className="text-xs text-slate-400">{formatDate(q.submitted_at)}</p>
          <p className="mt-0.5 text-sm font-semibold text-[#0F172A]">{q.travelers} travelers</p>
        </div>
        <StatusBadge status={q.status} />
        <span className="text-slate-400">{open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</span>
      </button>
      {open && (
        <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
            <Field label="Name" value={q.name} />
            <Field label="Email" value={q.email} />
            <Field label="Package" value={q.package_name} />
            <Field label="Travelers" value={String(q.travelers)} />
            <Field label="Start Date" value={q.travel_start_date} />
            <Field label="End Date"   value={q.travel_end_date} />
          </div>
          {q.message && (
            <div className="mt-4 rounded-xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Message</p>
              <p className="text-sm text-slate-700 leading-relaxed">{q.message}</p>
            </div>
          )}
          <div className="mt-4">
            <ActionBar id={q.id} email={q.email} type="inquiry" onRefresh={onRefresh} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Contact Row ──────────────────────────────────────────────────────────────
function ContactRow({ q, onRefresh }: { q: ContactSubmission; onRefresh: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md
      ${q.status === "new" ? "border-blue-200" : "border-slate-200"}`}>
      <button className="flex w-full items-center gap-4 px-5 py-4 text-left" onClick={() => setOpen(!open)}>
        <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm text-white
          ${q.status === "new" ? "bg-[#0F172A]" : "bg-slate-400"}`}>
          {q.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-semibold text-slate-900">{q.name}</p>
            {q.status === "new" && <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
          </div>
          <p className="truncate text-xs text-slate-500">{q.email} · {q.subject}</p>
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <p className="text-xs text-slate-400">{formatDate(q.submitted_at)}</p>
        </div>
        <StatusBadge status={q.status} />
        <span className="text-slate-400">{open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</span>
      </button>
      {open && (
        <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
            <Field label="Name" value={q.name} />
            <Field label="Email" value={q.email} />
            {q.phone && <Field label="Phone" value={q.phone} />}
            <Field label="Subject" value={q.subject} />
          </div>
          <div className="mt-4 rounded-xl bg-white p-4 ring-1 ring-slate-200">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Message</p>
            <p className="text-sm text-slate-700 leading-relaxed">{q.message}</p>
          </div>
          <div className="mt-4">
            <ActionBar id={q.id} email={q.email} type="contact" onRefresh={onRefresh} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Quote Request Row ────────────────────────────────────────────────────────
const BUDGET_LABELS: Record<string, string> = {
  under_2000: "Under $2,000",
  "2000_3500": "$2,000 – $3,500",
  "3500_5000": "$3,500 – $5,000",
  above_5000: "Above $5,000",
  others: "Others",
};

function formatBudget(range: string, custom?: string) {
  if (range === "others") return custom ? `Custom: ${custom}` : "Others";
  return BUDGET_LABELS[range] ?? range;
}

function QuoteRequestRow({ q, onRefresh }: { q: QuoteRequestSubmission; onRefresh: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md
      ${q.status === "new" ? "border-emerald-200" : "border-slate-200"}`}>
      <button className="flex w-full items-center gap-4 px-5 py-4 text-left" onClick={() => setOpen(!open)}>
        <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm text-white
          ${q.status === "new" ? "bg-emerald-500" : "bg-slate-400"}`}>
          {q.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-semibold text-slate-900">{q.name}</p>
            {q.status === "new" && <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
          </div>
          <p className="truncate text-xs text-slate-500">{q.email} · {q.package_name}</p>
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <p className="text-xs text-slate-400">{formatDate(q.submitted_at)}</p>
          <p className="mt-0.5 text-sm font-semibold text-[#0F172A]">{formatBudget(q.budget_range, q.custom_budget)}</p>
        </div>
        <StatusBadge status={q.status} />
        <span className="text-slate-400">{open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</span>
      </button>
      {open && (
        <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
            <Field label="Name" value={q.name} />
            <Field label="Email" value={q.email} />
            <Field label="Package" value={q.package_name} />
            <Field label="Travelers" value={String(q.travelers)} />
            <Field label="Start Date" value={q.travel_start_date} />
            <Field label="End Date" value={q.travel_end_date} />
            <Field label="Budget" value={formatBudget(q.budget_range, q.custom_budget)} />
          </div>
          {q.message && (
            <div className="mt-4 rounded-xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Message</p>
              <p className="text-sm text-slate-700 leading-relaxed">{q.message}</p>
            </div>
          )}
          <div className="mt-4">
            <ActionBar id={q.id} email={q.email} type="quote_request" onRefresh={onRefresh} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function Empty({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
        <FileText className="h-7 w-7 text-slate-300" />
      </div>
      <p className="mt-4 font-semibold text-slate-400">{label}</p>
      <p className="mt-1 text-sm text-slate-300">Submissions will appear here once received.</p>
    </div>
  );
}

// ─── Forgot Password Modal ────────────────────────────────────────────────────
function ForgotPasswordModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F172A]">
          <KeyRound className="h-6 w-6 text-[#0EA5A4]" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Forgot Password?</h2>
        <p className="mt-2 text-sm text-slate-500">
          Admin credentials are managed by the system developer. To reset your password, please contact:
        </p>
        <div className="mt-4 rounded-2xl bg-slate-50 p-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Developer Contact</p>
          <a href="mailto:babbujamui02@gmail.com"
            className="flex items-center gap-2 text-sm font-medium text-[#0EA5A4] hover:underline">
            <Mail className="h-4 w-4" /> babbujamui02@gmail.com
          </a>
        </div>
        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-700 ring-1 ring-amber-200">
          Password reset is managed via Supabase Authentication. The developer can reset your password from the Supabase dashboard.
        </p>
        <button onClick={onClose}
          className="mt-6 w-full rounded-xl bg-[#0F172A] py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">
          Close
        </button>
      </div>
    </div>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Email is required";
    if (!password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setErrors({ general: "Invalid email or password. Please try again." });
      setPassword("");
    } else {
      onLogin();
    }
  };

  return (
    <>
      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}
      <div className="flex min-h-screen">
        {/* Left Panel */}
        <div className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-[#0F172A] p-12 lg:flex">
          {/* Decorative circles */}
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#0EA5A4]/10" />
          <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-[#F59E0B]/10" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0EA5A4]/5" />

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0EA5A4]">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Luminyx Travel</p>
                <p className="text-xs text-slate-400">Kenya</p>
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="relative z-10">
            <h1 className="font-['Playfair_Display'] text-4xl font-bold leading-tight text-white">
              Admin<br />
              <span className="text-[#0EA5A4]">Dashboard</span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Manage package inquiries and contact messages — all in one place.
            </p>
            <div className="mt-8 space-y-3">
              {[
                { icon: MessageSquare, text: "Package inquiry tracking" },
                { icon: Phone, text: "Contact message handling" },
                { icon: TrendingUp, text: "Real-time submission stats" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0EA5A4]/20">
                    <Icon className="h-3.5 w-3.5 text-[#0EA5A4]" />
                  </span>
                  <p className="text-sm text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="relative z-10">
            <p className="text-xs text-slate-500">© 2024 Luminyx Travel Kenya. All rights reserved.</p>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="flex flex-1 items-center justify-center bg-slate-50 px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F172A]">
                <Shield className="h-4 w-4 text-[#0EA5A4]" />
              </div>
              <p className="font-bold text-slate-900">Admin Dashboard</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200/60">
              <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
              <p className="mt-1 text-sm text-slate-500">Sign in to your admin account</p>

              {errors.general && (
                <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 ring-1 ring-red-200">
                  {errors.general}
                </div>
              )}

              <form onSubmit={submit} className="mt-6 space-y-5" noValidate>
                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined, general: undefined })); }}
                      placeholder="Enter your email"
                      className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-[#0EA5A4]/40 ${errors.email ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-[#0EA5A4] focus:bg-white"}`}
                    />
                  </div>
                  {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: undefined, general: undefined })); }}
                      placeholder="Enter your password"
                      className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-[#0EA5A4]/40 ${errors.password ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-[#0EA5A4] focus:bg-white"}`}
                    />
                  </div>
                  {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
                </div>

                {/* Forgot */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForgot(true)}
                    className="text-sm font-semibold text-[#0EA5A4] hover:text-[#0b7d7c] transition"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 active:scale-[0.98] disabled:opacity-70"
                >
                  {loading ? (
                    <><RefreshCw className="h-4 w-4 animate-spin" /> Signing in…</>
                  ) : (
                    <>Sign In <ArrowRight className="h-4 w-4" /></>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-slate-400">
                Authorized personnel only · Luminyx Travel Kenya
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null); // null = checking
  const [tab, setTab] = useState<Tab>("inquiries");
  const [statusFilter, setStatusFilter] = useState<"all" | StatusType>("all");
  const [inquiries, setInquiries] = useState<InquirySubmission[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequestSubmission[]>([]);
  const [stats, setStats] = useState({ total: 0, newCount: 0, todayCount: 0, inquiryCount: 0, contactCount: 0, quoteRequestCount: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check Supabase session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const refresh = useCallback(async () => {
    try {
      const [i, c, qr] = await Promise.all([
        getInquiries(), getContacts(), getQuoteRequests(),
      ]);
      setInquiries(i);
      setContacts(c);
      setQuoteRequests(qr);
      const todayStr = new Date().toISOString().split("T")[0];
      const all = [...i, ...c, ...qr];
      setStats({
        total:            all.length,
        newCount:         all.filter((s) => s.status === "new").length,
        todayCount:       all.filter((s) => s.submitted_at?.startsWith(todayStr)).length,
        inquiryCount:     i.length,
        contactCount:     c.length,
        quoteRequestCount: qr.length,
      });
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  }, []);

  useEffect(() => { if (authed) refresh(); }, [authed, refresh]);

  // Show nothing while session is being checked
  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <RefreshCw className="h-6 w-6 animate-spin text-[#0EA5A4]" />
      </div>
    );
  }

  if (!authed) {
    return <LoginPage onLogin={() => { setAuthed(true); refresh(); }} />;
  }

  const logout = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
  };

  const filterFn = (x: Submission) => statusFilter === "all" || x.status === statusFilter;
  const filteredInquiries    = inquiries.filter(filterFn)     as InquirySubmission[];
  const filteredContacts     = contacts.filter(filterFn)      as ContactSubmission[];
  const filteredQuoteReqs    = quoteRequests.filter(filterFn) as QuoteRequestSubmission[];

  const newTotal = stats.newCount;

  const tabs: { id: Tab; label: string; icon: React.ElementType; count: number; color: string }[] = [
    { id: "inquiries",      label: "Package Inquiries",  icon: MessageSquare, count: filteredInquiries.length,  color: "text-amber-500" },
    { id: "contacts",       label: "Contact Messages",   icon: Phone,         count: filteredContacts.length,   color: "text-slate-600" },
    { id: "quote_requests", label: "Quote Requests",     icon: FileText,      count: filteredQuoteReqs.length,  color: "text-emerald-500" },
  ];

  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="flex min-h-screen bg-slate-100 font-['Montserrat',system-ui,sans-serif]">
      {/* Sidebar */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0F172A] transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0`}>

          {/* Brand */}
          <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0EA5A4]">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">Luminyx Travel</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Admin Panel</p>
            </div>
            <button className="ml-auto text-slate-400 lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 p-4">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Navigation</p>
            {tabs.map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => { setTab(id); setSidebarOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition
                  ${tab === id ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">{label}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${tab === id ? "bg-[#0EA5A4] text-white" : "bg-white/10 text-slate-400"}`}>
                  {count}
                </span>
              </button>
            ))}
          </nav>

          {/* Bottom user */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0EA5A4] text-sm font-bold text-white">A</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">Administrator</p>
                <p className="truncate text-xs text-slate-400">admin@success-tours.ke</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </aside>
      </>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-5 shadow-sm">
          <button className="text-slate-500 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-slate-900">
              {tabs.find((t) => t.id === tab)?.label}
            </h1>
            <p className="text-xs text-slate-400">{today}</p>
          </div>
          <div className="flex items-center gap-2">
            {newTotal > 0 && (
              <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 ring-1 ring-blue-200">
                <Bell className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-xs font-bold text-blue-600">{newTotal} new</span>
              </div>
            )}
            <button
              onClick={refresh}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-5 lg:p-8">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <StatCard label="Total" value={stats.total} icon={LayoutDashboard} gradient="bg-gradient-to-br from-slate-700 to-slate-900" sub="all time" />
            <StatCard label="New" value={stats.newCount} icon={Bell} gradient="bg-gradient-to-br from-blue-500 to-blue-700" sub="pending action" />
            <StatCard label="Today" value={stats.todayCount} icon={Calendar} gradient="bg-gradient-to-br from-purple-500 to-purple-700" sub="received today" />
            <StatCard label="Inquiries" value={stats.inquiryCount} icon={MessageSquare} gradient="bg-gradient-to-br from-amber-400 to-amber-600" sub="packages" />
            <StatCard label="Messages" value={stats.contactCount} icon={Phone} gradient="bg-gradient-to-br from-rose-400 to-rose-600" sub="contacts" />
            <StatCard label="Quotes" value={stats.quoteRequestCount} icon={FileText} gradient="bg-gradient-to-br from-emerald-400 to-emerald-600" sub="quote requests" />
          </div>

          {/* Filter chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Filter by status:</span>
            {(["all", "new", "contacted", "resolved"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition
                  ${statusFilter === s
                    ? "bg-[#0F172A] text-white shadow-sm"
                    : "bg-white text-slate-500 ring-1 ring-slate-200 hover:ring-slate-300"}`}
              >
                {s === "all" ? "All" : statusConfig[s].label}
              </button>
            ))}
          </div>

          {/* Submissions */}
          <div className="mt-5 space-y-3">
            {tab === "inquiries" && (
              filteredInquiries.length === 0
                ? <Empty label="No package inquiries found" />
                : filteredInquiries.map((q) => <InquiryRow key={q.id} q={q} onRefresh={refresh} />)
            )}
            {tab === "contacts" && (
              filteredContacts.length === 0
                ? <Empty label="No contact messages found" />
                : filteredContacts.map((q) => <ContactRow key={q.id} q={q} onRefresh={refresh} />)
            )}
            {tab === "quote_requests" && (
              filteredQuoteReqs.length === 0
                ? <Empty label="No quote requests found" />
                : filteredQuoteReqs.map((q) => <QuoteRequestRow key={q.id} q={q} onRefresh={refresh} />)
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
