import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { z } from "zod";

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject is too long"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message is too long"),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@printcraft.com", href: "mailto:hello@printcraft.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: MapPin, label: "Location", value: "123 Print Avenue, Design City, DC 10001" },
];

const socials = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
];

const Contact = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ContactForm;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent! We'll get back to you soon.");
    }, 1200);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="heading-section text-primary-foreground mb-4 gsap-reveal">Get in Touch</h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto text-lg gsap-reveal">
            Have a question, custom request, or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom grid lg:grid-cols-5 gap-12">
          {/* Form — 3 cols */}
          <div className="lg:col-span-3 gsap-reveal">
            <h2 className="heading-sub mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name" className="mb-1.5 block">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    maxLength={100}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="mb-1.5 block">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    maxLength={255}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="subject" className="mb-1.5 block">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  maxLength={200}
                  className={errors.subject ? "border-destructive" : ""}
                />
                {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <Label htmlFor="message" className="mb-1.5 block">Message</Label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us more…"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  maxLength={2000}
                  className={`flex w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none ${
                    errors.message ? "border-destructive" : "border-input"
                  }`}
                />
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Info — 2 cols */}
          <div className="lg:col-span-2 space-y-8 gsap-reveal">
            <div>
              <h2 className="heading-sub mb-5">Contact Info</h2>
              <div className="space-y-5">
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-3">Follow Us</h3>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-secondary rounded-xl aspect-[4/3] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Map placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
