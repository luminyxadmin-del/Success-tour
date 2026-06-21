import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import { saveContact } from "@/utils/storage";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Please add a subject"),
  message: z.string().min(10, "Please tell us a little more (min 10 characters)"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await saveContact(data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 6000);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-secondary/30 bg-secondary/5 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-secondary" />
        <h3 className="mt-4 font-display text-xl font-bold text-primary">Message sent!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Thank you for reaching out. One of our travel specialists will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label">Full Name</label>
          <input className="input-field" placeholder="Jane Doe" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-accent-dark">{errors.name.message}</p>}
        </div>
        <div>
          <label className="field-label">Email Address</label>
          <input className="input-field" placeholder="jane@example.com" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-accent-dark">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label">Phone (optional)</label>
          <input className="input-field" placeholder="+254 700 000 000" {...register("phone")} />
        </div>
        <div>
          <label className="field-label">Subject</label>
          <input className="input-field" placeholder="Safari enquiry" {...register("subject")} />
          {errors.subject && <p className="mt-1 text-xs text-accent-dark">{errors.subject.message}</p>}
        </div>
      </div>
      <div>
        <label className="field-label">Message</label>
        <textarea rows={5} className="input-field resize-none" placeholder="Tell us how we can help…" {...register("message")} />
        {errors.message && <p className="mt-1 text-xs text-accent-dark">{errors.message.message}</p>}
      </div>
      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send Message"} <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
