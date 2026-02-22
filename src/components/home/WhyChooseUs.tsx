import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Printer, Gem, Truck, Users } from "lucide-react";

const reasons = [
  { icon: Printer, title: "Premium Printing", desc: "DTG and screen printing with vibrant, long-lasting colors." },
  { icon: Gem, title: "Quality Fabric", desc: "100% combed cotton and premium blends for ultimate comfort." },
  { icon: Truck, title: "Fast Shipping", desc: "Quick turnaround with tracked delivery to your doorstep." },
  { icon: Users, title: "Single & Bulk", desc: "Order one shirt or a thousand — same premium quality." },
];

const WhyChooseUs = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            ref.current!.querySelectorAll(".reason-card"),
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-section mb-4">Why Choose PrintCraft</h2>
          <p className="text-primary-foreground/60 max-w-lg mx-auto">We're obsessed with quality at every step.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <div key={i} className="reason-card p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 opacity-0">
              <r.icon className="w-10 h-10 text-accent mb-5" />
              <h3 className="font-heading font-semibold text-lg mb-2">{r.title}</h3>
              <p className="text-sm text-primary-foreground/60">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
