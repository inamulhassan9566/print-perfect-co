import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Shirt } from "lucide-react";

const MockupShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            ref.current!.querySelectorAll(".mockup-item"),
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" }
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
    <section ref={ref} className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-section text-foreground mb-4">Mockup Preview Showcase</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">See how custom designs look on our premium T-shirts.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="mockup-item aspect-[3/4] rounded-2xl bg-gradient-to-b from-secondary to-muted flex items-center justify-center opacity-0"
            >
              <div className="text-center">
                <Shirt className="w-16 h-16 text-muted-foreground/40 mx-auto mb-2" />
                <span className="text-xs text-muted-foreground">Design #{i}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MockupShowcase;
