import { useId, useState, type ReactNode } from "react";
import { ArrowRight, Check, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import "@/components/workspace.css";

interface ContactDialogProps {
  trigger: ReactNode;
  title?: string;
  description?: string;
  subject?: string;
  messagePlaceholder?: string;
}

export function ContactDialog({
  trigger,
  title = "Plan a data center deployment.",
  description = "Tell us about your facility and the workflow you want to automate.",
  subject = "Data center humanoid deployment inquiry",
  messagePlaceholder = "Your facility, target workflow, site constraints, and deployment timeline…",
}: ContactDialogProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("https://formspree.io/f/xkoawoon", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok)
        throw new Error(
          "We couldn’t send your message. Please try again; your draft is still here.",
        );
      form.reset();
      setSent(true);
      toast.success("Inquiry sent. Our team will be in touch.");
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "We couldn’t connect. Check your connection and try again; your draft is still here."
          : err instanceof Error
            ? err.message
            : "We couldn’t send your message. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          setSent(false);
          setError(null);
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="cb-contact-dialog">
        <div className="cb-contact-symbol" aria-hidden="true">
          {sent ? <Check size={23} /> : <Send size={22} strokeWidth={1.5} />}
        </div>
        <DialogHeader className="text-left">
          <span className="cb-eyebrow">A note to CosmicBrain</span>
          <DialogTitle className="cb-contact-title">
            {sent ? "Inquiry received." : title}
          </DialogTitle>
          <DialogDescription className="cb-contact-description">
            {sent
              ? "Your inquiry is with our team. We’ll be in touch to discuss the next step."
              : description}
          </DialogDescription>
        </DialogHeader>
        {sent ? (
          <button type="button" className="cb-warm-button mt-3" onClick={() => setOpen(false)}>
            Back to exploring <ArrowRight size={17} />
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="cb-contact-form" aria-busy={submitting}>
            <input type="hidden" name="subject" value={subject} />
            <fieldset disabled={submitting} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor={`${id}-email`}>Your email</Label>
                <Input
                  id={`${id}-email`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  maxLength={255}
                  placeholder="you@company.com"
                  className="cb-form-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-message`}>Your message</Label>
                <Textarea
                  id={`${id}-message`}
                  name="message"
                  required
                  maxLength={2000}
                  rows={5}
                  placeholder={messagePlaceholder}
                  className="cb-form-input"
                />
              </div>
              {error && (
                <p role="alert" className="cb-form-error">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="cb-warm-button w-full justify-center"
              >
                {submitting ? "Sending your note…" : "Send inquiry"}
                {!submitting && <ArrowRight size={17} />}
              </button>
            </fieldset>
            <p className="cb-form-footnote">Sent directly to the CosmicBrain team.</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
