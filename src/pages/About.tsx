import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Award, Heart, Truck, Users, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Award,
    title: "Premium Quality Printing",
    description:
      "We use state-of-the-art DTG and screen printing technology to ensure vivid, long-lasting prints that won't crack, peel, or fade after washing.",
  },
  {
    icon: Heart,
    title: "Ethically Sourced Fabrics",
    description:
      "Our shirts are made from 100% ring-spun combed cotton, sourced from responsible suppliers committed to fair labor practices.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Shipping",
    description:
      "Every order is produced, quality-checked, and shipped within 3–5 business days. We deliver nationwide with real-time tracking.",
  },
  {
    icon: Users,
    title: "Built for Everyone",
    description:
      "Whether you're an individual wanting one custom tee or a brand ordering in bulk, our platform adapts to your needs seamlessly.",
  },
];

const stats = [
  { value: "50K+", label: "Shirts Printed" },
  { value: "12K+", label: "Happy Customers" },
  { value: "4.9★", label: "Average Rating" },
  { value: "3–5", label: "Day Delivery" },
];

const About = () => {
  const pageRef = useRef<HTMLDivElement>(null);

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

      gsap.from(".stat-item", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stats-row", start: "top 85%" },
      });

      gsap.from(".value-card", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".values-grid", start: "top 85%" },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="heading-section text-primary-foreground mb-4 gsap-reveal">
            About PrintCraft
          </h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg gsap-reveal">
            We're on a mission to make custom apparel simple, accessible, and truly premium — one shirt at a time.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <div className="gsap-reveal">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="heading-section mt-2 mb-5">
              Born from a Love of Self-Expression
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              PrintCraft started in a small garage with a single screen-printing press and a big idea: everyone deserves to wear something that feels uniquely theirs. What began as weekend projects for friends quickly grew into a full-scale print-on-demand platform trusted by thousands.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Today, we combine cutting-edge printing technology with premium fabrics to deliver custom T-shirts that look stunning and feel incredible. Every order is produced on demand — no waste, no excess inventory, just your design brought to life.
            </p>
            <div className="flex items-center gap-3 text-foreground">
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-sm font-medium">No minimum order quantity</span>
            </div>
            <div className="flex items-center gap-3 text-foreground mt-2">
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-sm font-medium">Eco-friendly, on-demand production</span>
            </div>
            <div className="flex items-center gap-3 text-foreground mt-2">
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-sm font-medium">100% satisfaction guarantee</span>
            </div>
          </div>
          <div className="gsap-reveal bg-secondary rounded-2xl aspect-[4/3] flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-accent/40" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container-custom stats-row grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <p className="text-3xl md:text-4xl font-extrabold font-heading">{s.value}</p>
              <p className="text-primary-foreground/60 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12 gsap-reveal">
            <h2 className="heading-section mb-3">Why PrintCraft?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Quality, speed, and care are at the heart of everything we do.
            </p>
          </div>
          <div className="values-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="value-card bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-custom text-center gsap-reveal">
          <h2 className="heading-section mb-4">Ready to Create?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Upload your design and see it come alive on a premium custom T-shirt in minutes.
          </p>
          <Button asChild className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90 text-base">
            <Link to="/design">Start Designing</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
