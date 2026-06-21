import { supabase } from "@/lib/supabase";

export interface InquirySubmission {
  id: string;
  type: "inquiry";
  submitted_at: string;
  status: "new" | "contacted" | "resolved";
  package_name: string;
  name: string;
  email: string;
  travelers: string;
  travel_start_date: string;
  travel_end_date: string;
  message?: string;
}

export interface ContactSubmission {
  id: string;
  type: "contact";
  submitted_at: string;
  status: "new" | "contacted" | "resolved";
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface QuoteRequestSubmission {
  id: string;
  type: "quote_request";
  submitted_at: string;
  status: "new" | "contacted" | "resolved";
  package_name: string;
  name: string;
  email: string;
  travelers: string;
  travel_start_date: string;
  travel_end_date: string;
  budget_range: string;
  custom_budget?: string;
  message?: string;
}

type Submission = InquirySubmission | ContactSubmission | QuoteRequestSubmission;

// ─── Inquiries ────────────────────────────────────────────────────────────────

export async function saveInquiry(
  data: Omit<InquirySubmission, "id" | "submitted_at" | "status" | "type">
) {
  const { error } = await supabase.from("inquiry_submissions").insert({
    name:               data.name,
    email:              data.email,
    package_name:       data.package_name,
    travelers:          Number(data.travelers),
    travel_start_date:  data.travel_start_date,
    travel_end_date:    data.travel_end_date,
    message:            data.message ?? null,
  });
  if (error) throw error;
}

export async function getInquiries(): Promise<InquirySubmission[]> {
  const { data, error } = await supabase
    .from("inquiry_submissions")
    .select("*")
    .order("submitted_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r) => ({ ...r, type: "inquiry" as const }));
}

// ─── Contacts ─────────────────────────────────────────────────────────────────

export async function saveContact(
  data: Omit<ContactSubmission, "id" | "submitted_at" | "status" | "type">
) {
  const { error } = await supabase.from("contact_submissions").insert({
    name:    data.name,
    email:   data.email,
    phone:   data.phone ?? null,
    subject: data.subject,
    message: data.message,
  });
  if (error) throw error;
}

export async function getContacts(): Promise<ContactSubmission[]> {
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("submitted_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r) => ({ ...r, type: "contact" as const }));
}

// ─── Quote Requests ───────────────────────────────────────────────────────────

export async function saveQuote(data: {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  travelers: string;
  travel_start_date: string;
  travel_end_date: string;
  destination: string;
  budget: string;
  message?: string;
}) {
  const extras = [
    data.phone   ? `Phone: ${data.phone}`     : null,
    data.country ? `Country: ${data.country}` : null,
  ].filter(Boolean).join("\n");

  const { error } = await supabase.from("quote_requests").insert({
    name:               data.name,
    email:              data.email,
    package_name:       data.destination,
    travelers:          Number(data.travelers),
    travel_start_date:  data.travel_start_date,
    travel_end_date:    data.travel_end_date,
    budget_range:       data.budget,
    message:            [data.message, extras].filter(Boolean).join("\n") || null,
  });
  if (error) throw error;
}

export async function saveQuoteRequest(
  data: Omit<QuoteRequestSubmission, "id" | "submitted_at" | "status" | "type">
) {
  const { error } = await supabase.from("quote_requests").insert({
    name:               data.name,
    email:              data.email,
    package_name:       data.package_name,
    travelers:          Number(data.travelers),
    travel_start_date:  data.travel_start_date,
    travel_end_date:    data.travel_end_date,
    budget_range:       data.budget_range,
    custom_budget:      data.custom_budget ?? null,
    message:            data.message ?? null,
  });
  if (error) throw error;
}

export async function getQuoteRequests(): Promise<QuoteRequestSubmission[]> {
  const { data, error } = await supabase
    .from("quote_requests")
    .select("*")
    .order("submitted_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r) => ({ ...r, type: "quote_request" as const }));
}

// ─── Status / Delete ──────────────────────────────────────────────────────────

const tableMap = {
  inquiry:       "inquiry_submissions",
  contact:       "contact_submissions",
  quote_request: "quote_requests",
} as const;

export async function updateStatus(
  type: Submission["type"],
  id: string,
  status: Submission["status"]
) {
  const { error } = await supabase
    .from(tableMap[type])
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteSubmission(type: Submission["type"], id: string) {
  const { error } = await supabase
    .from(tableMap[type])
    .delete()
    .eq("id", id);
  if (error) throw error;
}
