import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Upload, Eye, Palette, PackageCheck } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload Design", desc: "Upload your PNG, JPG, or SVG artwork in seconds." },
  { icon: Eye, title: "Preview Live", desc: "See your design rendered on a realistic T-shirt mockup." },
  { icon: Palette, title: "Customize Options", desc: "Pick your shirt color, size, and quantity." },
  { icon: PackageCheck, title: "Order & Receive", desc: "Place your order and get it delivered fast." },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            ref.current!.querySelectorAll(".step-card"),
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-section text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Four simple steps to your custom printed T-shirt.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="step-card text-center p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow opacity-0">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 flex items-center justify-center">
                <step.icon className="w-7 h-7 text-accent" />
              </div>
              <span className="text-xs font-bold text-accent mb-2 block">STEP {i + 1}</span>
              <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
